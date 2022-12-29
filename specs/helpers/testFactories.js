import '../../src/scripts/views/components/like-button';

const createLikeButton = async (elementTesting, dataTesting) => {
  // eslint-disable-next-line no-param-reassign
  elementTesting.restaurantData = dataTesting;

  document.body.appendChild(elementTesting);
  await elementTesting._renderButton();
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButton };
