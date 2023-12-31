pragma circom 2.1.0;

template Bricks() {
    signal input state[3];
    signal output outState[3];
    signal intermediateState[3];

    signal s0_sq <== state[0] * state[0];
    signal s0_sq_sq <== s0_sq * s0_sq;
    signal s0_out <== s0_sq_sq * state[0]; // s0_out = s0 ^ 5
    signal s1_sq <== state[1] * state[1];

    intermediateState[0] <== s0_out;
    intermediateState[1] <== ((s0_sq + state[0]) + 2) * state[1];
    intermediateState[2] <== (s1_sq + (3 * state[1]) + 4) * state[2];

    outState <== intermediateState;
}
