pragma circom 2.1.0;

include "./params.circom";

template compose(){
	signal input in[27];
	signal output out; 

	component si = SI();


	signal repr[53]; 

	repr[0] <== in[0];

	for (var i = 1; i<27; i++){
		repr[2*i-1] <== repr[2*i-2] * si.out[i];
		repr[2*i] <== repr[2*i-1] + in[i];
	}

	out <== repr[52];
 }
