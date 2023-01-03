import '../../src/scripts/views/components/like-button';
import '../../src/scripts/views/components/header-bar';

const createLikeButton = async (elementTesting, dataTesting) => {
  // eslint-disable-next-line no-param-reassign
  elementTesting.restaurantData = dataTesting;

  document.body.appendChild(elementTesting);
  await elementTesting._renderButton();
};

const createHeaderBar = async (elementTesting) => {
  document.body.appendChild(elementTesting);
  await elementTesting.render();
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButton, createHeaderBar };
