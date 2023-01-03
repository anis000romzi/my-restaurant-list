import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantApiSource {
  static async restaurants() {
    const response = await fetch(API_ENDPOINT.RESTAURANTS);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async reviewRestaurant({ id, name, review }) {
    try {
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, review }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      if (error instanceof TypeError) {
        return 'Make sure you\'re connected to the internet!';
      }
      return error;
    }
  }

  static async searchRestaurant(query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query));
    const responseJson = await response.json();
    return responseJson;
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id), { cache: 'no-cache' });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      if (error instanceof TypeError) {
        return 'Make sure you\'re connected to the internet!';
      }
      return error;
    }
  }
}

export default RestaurantApiSource;
