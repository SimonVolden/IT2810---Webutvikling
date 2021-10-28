import { MashTemp } from './Temp';
import { Fermentation } from './Fermentation';

export interface Method {
    mash_temp: MashTemp[];
    fermentation: Fermentation;
    twist?: string;
}