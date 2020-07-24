'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var DISABLED_ROOMS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var form = document.querySelector('.ad-form');
  var resetBtn = document.querySelector('.ad-form__reset');
  var filtersForm = document.querySelector('.map__filters');
  var rooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var title = form.querySelector('#title');
  var price = form.querySelector('#price');
  var type = form.querySelector('#type');
  var timein = form.querySelector('#timein');
  var timeout = form.querySelector('#timeout');

  // Валидация комнат и гостей

  var checkCapacity = function (item) {
    if (item.selected) {
      if (item.disabled) {
        capacity.setCustomValidity('Количество гостей не соответствует количеству комнат');
      } else {
        capacity.setCustomValidity('');
      }
    }
  };

  rooms.addEventListener('change', function () {
    for (var i = 0; i < capacity.options.length; i++) {
      capacity[i].disabled = !DISABLED_ROOMS[rooms.value].includes(capacity.options[i].value);
      window.form.checkCapacity(capacity[i]);
    }
  });

  capacity.addEventListener('change', function () {
    for (var i = 0; i < capacity.options.length; i++) {
      window.form.checkCapacity(capacity[i]);
    }
  });

  // Продолжение валидации

  title.addEventListener('invalid', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Имя должно состоять минимум из 30-и символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
    } else {
      title.setCustomValidity('');
    }
  });

  title.addEventListener('input', function () {
    var valueLength = title.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      title.setCustomValidity('');
    }
  });

  price.addEventListener('invalid', function () {
    if (price.validity.rangeUnderflow) {
      price.setCustomValidity('Цена за ночь не может быть такой низкой при выбранном типе жилья');
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity('Цена за ночь не может быть больше 1 000 000');
    } else if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      price.setCustomValidity('');
    }
  });

  var changeMinPrice = function () {
    switch (type.value) {
      case 'flat':
        price.placeholder = '1000';
        price.min = '1000';
        break;
      case 'bungalo':
        price.placeholder = '0';
        price.min = '0';
        break;
      case 'house':
        price.placeholder = '5000';
        price.min = '5000';
        break;
      case 'palace':
        price.placeholder = '10000';
        price.min = '10000';
        break;
      default:
        price.placeholder = '1000';
        price.min = '1000';
    }
  };

  changeMinPrice();

  type.addEventListener('change', function () {
    changeMinPrice();
  });

  var selectTime = function (timeChanged, timeModified) {
    timeModified.value = timeChanged.value;
  };

  var resetPage = function () {
    form.reset();
    filtersForm.reset();
    window.pin.removePins();
    window.card.removePopup();
    window.map.disactivatePage();
  };

  var onSucces = function () {
    resetPage();
    window.notification.showSuccess();
  };

  var onError = function () {
    window.notification.showError();
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSucces, onError);
    evt.preventDefault();
  });

  timein.addEventListener('change', function () {
    selectTime(timein, timeout);
  });

  timeout.addEventListener('change', function () {
    selectTime(timeout, timein);
  });

  resetBtn.addEventListener('click', resetPage);

  window.form = {
    rooms: rooms,
    capacity: capacity,
    DISABLED_ROOMS: DISABLED_ROOMS,
    checkCapacity: checkCapacity
  };
})();
