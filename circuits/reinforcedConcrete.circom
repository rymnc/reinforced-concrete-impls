pragma circom 2.1.0;

include "./bricks.circom";
include "./concrete.circom";

template ReinforcedConcrete() {
    signal input state[2];
    signal output hash;


    component concrete0 = Concrete();
    concrete0.state[0] <== state[0];
    concrete0.state[1] <== state[1];
    concrete0.state[2] <== 0;

    component bricks0 = Bricks();
    bricks0.state[0] <== concrete0.outState[0];
    bricks0.state[1] <== concrete0.outState[1];
    bricks0.state[2] <== concrete0.outState[2];

    component concrete1 = Concrete();
    concrete1.state[0] <== bricks0.outState[0];
    concrete1.state[1] <== bricks0.outState[1];
    concrete1.state[2] <== bricks0.outState[2];

    component bricks1 = Bricks();
    bricks1.state[0] <== concrete1.outState[0];
    bricks1.state[1] <== concrete1.outState[1];
    bricks1.state[2] <== concrete1.outState[2];

    component concrete2 = Concrete();
    concrete2.state[0] <== bricks1.outState[0];
    concrete2.state[1] <== bricks1.outState[1];
    concrete2.state[2] <== bricks1.outState[2];

    component bricks2 = Bricks();
    bricks2.state[0] <== concrete2.outState[0];
    bricks2.state[1] <== concrete2.outState[1];
    bricks2.state[2] <== concrete2.outState[2];

    component concrete3 = Concrete();
    concrete3.state[0] <== bricks2.outState[0];
    concrete3.state[1] <== bricks2.outState[1];
    concrete3.state[2] <== bricks2.outState[2];

}