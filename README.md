# reinforced-concrete-implementations

## Introduction

This repository hosts the Reinforced Concrete (RC) hash function, developed specifically for [zkhack istanbul](https://zkistanbul). It features implementations in Circom and o1js, offering a robust alternative to traditional hash functions in zk-based applications.


## 1) reinforced-concrete-circom

The `reinforced-concrete-circom` module implements the RC hash function for the bn254 field. This implementation exhibits a full test parity with both the [reference implementation](https://extgit.iaik.tugraz.at/krypto/zkfriendlyhashzoo/-/blob/master/plain_impls/src/reinforced_concrete/reinforced_concrete_instances.rs) and [a third party implementation](https://github.com/rymnc/reinforced-concrete-huff).


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
2. Test the circuit outputs - `yarn test:rc-circom`

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

The parameters of this implementation can be modified to serve as Monolith, 
since Monolith is a generalization of RC under the Goldilocks curve.

Alterations have been made to the precomputed values for the divisors in the `decompose` construct ensuring compatibility with the reference implementation, which splits `254 bit` word into `64 bit` words. 
However, these modifications are unnecessary in an execution environment where the word size is 254 bits and above.

Compared to [Poseidon](https://github.com/iden3/circomlib/blob/master/circuits/poseidon.circom), this hash function is designed with significantly fewer constraints, enhancing its security against statistical and algebraic attacks.

It's versatile enough to serve as a substitute for Poseidon in various zk-based applications, including but not limited to Semaphore and RLN.


## 2) reinforced-concrete-o1js

The RC hash function, implemented in o1js, is tailored for the Pallas field. This version provides an API familiar to users using Poseidon within the o1js ecosystem.

For this particular implementation, round constants have been generated to align with the specific requirements of the Pallas field.

> Note: while we have generated constants for the Pallas field, we cannot be sure of the result of the hash function since we have not prepared a kats for the same. This is out of scope for the submission :)

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

## 3) reinforced-concrete-solidity

A very un-optimized version of the RC hash function, implemented in Solidity. This implementation is not recommended for anyone sane.

You may find an [optimized version in huff](https://github.com/rymnc/reinforced-concrete-huff), which is atleast 20x cheaper than this implementation.

### Usage

1. Install the dependencies - `foundry install`
2. Test the hash function - `yarn test:rc-sol`

### Notes

Don't use this!

## License

[Apache 2.0](https://github.com/rymnc/reinforced-concrete-circom/blob/master/LICENSE)

## Disclaimer

_These circuits & libraries are being provided as is. No guarantee, representation or warranty is being made, express or implied, as to the safety or correctness of the execution. They have not been audited and as such there can be no assurance they will work as intended. The creators are not liable for any of the foregoing. Users should proceed with caution and use at their own risk._

