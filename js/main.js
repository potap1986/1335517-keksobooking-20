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

var createAnnouncements = function (count) {
  for (var i = 0; i < count; i++) {
    var object = {};
    var author = {};
    var offer = {};
    var location = {};
    author.avatar = 'img/avatars/user0' + getRandomNumber(1, 8) + '.png';
    object.author = author;
    offer.title = 'Заголовок предложения ' + (i + 1);
    offer.address = getRandomNumber(100, 900) + ', ' + getRandomNumber(100, 900);
    offer.price = getRandomNumber(1000, 10000);
    offer.type = OFFER_TYPE[getRandomNumber(0, 3)];
    offer.rooms = getRandomNumber(1, 6);
    offer.guests = getRandomNumber(1, 10);
    offer.checkin = '1' + getRandomNumber(2, 4) + ':00';
    offer.checkout = '1' + getRandomNumber(2, 4) + ':00';
    offer.features = [];
    for (var j = 0; j < getRandomNumber(0, OFFER_FEATURES.length); j++) {
      if (getRandomNumber(0, 1)) {
        offer.features.push(OFFER_FEATURES[j]);
      }
    }
    offer.description = 'Описание ' + (i + 1);
    offer.photos = 'http://o0.github.io/assets/images/tokyo/hotel' + getRandomNumber(1, 3) + '.jpg';
    object.offer = offer;
    location.x = getRandomNumber(50, 700);
    location.y = getRandomNumber(130, 630);
    object.location = location;
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
