pragma circom 2.1.0;

include "./params.circom";
include "../../node_modules/circomlib/circuits/comparators.circom";

template DecomposeElement() {
    signal input state;
    signal output outState[27];

    signal divisors[27] <== DIVISORS();
    signal remainders[27];
    signal rangeChecks[27];
    signal quotients[27];

    quotients[26] <-- state \ divisors[26];
    remainders[26] <-- state % divisors[26];
    outState[26] <== remainders[26];
    quotients[26] * divisors[26] + remainders[26] === state;
    remainders[26] === state - quotients[26] * divisors[26];
    rangeChecks[0] <== LessThan(10)([remainders[26], divisors[26]]);
    rangeChecks[0] === 1;


    for(var i=25; i>=0; i--) {
        if (i == 0) {
            outState[0] <== quotients[i + 1];
        } else {
            quotients[i] <-- quotients[i + 1] \ divisors[i];
            remainders[i] <-- quotients[i + 1] % divisors[i];
            outState[i] <== remainders[i];
            quotients[i] * divisors[i] + remainders[i] === quotients[i + 1];
        }
    }

    for(var i = 1; i<27; i++) {
            // all divisors are 10 bits
            // TODO: check if this is really necessary given that 
            // the remainder will always < divisor, for a dividend
            // that a user cannot derive
            rangeChecks[i] <== LessThan(10)([remainders[i], divisors[i]]);
            rangeChecks[i] === 1;
    }
}

template Decompose() {
    signal input state[3];
    signal output outState[3][27];

    for(var i=0; i<3; i++) {
        outState[i] <== DecomposeElement()(state[i]);
    }
}

