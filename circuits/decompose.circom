pragma circom 2.1.0;

include "./params.circom";

template DecomposeElement() {
    signal input state;
    signal output outState[27];

    signal divisors[27] <== DIVISORS();
    signal remainders[27];
    signal quotients[27];

    quotients[26] <-- state \ divisors[26];
    remainders[26] <-- state % divisors[26];
    outState[26] <== remainders[26];
    quotients[26] * divisors[26] + remainders[26] === state;

    for(var i=25; i>=0; i--) {
        if (i == 0) {
            outState[0] <== quotients[1];
        } else {
            quotients[i] <-- quotients[i + 1] \ divisors[i];
            remainders[i] <-- quotients[i + 1] % divisors[i];
            outState[i] <== remainders[i];
            quotients[i] * divisors[i] + remainders[i] === quotients[i + 1];
        }
    }
}

template Decompose() {
    signal input state[3];
    signal output outState[3][27];

    component s0Decomposed = DecomposeElement();
    s0Decomposed.state <== state[0];
    outState[0] <== s0Decomposed.outState;

    component s1Decomposed = DecomposeElement();
    s1Decomposed.state <== state[1];
    outState[1] <== s1Decomposed.outState;

    component s2Decomposed = DecomposeElement();
    s2Decomposed.state <== state[2];
    outState[2] <== s2Decomposed.outState;
}

