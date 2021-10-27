import React from 'react';
import { render} from '@testing-library/react';
import BeerContainer from '../BeerContainer'

class Beer {
    id: number
    name: string;
    image_url: string;
    description: string; 
    tagline: string;
    likes: number

    constructor(id: number, name: string, 
        image_url: string, description: string, tagline: string, likes: number) {
            this.id = id;
            this.name = name;
            this.image_url = image_url;
            this.description = description;
            this.tagline = tagline;
            this.likes = likes
        }
}

it("renders", () => {
    const beer = new Beer(1,
        "Beer_test",
        "https://images.punkapi.com/v2/keg.png",
        "description",
        "tnaglie",
        1)
    const { container } = render(<BeerContainer beer={beer} key={beer.id} />);
    expect(container).toMatchSnapshot();
});