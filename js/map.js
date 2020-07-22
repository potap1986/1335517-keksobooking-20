'use strict';

(function () {
  var map = document.querySelector('.map');
  var pin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var pinX = parseInt(pin.style.left, 10);
  var pinY = parseInt(pin.style.top, 10);
  address.value = pinX + ', ' + pinY;

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

  var activationPage = function () {
    window.data.load();
    filterForm.removeAttribute('disabled', true);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    cancelDisabled(inputs);
    cancelDisabled(selects);
    address.setAttribute('readonly', '');

    for (var i = 0; i < window.form.capacity.options.length; i++) {
      window.form.capacity[i].disabled = !window.form.DISABLED_ROOMS[window.form.rooms.value].includes(window.form.capacity.options[i].value);
      window.form.checkCapacity(window.form.capacity[i]);
    }

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
  };

  disactivatePage();

  pin.addEventListener('mousedown', function (evt) {
    if (evt.button === window.constants.MAIN_BUTTON) {
      activationPage();
    }
  });

  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.ENTER) {
      activationPage();
    }
  });

  window.map = {
    disactivatePage: disactivatePage
  };
})();
