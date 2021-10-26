import MashTemp from './Temp';
import Fermentation from './Fermentation';

export default interface Method {
    mash_temp: MashTemp[];
    fermentation: Fermentation;
    twist?: any;
}