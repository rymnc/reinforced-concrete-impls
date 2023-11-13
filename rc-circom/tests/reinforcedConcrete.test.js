const chai = require("chai");
const path = require("path");
const wasm_tester = require("circom_tester").wasm;

const assert = chai.assert;

const getDecoratedOutput = async (circuit, witness) => {
    if (!circuit.symbols) await circuit.loadSymbols();
    const lines = {};

    for (let n in circuit.symbols) {
        if (witness[circuit.symbols[n].varIdx] === undefined) continue;
        let v = witness[circuit.symbols[n].varIdx].toString();
        lines[n] = v;
    }
    return lines
}

describe("ReinforcedConcrete", () => {

    let circuit;
    const katsInput = {
        state: [
            "5318131563369638011325357465817405204783162951746317507525230104757675769920",
            "20614852220057270210230140702292305712326412047017090758177592319778719954884"
        ]
    };

    beforeEach(async () => {
        circuit = await wasm_tester(path.join(__dirname, "reinforcedConcreteTest.circom"));
    })

    it("Compiles", async () => {
        const w = await circuit.calculateWitness(katsInput);
        await circuit.checkConstraints(w);
    });

    it("kats", async () => {
        const w = await circuit.calculateWitness(katsInput);
        await circuit.checkConstraints(w);
        const output = await getDecoratedOutput(circuit, w);
        const result = output["main.hash"];
        assert(result, "20486399595719878967951200919723421339003691044935512594686796654746622621504");
    })
});