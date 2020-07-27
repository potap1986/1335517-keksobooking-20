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

  var onRoomsSelectChange = function () {
    Array.from(capacity.options).forEach(function (option) {
      option.disabled = !DISABLED_ROOMS[rooms.value].includes(option.value);
      checkCapacity(option);
    });
  };

  rooms.addEventListener('change', onRoomsSelectChange);

  var onCapacityChange = function () {
    Array.from(capacity.options).forEach(function (option) {
      checkCapacity(option);
    });
  };

  capacity.addEventListener('change', onCapacityChange);

  // Продолжение валидации

  var onTitleValidationInvalid = function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Имя должно состоять минимум из 30-и символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
    } else {
      title.setCustomValidity('');
    }
  };

  var onTitleInput = function () {
    var valueLength = title.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      title.setCustomValidity('');
    }
  };

  var onPriceValidationInvalid = function () {
    if (price.validity.rangeUnderflow) {
      price.setCustomValidity('Цена за ночь не может быть такой низкой при выбранном типе жилья');
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity('Цена за ночь не может быть больше 1 000 000');
    } else if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      price.setCustomValidity('');
    }
  };

  var onTypeChange = function () {
    var minPrice = window.constants.MinPrice[type.value];
    price.placeholder = minPrice;
    price.min = minPrice;
  };

  var selectTime = function (timeChanged, timeModified) {
    timeModified.value = timeChanged.value;
  };

  var resetPage = function () {
    form.reset();
    filtersForm.reset();
    window.upload.resetUploadedPics();
    window.pin.removePins();
    window.card.onPopupClose();
    window.map.disactivatePage();
  };

  var onSucces = function () {
    resetPage();
    window.notification.showSuccess();
  };

  var onError = function () {
    window.notification.showError();
  };

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(form), onSucces, onError);
    evt.preventDefault();
  };

  var onTimeInChange = function () {
    selectTime(timein, timeout);
  };

  var onTimeOutChange = function () {
    selectTime(timeout, timein);
  };

  var onResetBtnClick = function () {
    resetPage();
  };

  onTypeChange();

  title.addEventListener('invalid', onTitleValidationInvalid);
  title.addEventListener('input', onTitleInput);
  price.addEventListener('invalid', onPriceValidationInvalid);
  type.addEventListener('change', onTypeChange);
  form.addEventListener('submit', onFormSubmit);
  timein.addEventListener('change', onTimeInChange);
  timeout.addEventListener('change', onTimeOutChange);
  resetBtn.addEventListener('click', onResetBtnClick);

  window.form = {
    checkCapacity: checkCapacity,
    onRoomsSelectChange: onRoomsSelectChange,
  };
})();
