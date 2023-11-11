pragma circom 2.1.0;

include "./params.circom";

template Concrete(i) {
	signal input state[3];
	signal output outState[3];

	component rcConstantA = RC_C(i);
	component rcConstantB = RC_C(i+1);
	component rcConstantC = RC_C(i+2);

	signal sum <== state[0] + state[1] + state[2]; 

	outState[0] <== sum + state[0] + rcConstantA.out;
	outState[1] <== sum + state[1] + rcConstantB.out;
	outState[2] <== sum + state[2] + rcConstantC.out;

}
