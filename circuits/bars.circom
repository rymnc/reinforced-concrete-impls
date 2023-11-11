pragma circom 2.1.0;

include "./decompose.circom";
include "./compose.circom";
include "./params.circom";

template sbox() {
    signal input state[3][27];
    signal output outState[3][27];

    for(var i=0; i<3; i++) {
        for(var j=0; j<27; j++) {
            outState[i][j] <-- SBOX(state[i][j]);
        }
    }
}

template Bars() {
    signal input state[3];
    signal output outState[3];

    // decompose
    component decompose = Decompose();
    decompose.state <== state;

    component sbox = sbox();
    sbox.state <== decompose.outState;

    component compose = Compose();
    compose.state <== sbox.outState;

    log(compose.outState[0]);
    log(compose.outState[1]);
    log(compose.outState[2]);

    outState <== compose.outState;
}

// component main = Bars();
