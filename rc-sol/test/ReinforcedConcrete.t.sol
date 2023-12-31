// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {ReinforcedConcrete} from "../src/ReinforcedConcrete.sol";

contract RCTest is Test {
    ReinforcedConcrete public rc;

    function setUp() public {
        rc = new ReinforcedConcrete();
    }

    function testHasher() public {
        uint256 val = rc.hash(
            0x0bc1f4af0cd701956511c0e5d4927d17ff43c6ea675de7c1dff3f99132584040,
            0x2d9397c680616ebc94f9c5bbba010835ec72d65286ae8ae184cc39daffee77c4
        );

        // final assertion
        assertEq(val, 0x2d4ae429dbdd40600828c21ee52c2ec9ba11cb965effaa441dd62a74e249f740);
    }
}
