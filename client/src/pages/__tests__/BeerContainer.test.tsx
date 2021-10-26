import React from 'react';
import { render} from '@testing-library/react';
import BeerContainer from '../BeerContainer'

class Beer {
    id: number
    name: string;
    image_url: string;
    description: string; 
    tagline: string;

    constructor(id: number, name: string, 
        image_url: string, description: string, tagline: string) {
            this.id = id;
            this.name = name;
            this.image_url = image_url;
            this.description = description;
            this.tagline = tagline;
        }
}

it("renders", () => {
    const beer = new Beer(1,
        "Beer_test",
        "https://images.punkapi.com/v2/keg.png",
        "description",
        "tagline")
    const { container } = render(<BeerContainer beer={beer} key={beer.id} />);
    expect(container).toMatchSnapshot();
});