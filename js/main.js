'use strict';

var mapStatic = document.querySelector('.map');
mapStatic.classList.remove('map--faded');

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

var renderPopup = function (advert) {
  var popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  var popup = popupTemplate.cloneNode(true);
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

var renderCard = function (count) {
  for (var i = 0; i < count; i++) {
    card.appendChild(renderPopup(announcements[i]));
  }
  return card;
};

renderFragment(announcementsQantity);

mapPins.appendChild(fragment);

var mapFilters = document.querySelector('.map__filters-container');
map.insertBefore(renderCard(announcementsQantity), mapFilters);
