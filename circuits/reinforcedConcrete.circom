pragma circom 2.1.0;

include "./bricks.circom";
include "./concrete.circom";
include "./bars.circom";

template ReinforcedConcrete() {
    signal input state[2];
    signal output hash;


    component concrete0 = Concrete(0);
    concrete0.state[0] <== state[0];
    concrete0.state[1] <== state[1];
    concrete0.state[2] <== 0;

    component bricks0 = Bricks();
    bricks0.state <== concrete0.outState;

    component concrete1 = Concrete(3);
    concrete1.state <== bricks0.outState;

    component bricks1 = Bricks();
    bricks1.state <== concrete1.outState;

    component concrete2 = Concrete(6);
    concrete2.state <== bricks1.outState;

    component bricks2 = Bricks();
    bricks2.state <== concrete2.outState;

    component concrete3 = Concrete(9);
    concrete3.state <== bricks2.outState;

    component bars = Bars();
    bars.state <== concrete3.outState;

    // component concrete4 = Concrete(12);
    // concrete4.state <== bars.outState;

    // component bricks3 = Bricks();
    // bricks3.state <== concrete4.outState;

    // component concrete5 = Concrete(15);
    // concrete5.state <== bricks3.outState;

    // component bricks4 = Bricks();
    // bricks4.state <== concrete5.outState;

    // component concrete6 = Concrete(18);
    // concrete6.state <== bricks4.outState;

    // component bricks5 = Bricks();
    // bricks5.state <== concrete6.outState;

    // component concrete7 = Concrete(21);
    // concrete7.state <== bricks5.outState;

    hash <== bars.outState[2];
}

component main = ReinforcedConcrete();
