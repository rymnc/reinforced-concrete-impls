import { ReinforcedConcrete as ReinforcedConcreteBinding } from './rc-binding';

import {Field} from "o1js";

export {ReinforcedConcrete};

function toBigints(fields: Field[]) {
    return fields.map((x) => x.toBigInt());
  }

const ReinforcedConcrete = {
    hash(input: Field[]) {
        return ReinforcedConcreteBinding.hash(toBigints(input));
    },
    permutation(input: Field[]) {
        return ReinforcedConcreteBinding.permutation(toBigints(input));
    }
}