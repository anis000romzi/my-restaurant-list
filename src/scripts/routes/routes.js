import RestaurantListPage from '../views/pages/restaurant-list-page';
import RestaurantDetailPage from '../views/pages/restaurant-detail-page';
import LikedRestaurantPage from '../views/pages/liked-restaurant-page';

const routes = {
  '/': RestaurantListPage, // default page
  '/restaurants': RestaurantListPage,
  '/liked-restaurants': LikedRestaurantPage,
  '/detail/:id': RestaurantDetailPage,
};

export default routes;
