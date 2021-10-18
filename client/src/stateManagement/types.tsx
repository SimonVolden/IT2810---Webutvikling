import React from "react";


export type Country = {
    name: string;
};

export type AppState = {
    country: Country[];
    theme: boolean;
};

//not in use
export type Theme = {
    theme: boolean;
}