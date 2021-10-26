export default interface Temp {
    value: number;
    unit: string;
}

export default interface MashTemp {
    temp: Temp;
    duration: number;
}