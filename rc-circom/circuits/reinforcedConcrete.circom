pragma circom 2.1.0;

include "./bricks.circom";
include "./concrete.circom";
include "./bars.circom";

template ReinforcedConcretePermutation() {
    signal input state[3];
    signal output hash[3];

    component bricks[8];
    component concrete[8];

    concrete[0] = Concrete(0);
    concrete[0].state <== state;

    for(var i=1; i<=3; i++) {
        bricks[i] = Bricks();
        bricks[i].state <== concrete[i - 1].outState;

        concrete[i] = Concrete(i * 3);
        concrete[i].state <== bricks[i].outState;
    }

    component bars = Bars();
    bars.state <== concrete[3].outState;

    concrete[4] = Concrete(12);
    concrete[4].state <== bars.outState;

    for(var i=5; i<=7; i++) {
        bricks[i] = Bricks();
        bricks[i].state <== concrete[i - 1].outState;

        concrete[i] = Concrete(i * 3);
        concrete[i].state <== bricks[i].outState;
    }

    hash <== concrete[7].outState;
}

template ReinforcedConcreteHash() {
    signal input state[2];
    signal output hash;

    component rc = ReinforcedConcretePermutation();
    rc.state[0] <== state[0];
    rc.state[1] <== state[1];
    rc.state[2] <== 0;

    hash <== rc.hash[0];
}
