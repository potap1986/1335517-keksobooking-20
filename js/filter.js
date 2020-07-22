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
    if (price < 10000) {
      return 'low';
    } else {
      return price <= 5000 ? 'middle' : 'high';
    }
  };

  var filterType = function (data) {
    if (typeSelect.value === 'any') {
      return true;
    } else {
      return data.offer.type === typeSelect.value;
    }
  };

  var filterPrice = function (data) {
    if (priceSelect.value === 'any') {
      return true;
    } else {
      return convertPrice(data.offer.price) === priceSelect.value;
    }
  };

  var filterRooms = function (data) {
    if (roomsSelect.value === 'any') {
      return true;
    } else {
      return data.offer.rooms === +roomsSelect.value;
    }
  };

  var filterGuests = function (data) {
    if (guestsSelect.value === 'any') {
      return true;
    }
    if (+guestsSelect.value === 0) {
      return false;
    } else {
      return data.offer.guests >= +guestsSelect.value;
    }
  };

  var filterWifi = function (data) {
    if (wifiCheckbox.checked) {
      return data.offer.features.indexOf('wifi') !== -1;
    }
    return true;
  };

  var filterDishwasher = function (data) {
    if (dishwasherCheckbox.checked) {
      return data.offer.features.indexOf('dishwasher') !== -1;
    }
    return true;
  };

  var filterParking = function (data) {
    if (parkingCheckbox.checked) {
      return data.offer.features.indexOf('parking') !== -1;
    }
    return true;
  };

  var filterWasher = function (data) {
    if (washerCheckbox.checked) {
      return data.offer.features.indexOf('washer') !== -1;
    }
    return true;
  };

  var filterElevator = function (data) {
    if (elevatorCheckbox.checked) {
      return data.offer.features.indexOf('elevator') !== -1;
    }
    return true;
  };

  var filterConditioner = function (data) {
    if (conditionerCheckbox.checked) {
      return data.offer.features.indexOf('conditioner') !== -1;
    }
    return true;
  };

  var onFilterChange = function (evt) {
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
    window.card.removePopup();
    window.pin.renderPins(filtredData);
  };

  filters.addEventListener('change', onFilterChange);

  window.filter = {
    initFilters: initFilters
  };

})();
