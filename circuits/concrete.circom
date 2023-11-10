pragma circom 2.1.0;

include "./params.circom";

template concrete(i){
	signal input state[3];
	signal output out_state[3];

	component rc_constant_A = RC_C(i);
	component rc_constant_B = RC_C(i+1);
	component rc_constant_C = RC_C(i+2);

	signal sum <== state[0] + state[1] + state[2]; 

	

	out_state[0] <== sum + state[0] + rc_constant_A.out;
	out_state[1] <== sum + state[1] + rc_constant_B.out;
	out_state[2] <== sum + state[2] + rc_constant_C.out;

}
