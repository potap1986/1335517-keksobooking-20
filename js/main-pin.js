'use strict';

(function () {
  var minCoordianteY = window.constants.MIN_Y - window.constants.MainPin.HEIGHT - window.constants.MainPin.TAIL;
  var maxCoordinateY = window.constants.MAX_Y - window.constants.MainPin.HEIGHT - window.constants.MainPin.TAIL;

  var pinCenter = Math.round(window.constants.MainPin.HEIGHT / 2);

  var mapPins = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var pinX = pin.offsetLeft + window.constants.MAIN_PIN_RADIUS;
  var pinY = pin.offsetTop + window.constants.MAIN_PIN_RADIUS;

  var defaultAddress = pinX + ', ' + pinY;

  var setDefault = function () {
    pin.style.left = pinX - window.constants.MAIN_PIN_RADIUS + 'px';
    pin.style.top = pinY - window.constants.MAIN_PIN_RADIUS + 'px';
    address.value = defaultAddress;
  };

  // Перемещение пинa

  var onPinMousedown = function (evt) {
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

      address.value = (pin.offsetLeft + window.constants.MAIN_PIN_RADIUS) + ', ' + (pin.offsetTop + window.constants.DIFF_TOP);
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
  };

  pin.addEventListener('mousedown', onPinMousedown);

  window.mainPin = {
    setDefault: setDefault
  };
})();
