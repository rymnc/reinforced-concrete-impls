// hacky way to use assertPositiveInteger from o1js-bindings without using
// a submodule or whole library
function assertPositiveInteger(n: number, message: string) {
    if (!Number.isInteger(n) || n <= 0) throw Error(message);
}

import { rcConstants } from "./constants";
import { FiniteField, Fp } from "./finite-field";
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
    let state = permutation(input);
    return state[0];
  }


  function permutation(state: bigint[]) {
  }

  return { initialState, hash };
}