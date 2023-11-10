pragma circom 2.1.0;

include "./params.circom";

template DecomposeElement() {
    signal input state;
    signal output outState[27];

    signal divisors[27] <-- DIVISORS();
    signal intermediateShl[27];
    signal remainders[27];
    signal quotients[27];
    signal intermediateShr[27];

    intermediateShl[26] <-- state << 2;
    quotients[26] <-- intermediateShl[26] \ divisors[26];
    remainders[26] <-- intermediateShl[26] % divisors[26];
    outState[26] <-- remainders[26] >> 2;
    outState[26] * 4 === remainders[26];

    for(var i=25; i>=0; i--) {
        if (i == 0) {
            outState[0] <-- quotients[1];
            quotients[1] * divisors[1] + remainders[1] === intermediateShl[1];
        } else {
            intermediateShl[i] <-- quotients[i+1] << 2;
            quotients[i] <-- intermediateShl[i] \ divisors[i];
            remainders[i] <-- intermediateShl[i] % divisors[i];
            outState[i] <-- remainders[i] >> 2;
            outState[i] * 4 === remainders[i];
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

