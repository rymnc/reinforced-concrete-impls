// hacky way to use assertPositiveInteger from o1js-bindings without using
// a submodule or whole library
function assertPositiveInteger(n: number, message: string) {
    if (!Number.isInteger(n) || n <= 0) throw Error(message);
}

import { rcConstants } from "./constants";
import { FiniteField, Fp, mod } from "./finite-field";
import { GroupMapPallas } from "./elliptic-curve";

export { ReinforcedConcrete };

type ReinforcedConcreteParams = typeof rcConstants;

function fieldToGroup(x: bigint) {
  const { potentialXs, tryDecode } = GroupMapPallas;
  const xs = potentialXs(x);
  return xs.map((x) => tryDecode(x)).find((x) => x);
}

function makeHashToGroup(hash: (i: bigint[]) => bigint) {
  return (input: bigint[]) => {
    let digest = hash(input);
    let g = fieldToGroup(digest);
    if (g === undefined) return undefined;
    // we split the y coordinate into two elements, x0 = -sqrt(y^2) and x1 = sqrt(y^2)
    // then put the even root into x0, and the odd one into x1 so APIs equal even tho the underlying algorithms to calculate the sqrt differ
    // we do the same in-snark - so both APIs are deterministic
    let isEven = g.y % 2n === 0n;
    let gy_neg = Fp.negate(g.y);
    return {
      x: g.x,
      y: {
        x0: isEven ? g.y : gy_neg,
        x1: isEven ? gy_neg : g.y,
      },
    };
  };
}

const ReinforcedConcreteSpec = createRc(Fp, rcConstants);

const ReinforcedConcrete = {
  ...ReinforcedConcreteSpec,
  hashToGroup: makeHashToGroup(ReinforcedConcreteSpec.hash),
};

function createRc(
  Fp: FiniteField,
  params: ReinforcedConcreteParams,
) {

  function initialState(): bigint[] {
    return Array(3).fill(0n);
  }

  function hash(input: bigint[]) {
    if(input.length !== 2) throw Error(`Input must be 2 elements long, got ${input.length}`);
    
    let state = permutation(input.concat(0n));
    return state[0];
  }

  function concrete(state: bigint[], i: number) {
    //     sum = state[0] + state[1] + state[2]; 
    
    //     outState[0] = sum + state[0] + rcConstantA.out;
    //     outState[1] = sum + state[1] + rcConstantB.out;
    //     outState[2] = sum + state[2] + rcConstantC.out;
    
    // }
    const sum = Fp.add(Fp.add(state[0], state[1]), state[2]);

    const res: bigint[] = [];
    for(let i=0; i<3; i++) {
        res[i] = Fp.add(Fp.add(sum, state[i]), params.concreteConstants[i * 3 + i]);
    }
    return res;
  }

  function bricks(state: bigint[]) {
    //     outState[0] = s0 ^ 5;
    //     outState[1] = ((s0^2 + state[0]) + 2) * state[1];
    //     outState[2] <== (s1^2 + (3 * state[1]) + 4) * state[2];

    const res: bigint[] = [];

    const state0Sq = Fp.mul(state[0], state[0]);
    const state1Sq = Fp.mul(state[1], state[1]);

    res[0] = Fp.mul(Fp.square(state0Sq), state[0]);
    res[1] = Fp.mul(Fp.add(Fp.add(state0Sq, state[0]), 2n), state[1]);
    res[2] = Fp.mul(Fp.add(Fp.add(state1Sq, Fp.mul(state[1], 3n)), 4n), state[2]);

    return res;
  }

  function decompose(state: bigint) {
    // recursively divide the state until we get 27 elements confined to p = 700


    const divisors = params.divisors;
    const res: bigint[] = [];
    
    let repr = state;
    for(let i=26; i>0; i--) {
        res[i] = mod(repr, divisors[i]);
        let tmp = Fp.div(repr, divisors[i]);
        if(tmp === undefined) throw new Error(`Division undefined! ${repr}/${divisors[i]}`);
        repr = tmp;
    }
    res[0] = repr;

    return res;
  }

  function sbox(decomposedValues: bigint[]) {
    const res: bigint[] = [];

    // sbox lookup
    for(let i=0; i<decomposedValues.length; i++) {
        res[i] = params.sbox[Number(decomposedValues[i])];
    }

    return res;
  }

  function compose(sboxedValues: bigint[]) {
    // accumulate the sboxed values into 1 element

    const res: bigint[] = [];

    res[0] = sboxedValues[0];
    for(let i = 1; i<27; i++) {
        res[2*i-1] = Fp.mul(res[2*i-2], sboxedValues[i]);
        res[2*i] = Fp.add(res[2*i-1], sboxedValues[i]);
    }

    return res[52];
  }

  function bars(state: bigint[]) {
    const decomposedValues: bigint[][] = [];
    const sboxedValues: bigint[][] = [];
    const res: bigint[] = [];

    // first decompose
    for(let i=0; i<3; i++) {
        decomposedValues[i] = decompose(state[i]);
    }

    // sbox lookup
    for(let i=0; i<3; i++) {
        sboxedValues[i] = sbox(decomposedValues[i]);
    }

    // then compose
    for(let i=0; i<3; i++) {
        res[i] = compose(sboxedValues[i]);
    }

    return res;
  } 

  function permutation(state: bigint[]) {
    let intermediateState: bigint[];
    // concrete and bricks & concrete 3 times
    intermediateState = concrete(state, 0);

    for(let i=1; i<4; i++) {
        intermediateState = bricks(intermediateState);
        intermediateState = concrete(intermediateState, i);
    }

    // bars
    intermediateState = bars(intermediateState);

    // concrete & bricks 3 times and concrete
    intermediateState = concrete(intermediateState, 4);
    for(let i=5; i<8; i++) {
        intermediateState = bricks(intermediateState);
        intermediateState = concrete(intermediateState, i);
    }

    return intermediateState;
  }

  return { initialState, hash };
}