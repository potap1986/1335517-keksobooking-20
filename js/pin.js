'use strict';

(function () {

  var MIN_Y = 130;
  var MAX_Y = 630;

  var MAIN_PIN = {
    width: 65,
    height: 65,
    tail: 15
  };

  var DIFF_LEFT = 40;
  var DIFF_TOP = 80;

  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var fragment = document.createDocumentFragment();
  var card = document.createDocumentFragment();

  var minCoordianteY = MIN_Y - MAIN_PIN.height - MAIN_PIN.tail;
  var maxCoordinateY = MAX_Y - MAIN_PIN.height - MAIN_PIN.tail;

  var pinCenter = Math.round(MAIN_PIN.height / 2);

  var ENTER = 13;
  var mainButton = 0;
  var renderFragment = function (adverts) {
    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(window.map.renderPin(adverts[i], i));
    }
  };

  renderFragment(window.data.adverts);

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
  var pinX = parseInt(pin.style.left, 10);
  var pinY = parseInt(pin.style.top, 10);

  address.value = pinX + ', ' + pinY;

  // Перемещение пинa

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var coordinates = {
      x: evt.clientX,
      y: evt.clinentY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      var mapWidth = mapPins.offsetWidth;

      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: coordinates.x - moveEvt.clientX,
        y: coordinates.y - moveEvt.clientY
      };

      coordinates.x = moveEvt.clientX;
      coordinates.y = moveEvt.clientY;

      var resultX = pin.offsetLeft - shift.x;
      var resultY = pin.offsetTop - shift.y;

      pin.style.left = resultX < -pinCenter ? -pinCenter + 'px' : resultX + 'px';

      if (resultX > mapWidth - pinCenter) {
        pin.style.left = mapWidth - pinCenter + 'px';
      }

      if (resultY <= minCoordianteY) {
        pin.style.top = minCoordianteY + 'px';
      } else if (resultY >= maxCoordinateY) {
        pin.style.top = maxCoordinateY + 'px';
      } else {
        pin.style.top = resultY + 'px';
      }

      address.value = (parseInt(pin.style.left, 10) + DIFF_LEFT) + ', ' + (parseInt(pin.style.top, 10) + DIFF_TOP);

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
    // mapPins.appendChild(fragment);
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
