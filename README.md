# reinforced-concrete-implementations

This repository contains RC hash function developed for [zkhack istanbul](https://zkistanbul.com). 

It consists of implementing RC in circom and o1js.


## 1) reinforced-concrete-circom

RC hash function implemented in circom for the bn254 field.

This implementation has full test parity with the [reference implementation](https://extgit.iaik.tugraz.at/krypto/zkfriendlyhashzoo/-/blob/master/plain_impls/src/reinforced_concrete/reinforced_concrete_instances.rs) and [a third party implementation](https://github.com/rymnc/reinforced-concrete-huff).

### Circuit

```
template instances: 41
non-linear constraints: 36
linear constraints: 0
public inputs: 0
public outputs: 1
private inputs: 2
private outputs: 0
wires: 42
labels: 1017
```

### Usage

1. Install the dependencies required - `yarn`
2. Build the circuit - `yarn build:rc-circom`
3. Test the circuits outputs - `yarn test:rc-circom`

### Usage in other circuits

```circom
include "../node_modules/reinforced-concrete-circom/reinforcedConcrete.circom";

template MyCircuit() {
    signal input a;
    signal input b;

    signal output c;

    component hasher = ReinforcedConcrete();
    hasher.state[0] <== a;
    hasher.state[1] <== b;

    c <== hasher.hash;
}
```

### Notes

This implementation's params can be modified to serve as Monolith, 
since Monolith is a generalization of RC under the Goldilocks curve.

We have modified the precomputed values for the divisors in the `decompose` construct to maintain compatibility with the reference implementation, which splits `254 bit` word into `64 bit` words. 
This is not needed in an execution environment where the word size is 254 bits and above.

This Hash function has significantly lower constraints than [Poseidon](https://github.com/iden3/circomlib/blob/master/circuits/poseidon.circom), 
while having better security against statistical & algebraic attacks.

This hash function can replace Poseidon in any zk-based application. 
This includes, but not limited to, Semaphore, RLN, and so on.


## 2) reinforced-concrete-o1js

RC hash function implemented in o1js for the Pallas field.

This implementation exposes an API familiar to users making use of Poseidon within the o1js ecosystem.
We have also generated round constants specific to the Pallas field for this implementation.

### Usage

1. Install the dependencies required - `yarn`
2. Build the library - `yarn build:rc-o1js`

### To replace Poseidon in your o1js application

```typescript
import { Field } from 'o1js';
import { ReinforcedConcrete } from 'reinforced-concrete-o1js';

function knowsPreimage(preimage: Field) {
  let hash = ReinforcedConcrete.hash([preimage, Field.zero()]);
  hash.assertEquals(expectedHash);
}

const expectedHash =
  Field(/* ... */);
```

### Notes

This hash function can replace Poseidon in any zk-based application. 
This includes, but not limited to, Semaphore, RLN, and so on.

## License

[Apache 2.0](https://github.com/rymnc/reinforced-concrete-circom/blob/master/LICENSE)

## Disclaimer

_These circuits & libraries are being provided as is. No guarantee, representation or warranty is being made, express or implied, as to the safety or correctness of the execution. They have not been audited and as such there can be no assurance they will work as intended. The creators are not liable for any of the foregoing. Users should proceed with caution and use at their own risk._

