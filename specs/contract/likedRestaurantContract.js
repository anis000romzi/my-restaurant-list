/* eslint-disable no-undef */
const itActsAslikedRestaurantModel = (likedRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    likedRestaurant.putRestaurant({ id: 1 });
    likedRestaurant.putRestaurant({ id: 2 });

    expect(await likedRestaurant.getRestaurant(1))
      .toEqual({ id: 1 });
    expect(await likedRestaurant.getRestaurant(2))
      .toEqual({ id: 2 });
    expect(await likedRestaurant.getRestaurant(3))
      .toEqual(undefined);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    likedRestaurant.putRestaurant({ aProperty: 'property' });

    expect(await likedRestaurant.getAllRestaurants())
      .toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    likedRestaurant.putRestaurant({ id: 1 });
    likedRestaurant.putRestaurant({ id: 2 });

    expect(await likedRestaurant.getAllRestaurants())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });

  it('should remove favorite restaurant', async () => {
    likedRestaurant.putRestaurant({ id: 1 });
    likedRestaurant.putRestaurant({ id: 2 });
    likedRestaurant.putRestaurant({ id: 3 });

    await likedRestaurant.deleteRestaurant(1);

    expect(await likedRestaurant.getAllRestaurants())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should handle request to remove a restaurant even though the movie has not been added', async () => {
    likedRestaurant.putRestaurant({ id: 1 });
    likedRestaurant.putRestaurant({ id: 2 });
    likedRestaurant.putRestaurant({ id: 3 });

    await likedRestaurant.deleteRestaurant(4);

    expect(await likedRestaurant.getAllRestaurants())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });
};

export default itActsAslikedRestaurantModel;
