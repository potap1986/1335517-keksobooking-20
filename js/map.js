'use strict';

(function () {
  var map = document.querySelector('.map');
  var pin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  var form = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var inputs = document.querySelectorAll('input');
  var selects = document.querySelectorAll('select');

  var setDisabled = function (elem) {
    elem.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
  };

  var cancelDisabled = function (elem) {
    elem.forEach(function (item) {
      item.removeAttribute('disabled', true);
    });
  };

  // Активация страницы

  var onMainPinClick = function () {
    window.data.load();
  };

  var onMainPinMouseDown = function (evt) {
    if (evt.button === window.constants.MAIN_BUTTON) {
      onMainPinClick();
    }
  };

  var onMainPinKeyDown = function (evt) {
    if (evt.keyCode === window.constants.ENTER) {
      onMainPinClick();
    }
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    cancelDisabled(inputs);
    cancelDisabled(selects);
    address.setAttribute('readonly', '');

    window.form.onRoomsSelectChange();

    var mapFilters = document.querySelector('.map__filters');
    var mapFiltersElements = Array.from(mapFilters.getElementsByTagName('*'));
    mapFiltersElements.forEach(function (item) {
      item.removeAttribute('disabled', true);
    });
  };

  var disactivatePage = function () {
    setDisabled(inputs);
    setDisabled(selects);
    filterForm.setAttribute('disabled', '');
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.mainPin.setDefault();
    pin.addEventListener('mousedown', onMainPinMouseDown, {once: true});
    pin.addEventListener('keydown', onMainPinKeyDown, {once: true});
  };

  disactivatePage();

  window.map = {
    activatePage: activatePage,
    disactivatePage: disactivatePage
  };
})();
