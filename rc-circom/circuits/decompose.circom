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
    remainders[26] === state - quotients[26] * divisors[26];


    for(var i=25; i>=0; i--) {
        if (i == 0) {
            outState[0] <== quotients[i + 1];
        } else {
            quotients[i] <-- quotients[i + 1] \ divisors[i];
            remainders[i] <-- quotients[i + 1] % divisors[i];
            outState[i] <== remainders[i];
            quotients[i] * divisors[i] + remainders[i] === quotients[i + 1];
            // note: the below constraint is not really required, 
            // since the above constraint ensures that remainders[i] < divisors[i], 
            // otherwise the above equation would not hold.
            remainders[i] === quotients[i + 1] - quotients[i] * divisors[i];
        }
    }
}

template Decompose() {
    signal input state[3];
    signal output outState[3][27];

    for(var i=0; i<3; i++) {
        outState[i] <== DecomposeElement()(state[i]);
    }
}

