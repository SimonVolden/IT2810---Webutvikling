import React from "react";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import '@testing-library/jest-dom/extend-expect';
import Beers from "../beers";
import { Provider } from 'react-redux';
import { store } from '../../stateManagement/store';
import { ApolloProvider } from "@apollo/client";
import { client } from '../../client';
import { BeerDescriptionProps } from "../BeerDescription";

const desc_props: BeerDescriptionProps = {
    desc: "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
    food_pairing: ["Spicy chicken tikka masala", "Grilled chicken quesadilla", "Caramel toffee cake"]
}

const brewers_tips: string = "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.";

function Wrapper() {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Beers />
            </Provider>
        </ApolloProvider>
    );
}

beforeEach(() => {
    cleanup();
})

afterEach(() => {
    cleanup();
})

describe("BeerContainer test", () => {

    it('loading appears correctly', () => {
        const { container } = render(
            <Wrapper />
        )
        const loading = container.querySelector("svg");
        expect(loading).toBeInTheDocument();
    
    })

    it('beers are populated', async() => {
        render(
            <Wrapper />
        );
        
        await act(async() => {
            waitFor(() => {
                expect(screen.getByText("Buzz")).toBeInTheDocument();
                expect(screen.getByText("A Real Bitter Experience.")).toBeInTheDocument();
                expect(screen.getByText("4.5%")).toBeInTheDocument();
                expect(screen.getByText("Description")).toBeInTheDocument();
                expect(screen.getByText("Methods/Timings")).toBeInTheDocument();
                expect(screen.getByText("Ingredients")).toBeInTheDocument();
            });
        });
    });

    it('beer description collapse menu has correct data', async() => {
        render(
            <Wrapper />
        );

        await act(async() => {
            waitFor(() => {
                const descriptionButton = screen.getByTestId("description-card-button");
                fireEvent.click(descriptionButton);

                expect(screen.getByTestId("card-description")).toHaveTextContent(desc_props.desc);
                
                const food_pairing = screen.getAllByTestId("card-food-pairing");
                const pairMap = food_pairing.map((node, i) => ({node, string: desc_props.food_pairing[i]}));

                pairMap.forEach((elem) => {
                    expect(elem.node).toHaveTextContent(elem.string);
                });

            });
        });
    });

    it('beer methods/timings collapse menu has correct data', async() => {
        render(
            <Wrapper />
        );

        await act(async() => {
            waitFor(() => {
                const methodTimingsButton = screen.getByTestId("Methods/Timings-card-button");
                fireEvent.click(methodTimingsButton);

                expect(screen.getByText("Mash Temp")).toBeInTheDocument();
                expect(screen.getByText("64°C")).toBeInTheDocument();
                expect(screen.getByText("147°F")).toBeInTheDocument();
                expect(screen.getByText("75 minutes")).toBeInTheDocument();

                expect(screen.getByText("Fermentation")).toBeInTheDocument();
                expect(screen.getByText("19°C")).toBeInTheDocument();
                expect(screen.getByText("66°F")).toBeInTheDocument();

                expect(screen.getByText("Brewers tips")).toBeInTheDocument();
                expect(screen.getByText(brewers_tips)).toBeInTheDocument();
            });
        });
    });

    it('beer ingredients collapse menu has correct data', async() => {
        render(
            <Wrapper />
        );

        await act(async() => {
            waitFor(() => {
                const ingredientsButton = screen.getByTestId("Ingredients-card-button");
                fireEvent.click(ingredientsButton);

                expect(screen.getByText("Malt")).toBeInTheDocument();
                expect(screen.getByText("Maris Otter Extra Pale	3.3kg 7.26lbs")).toBeInTheDocument();
                expect(screen.getByText("Caramalt 0.2kg 0.44lbs")).toBeInTheDocument();
                expect(screen.getByText("Munich	0.4kg 0.88lbs")).toBeInTheDocument();
                expect(screen.getByText("Munich 0.5kg 0.90lbs")).not.toBeInTheDocument();

                expect(screen.getByText("Hop")).toBeInTheDocument();
                expect(screen.getByText("(g) Add Attribute")).toBeInTheDocument();
                expect(screen.getByText("Fuggles 25	start bitter")).toBeInTheDocument();
                expect(screen.getByText("First Gold	25 start bitter")).toBeInTheDocument();
                expect(screen.getByText("Fuggles 37.5 middle flavour")).toBeInTheDocument();
                expect(screen.getByText("First Gold	37.5 middle	flavour")).toBeInTheDocument();
                expect(screen.getByText("Cascade 37.5 end flavour")).toBeInTheDocument();
                expect(screen.getByText("Cascade 37.5 start flavour")).not.toBeInTheDocument();

                expect(screen.getByText("Yeast")).toBeInTheDocument();
                expect(screen.getByText("Wyeast 1056 - American Ale™")).toBeInTheDocument();
            });
        });
    });

})

