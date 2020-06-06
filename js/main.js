'use strict';

var mapStatic = document.querySelector('.map');
mapStatic.classList.remove('map--faded');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var announcements = [];
var announcementsQantity = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
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

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var renderFragment = function (count) {
  for (var i = 0; i < count; i++) {
    fragment.appendChild(renderPin(announcements[i]));
  }
};

renderFragment(announcementsQantity);

mapPins.appendChild(fragment);
