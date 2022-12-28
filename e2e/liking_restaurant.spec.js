/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/liked-restaurants');
});

Scenario('showing empty favorite list', ({ I }) => {
  I.waitForElement('#errorContainer', 10);
});

Scenario('liking one restaurant', async ({ I }) => {
  I.waitForElement('#errorContainer', 10);
  I.amOnPage('/');

  I.waitForElement('restaurant-item', 10);
  const restaurantName = await I.grabTextFrom({
    shadow: [
      '//restaurant-item[position()=2]',
      '.restaurant-item__content',
      '.restaurant-item__title',
      'a',
    ],
  });
  I.click({
    shadow: [
      '//restaurant-item[position()=2]',
      '.restaurant-item__content',
      '.restaurant-item__title',
      'a',
    ],
  });

  I.waitForElement('like-button', 10);
  pause();
  I.click({ shadow: ['like-button', 'button'] });

  I.amOnPage('/#/liked-restaurants');
  I.waitForElement('restaurant-item', 10);
  const likedRestaurantName = await I.grabTextFrom({
    shadow: [
      'restaurant-item',
      '.restaurant-item__content',
      '.restaurant-item__title',
      'a',
    ],
  });

  assert.strictEqual(restaurantName, likedRestaurantName);
});

Scenario('removing a restaurant from favorite list', ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('restaurant-item', 10);
  I.click({
    shadow: [
      'restaurant-item',
      '.restaurant-item__content',
      '.restaurant-item__title',
      'a',
    ],
  });

  I.waitForElement('like-button', 10);
  I.click({ shadow: ['like-button', 'button'] });

  I.amOnPage('/#/liked-restaurants');

  I.waitForElement('restaurant-item', 10);
  I.click({
    shadow: [
      'restaurant-item',
      '.restaurant-item__content',
      '.restaurant-item__title',
      'a',
    ],
  });

  I.waitForElement('like-button', 10);
  I.click({ shadow: ['like-button', 'button'] });

  I.amOnPage('/#/liked-restaurants');
  I.waitForElement('#errorContainer', 10);
});

Scenario('posting a review', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('restaurant-item', 10);
  I.click({
    shadow: [
      'restaurant-item',
      '.restaurant-item__content',
      '.restaurant-item__title',
      'a',
    ],
  });

  I.waitForElement('review-form', 10);
  I.waitForElement('.restaurant-detail__review__item', 10);

  const testNameInput = 'Tester';
  const testReviewInput = 'E2E Testing';

  I.fillField({
    shadow: [
      'review-form',
      '.name-input',
      '#nameInput',
    ],
  }, testNameInput);
  I.fillField({
    shadow: [
      'review-form',
      '.review-input',
      '#reviewInput',
    ],
  }, testReviewInput);
  I.click({
    shadow: [
      'review-form',
      '.button-input',
      '#buttonInput',
    ],
  });

  const latestNameData = locate('.content span').last();
  const latestReviewData = locate('.content p').last();
  const postedNameInput = await I.grabTextFrom(latestNameData);
  const postedReviewInput = await I.grabTextFrom(latestReviewData);

  assert.strictEqual(testNameInput, postedNameInput);
  assert.strictEqual(testReviewInput, postedReviewInput);
});
