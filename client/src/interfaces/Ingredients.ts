import Malt from './Malt';
import Hop from './Hop';

export default interface Ingredients {
    malt: Malt[];
    hops: Hop[];
    yeast: string;
}