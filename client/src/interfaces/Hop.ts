import { Amount } from "./Amount";

export interface Hop {
    name: string;
    amount: Amount;
    add: string;
    attribute: string;
}