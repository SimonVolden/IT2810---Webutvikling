const { RESTDataSource } = require("apollo-datasource-rest");

class BeerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.punkapi.com/v2/beers";
  }

  async getAllBeers() {
    const response = await this.get("?page=1&per_page=80");
    //console.log(response)
    return Array.isArray(response)
      ? response.map((beers) => this.beerReducer(beers))
      : [];
  }

  beerReducer(beers) {
    return {
      id: beers.id,
      name: beers.name,
      tagline: beers.tagline,
      first_brewed: beers.first_brewed,
      description: beers.description,
      image_url: beers.image_url,
      abv: beers.abv,
      ibu: beers.ibu,
      target_fg: beers.target_fg,
      target_og: beers.target_og,
      ebc: beers.ebc,
      srm: beers.srm,
      ph: beers.ph,
      attenuation_level: beers.attenuation_level,
      volume: beers.volume,
      boil_volume: beers.boil_volume,
      method: beers.method,
      ingredients: beers.ingredients,
      food_pairing: beers.food_pairing,
      brewers_tips: beers.brewers_tips,
      contributed_by: beers.contributed_by,
    };
  }

  async getBeerById({ beerId }) {
    const response = await this.get("", { id: beerId });
    return this.beerReducer(response[0]);
  }
}

module.exports = BeerAPI;
