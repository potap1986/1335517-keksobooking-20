'use strict';

(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MAIN_PIN_RADIUS = 32;
  var DIFF_TOP = 80;
  var ENTER = 13;
  var MAIN_BUTTON = 0;
  var PIN_COUNT = 5;
  var DEBOUNCE_INTERVAL = 500;

  var MainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    TAIL: 15
  };

  var PinSize = {
    WIDTH: 40,
    HEIGHT: 50
  };

  var PhotoSize = {
    WIDTH: 45,
    HEIGHT: 40
  };

  var MinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var PriceLimit = {
    LOW: 10000,
    HIGH: 50000,
  };

  var OfferType = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  window.constants = {
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MAIN_PIN_RADIUS: MAIN_PIN_RADIUS,
    DIFF_TOP: DIFF_TOP,
    ENTER: ENTER,
    MAIN_BUTTON: MAIN_BUTTON,
    PIN_COUNT: PIN_COUNT,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    MainPin: MainPin,
    PinSize: PinSize,
    OfferType: OfferType,
    PhotoSize: PhotoSize,
    PriceLimit: PriceLimit,
    MinPrice: MinPrice
  };
})();
