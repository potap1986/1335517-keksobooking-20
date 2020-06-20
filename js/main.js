'use strict';

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var announcements = [];
var announcementsQantity = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TYPE_TRANSLATE = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var roomsMIN = 1;
var roomsMAX = 3;
var guestsMIN = 0;
var guestsMAX = 2;
var PIN_MAIN_HALF = 31;
var PIN_MAIN_HEIGHT = 62 + 22;
var ENTER = 13;
var mainButton = 0;

var getAvatar = function (index) {
  return 'img/avatars/user0' + (index + 1) + '.png';
};

var getTitle = function (index) {
  return 'Заголовок предложения ' + (index + 1);
};

var getNewOfferFeatures = function () {
  var arr = [];
  for (var i = 0; i < getRandomNumber(0, OFFER_FEATURES.length); i++) {
    if (getRandomNumber(0, 1)) {
      arr.push(OFFER_FEATURES[i]);
    }
  }
  return arr;
};

var getDescription = function (index) {
  return 'Описание ' + (index + 1);
};

// Создание массива объявлений

var createAnnouncements = function (count) {
  for (var i = 0; i < count; i++) {
    var locationX = getRandomNumber(50, 700);
    var locationY = getRandomNumber(130, 630);
    var object = {
      author: {
        avatar: getAvatar(i)
      },
      offer: {
        title: getTitle(i),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1000, 100000),
        type: OFFER_TYPE[getRandomNumber(0, 3)],
        rooms: getRandomNumber(roomsMIN, roomsMAX),
        guests: getRandomNumber(guestsMIN, guestsMAX),
        checkin: '1' + getRandomNumber(2, 4) + ':00',
        checkout: '1' + getRandomNumber(2, 4) + ':00',
        features: getNewOfferFeatures(),
        description: getDescription(i),
        photos: 'http://o0.github.io/assets/images/tokyo/hotel' + getRandomNumber(1, 3) + '.jpg',
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    announcements.push(object);
  }
};

createAnnouncements(announcementsQantity);

// Создание пинов на карте

var renderPin = function (advert) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pin = pinTemplate.cloneNode(true);
  var pinImg = pin.querySelector('img');

  pin.style.left = advert.location.x - 20 + 'px';
  pin.style.top = advert.location.y - 50 + 'px';
  pinImg.src = advert.author.avatar;
  pinImg.alt = advert.offer.title;

  return pin;
};

var getPrice = function (price) {
  return price + '₽/ночь';
};

var getType = function (type) {
  var typeTranslate;
  OFFER_TYPE.forEach(function (elem, i) {
    if (type === elem) {
      typeTranslate = OFFER_TYPE_TRANSLATE[i];
    }
  });
  return typeTranslate;
};

var getCapacity = function (rooms, guests) {
  var roomsLine;
  var guestsLine;
  if (rooms >= 2 && rooms < 5) {
    roomsLine = rooms + ' комнаты';
  } else if (rooms >= 5) {
    roomsLine = rooms + ' комнат';
  } else {
    roomsLine = rooms + ' комната';
  }
  if (guests >= 2) {
    guestsLine = ' для ' + guests + ' гостей';
  } else if (guests === 1) {
    guestsLine = ' для ' + guests + ' гостя';
  } else if (guests === 0) {
    guestsLine = ' не для гостей';
  }
  return roomsLine + guestsLine;
};

var getTime = function (checkin, checkout) {
  return 'Заезд после ' + checkin + ', выезд до ' + checkout;
};

var getFeatures = function (features, doc) {
  var featuresCard = doc.querySelector('.popup__features');
  featuresCard.innerHTML = '';
  if (features.length !== 0) {
    features.forEach(function (elem) {
      var cardLiTemplate = document.querySelector('#card').content.querySelector('.popup__feature');
      var feature = cardLiTemplate.cloneNode(true);
      feature.className = 'popup__feature popup__feature--' + elem;
      featuresCard.appendChild(feature);
    });
  } else {
    featuresCard.style.display = 'none';
  }
  return featuresCard;
};

// Создание всплывающего окна

var renderPopup = function (advert) {
  var popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  var popup = popupTemplate.cloneNode(true);
  popup.style.display = 'none';
  popup.querySelector('.popup__title').textContent = advert.offer.title;
  popup.querySelector('.popup__text--address').textContent = advert.offer.address;
  popup.querySelector('.popup__text--price').textContent = getPrice(advert.offer.price);
  popup.querySelector('.popup__type').textContent = getType(advert.offer.type);
  popup.querySelector('.popup__text--capacity').textContent = getCapacity(advert.offer.rooms, advert.offer.guests);
  popup.querySelector('.popup__text--time').textContent = getTime(advert.offer.checkin, advert.offer.checkout);
  getFeatures(advert.offer.features, popup);
  popup.querySelector('.popup__description').textContent = advert.offer.description;
  popup.querySelector('.popup__photo').src = advert.offer.photos;
  popup.querySelector('.popup__avatar').src = advert.author.avatar;

  return popup;
};

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var fragment = document.createDocumentFragment();
var card = document.createDocumentFragment();
var renderFragment = function (count) {
  for (var i = 0; i < count; i++) {
    fragment.appendChild(renderPin(announcements[i]));
  }
};

// Создаие массива всплывающих окон

var renderCard = function (count) {
  for (var i = 0; i < count; i++) {
    card.appendChild(renderPopup(announcements[i]));
  }
  return card;
};

renderFragment(announcementsQantity);

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

// Активация страницы

var activationPage = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  mapPins.appendChild(fragment);
  map.insertBefore(renderCard(announcementsQantity), mapFiltersContainer);
  cancelDisabled(inputs);
  cancelDisabled(selects);

  for (var i = 0; i < capacity.options.length; i++) {
    capacity[i].disabled = !DISABLED_ROOMS[rooms.value].includes(capacity.options[i].value);
    checkCapacity(capacity[i]);
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

// Валидация комнат и гостей

var DISABLED_ROOMS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
var rooms = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');

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
    checkCapacity(capacity[i]);
  }
});

capacity.addEventListener('change', function () {
  for (var i = 0; i < capacity.options.length; i++) {
    checkCapacity(capacity[i]);
  }
});

// Показ всплывающего окна
/*
var popupOpen = document.querySelectorAll('.map__pin');
var popupClose = document.querySelectorAll('.popup__close');
var popupWindow = document.querySelectorAll('.popup');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    deactivationPopup();
  }
};

var activationPopup = function (elem) {
  elem.style.display = 'block';
  document.addEventListener('keydown', onPopupEscPress);
};

var deactivationPopup = function () {
  popupWindow.style.display = 'none';
  document.addEventListener('keydown', onPopupEscPress);
};

popupOpen.forEach(function (elem, i) {
  elem.addEventListener('click', function () {
    activationPopup(popupWindow[i]);
  });

  elem.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activationPopup(popupWindow[i]);
    }
  });
});


popupClose.forEach(function (elem) {
  elem.addEventListener('click', function () {
    deactivationPopup();
  });

  elem.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      deactivationPopup();
    }
  });
});
*/

// Продолжение валидации

var title = form.querySelector('#title');
var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;

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

var price = form.querySelector('#price');

price.addEventListener('invalid', function () {
  if (price.validity.rangeUnderflow) {
    price.setCustomValidity('Цена за ночь на может быть меньше 0');
  } else if (price.validity.rangeOverflow) {
    price.setCustomValidity('Цена за ночь не может быть больше 1 000 000');
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else {
    price.setCustomValidity('');
  }
});

var type = form.querySelector('#type');

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

type.addEventListener('change', function () {
  changeMinPrice();
});


var timein = form.querySelector('#timein');
var timeout = form.querySelector('#timeout');

var selectTime = function (timeChanged, timeModified) {
  timeModified.value = timeChanged.value;
};

timein.addEventListener('change', function () {
  selectTime(timein, timeout);
});

timeout.addEventListener('change', function () {
  selectTime(timeout, timein);
});

var avatar = form.querySelector('#avatar');
var images = form.querySelector('#images');
