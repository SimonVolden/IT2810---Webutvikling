import { Malt } from './Malt';
import { Hop } from './Hop';

export interface Ingredients {
    malt: Malt[];
    hops: Hop[];
    yeast: string;
}