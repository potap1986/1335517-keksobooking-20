'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var typeSelect = filters.querySelector('#housing-type');
  var priceSelect = filters.querySelector('#housing-price');
  var roomsSelect = filters.querySelector('#housing-rooms');
  var guestsSelect = filters.querySelector('#housing-guests');
  var wifiCheckbox = filters.querySelector('#filter-wifi');
  var dishwasherCheckbox = filters.querySelector('#filter-dishwasher');
  var parkingCheckbox = filters.querySelector('#filter-parking');
  var washerCheckbox = filters.querySelector('#filter-washer');
  var elevatorCheckbox = filters.querySelector('#filter-elevator');
  var conditionerCheckbox = filters.querySelector('#filter-conditioner');

  var adverts;

  var initFilters = function (data) {
    filters.reset();
    adverts = data;
    filters.removeAttribute('disabled', true);
    window.pin.renderPins(adverts);
  };

  var convertPrice = function (price) {
    switch (true) {
      case price < window.constants.PriceLimit.LOW:
        return window.constants.PriceCode.LOW;
      case price <= window.constants.PriceLimit.HIGH:
        return window.constants.PriceCode.MIDDLE;
    }
    return window.constants.PriceCode.HIGH;
  };

  var filterType = function (data) {
    return typeSelect.value === window.constants.FILTER_ANY_CODE ? true : data.offer.type === typeSelect.value;
  };

  var filterPrice = function (data) {
    return priceSelect.value === window.constants.FILTER_ANY_CODE ? true : convertPrice(data.offer.price) === priceSelect.value;
  };

  var filterRooms = function (data) {
    return roomsSelect.value === window.constants.FILTER_ANY_CODE ? true : data.offer.rooms === +roomsSelect.value;
  };

  var filterGuests = function (data) {
    if (+guestsSelect.value === 0) {
      return data.offer.guests === 0;
    } else {
      return guestsSelect.value === window.constants.FILTER_ANY_CODE ? true : data.offer.guests >= +guestsSelect.value;
    }
  };

  var makeFeatureChecker = function (feature, code) {
    return function (data) {
      return feature.checked ? data.offer.features.indexOf(code) !== -1 : true;
    };
  };

  var filterWifi = makeFeatureChecker(wifiCheckbox, window.constants.FeatureCode.WIFI);
  var filterDishwasher = makeFeatureChecker(dishwasherCheckbox, window.constants.FeatureCode.DISHWASHER);
  var filterParking = makeFeatureChecker(parkingCheckbox, window.constants.FeatureCode.PARKING);
  var filterWasher = makeFeatureChecker(washerCheckbox, window.constants.FeatureCode.WASHER);
  var filterElevator = makeFeatureChecker(elevatorCheckbox, window.constants.FeatureCode.ELEVATOR);
  var filterConditioner = makeFeatureChecker(conditionerCheckbox, window.constants.FeatureCode.CONDITIONER);

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, args);
      }, window.constants.DEBOUNCE_INTERVAL);
    };
  };

  var onFilterChange = debounce(function (evt) {
    evt.preventDefault();
    var filtredData = adverts.filter(function (it) {
      return filterType(it) &&
      filterPrice(it) &&
      filterRooms(it) &&
      filterGuests(it) &&
      filterWifi(it) &&
      filterDishwasher(it) &&
      filterParking(it) &&
      filterWasher(it) &&
      filterElevator(it) &&
      filterConditioner(it);
    });
    window.pin.removePins();
    window.card.onPopupClose();
    window.pin.renderPins(filtredData);
  });

  filters.addEventListener('change', onFilterChange);

  window.filter = {
    initFilters: initFilters
  };

})();
