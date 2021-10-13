/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBeersList
// ====================================================

export interface GetBeersList_beers_beers {
    __typename: "Beers"
    id: number;
    name: string;
    tagline: string;
}

export interface GetBeersList_beers {
    __typename: "BeerConnection";
    cursor: string;
    hasMore: boolean;
    beers: (GetBeersList_beers_beers | null)[];
}

export interface GetBeersList {
    beers: GetBeersList_beers;
}

export interface GetBeersListVariables {
    after?: string | null;
}