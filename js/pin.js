'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var fragment = document.createDocumentFragment();
  var card = document.createDocumentFragment();
  var PIN_MAIN_HEIGHT = 62 + 22;
  var PIN_MAIN_HALF = 31;

  var MapArea = {
    TOP: 70,
    BOTTOM: 570,
    LEFT: map.offsetLeft + PIN_MAIN_HALF,
    RIGHT: map.offsetLeft + 1200,
  };

  var ENTER = 13;
  var mainButton = 0;
  var renderFragment = function (count) {
    for (var i = 0; i < count; i++) {
      fragment.appendChild(window.map.renderPin(window.data.adverts[i], i));
    }
  };

  renderFragment(window.data.announcementsQantity);

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var form = document.querySelector('.ad-form');
  var inputs = document.querySelectorAll('input');
  var selects = document.querySelectorAll('select');

  var setDisabled = function (elem) {
    elem.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
  };

  setDisabled(inputs);
  setDisabled(selects);

  var cancelDisabled = function (elem) {
    elem.forEach(function (item) {
      item.removeAttribute('disabled', true);
    });
  };

  var address = document.querySelector('#address');
  var pin = document.querySelector('.map__pin--main');
  var pinX = parseInt(pin.style.left, 10) + PIN_MAIN_HALF;
  var pinY = parseInt(pin.style.top, 10) + PIN_MAIN_HEIGHT;

  address.value = pinX + ', ' + pinY;

  // Перемещение пинa

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;
      var limitedShift = {
        x: Math.min(Math.max(moveEvt.pageX, MapArea.LEFT), MapArea.RIGHT),
        y: Math.min(Math.max(moveEvt.pageY, MapArea.TOP), MapArea.BOTTOM)
      };

      var shift = {
        x: startCoords.x - limitedShift.x,
        y: startCoords.y - limitedShift.y
      };

      startCoords = {
        x: limitedShift.x,
        y: limitedShift.y
      };

      pin.style.top = (pin.offsetTop - shift.y) + 'px';
      pin.style.left = (pin.offsetLeft - shift.x) + 'px';
      address.value = (parseInt(pin.style.left, 10) + PIN_MAIN_HALF) + ', ' + (parseInt(pin.style.top, 10) + PIN_MAIN_HEIGHT);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pin.removeEventListener('click', onClickPreventDefault);
        };
        pin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Активация страницы

  var activationPage = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    mapPins.appendChild(fragment);
    cancelDisabled(inputs);
    cancelDisabled(selects);
    address.setAttribute('disabled', '');

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

  pin.addEventListener('mousedown', function (evt) {
    if (evt.button === mainButton) {
      activationPage();
    }
  });

  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      activationPage();
    }
  });

  mapPins.addEventListener('click', function (evt) {
    var target = evt.target;
    var numPin = target.parentElement.dataset.numPin;
    window.card.removePopup();

    if (numPin) {
      card = window.card.renderPopup(window.data.adverts[numPin]);
      map.insertBefore(card, mapFiltersContainer);
    }
  });

  map.insertBefore(card, mapFiltersContainer);
})();
