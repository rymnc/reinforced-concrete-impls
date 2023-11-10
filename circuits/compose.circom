pragma circom 2.1.0;

include "./params.circom";

 template compose(){
	signal input state[3][27];
	signal output outstate[3]; 

	component si = SI();
	signal repr[3][53];

	for (var j=0; j<3; j++ ){
		repr[j][0] <== state[j][0];

		for (var i = 1; i<27; i++){
			repr[j][2*i-1] <== repr[j][2*i-2] * si.out[i];
			repr[j][2*i] <== repr[j][2*i-1] + state[j][i];
		}

		out[j] <== repr[j][52];
	}
 }

