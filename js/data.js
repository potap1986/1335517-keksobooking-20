'use strict';

(function () {
  /* var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }; */

  var announcementsQantity = 8;
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  /* var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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
  }; */

  // Создание массива объявлений

  var createAnnouncements = function (adv/* count */) {
  var announcements = [];
  for (var i = 0; i < announcementsQantity; i++) {
  /*   var locationX = getRandomNumber(50, 700);
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
      };*/
  /* var object = {
        author: {
          avatar: adv[i].autor.avatar
        },
        offer: {
          title: adv[i].offer.title,
          address: adv[i].offer.title,
          price: adv[i].offer.price,
          type: adv[i].offer.type,
          rooms: adv[i].offer.rooms,
          guests: adv[i].offer.guests,
          checkin: adv[i].offer.checkin,
          checkout: adv[i].offer.checkout,
          features: adv[i].offer.features,
          description: adv[i].offer.description,
          photos: adv[i].offer.photos,
        },
        location: {
          x: adv[i].location.x,
          y: adv[i].location.y
        }
      };*/

      var object = {};
      object.author.avatar = adv[i].author.avatar;
      object.offer.title = adv[i].offer.title;
      object.offer.address = adv[i].offer.title;
      object.offer.price = adv[i].offer.price;
      object.offer.type = adv[i].offer.type;
      object.offer.rooms = adv[i].offer.rooms;
      object.offer.guests = adv[i].offer.guests;
      object.offer.checkin = adv[i].offer.checkin;
      object.offer.checkout = adv[i].offer.checkout;
      object.offer.features = adv[i].offer.features;
      object.offer.description = adv[i].offer.description;
      object.offer.photos = adv[i].offer.photos;
      object.location.x = adv[i].location.x;
      object.location.y = adv[i].location.y;

      announcements.push(object);
    }
    return announcements;
  };

  /* var pins = []; */
  var adverts = [];

  var successHandler = function (data) {
    adverts = createAnnouncements(data);
    /* mapPins.appendChild(fragment);
    pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].addEventListener('click', window.map.onPinClick);
      }
    } */
    return adverts;
  };

  var errorHandler = function () {
    var errorTemplate = document.querySelector('#error');
    document.body.appendChild(errorTemplate);
    var tryAgainButton = errorTemplate.querySelector('.error__button');
    tryAgainButton.addEventListener('click', function () {
      window.backend.load(successHandler, errorHandler);
    });

    var closeError = function () {
      document.body.removeChild(errorTemplate);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onPopupEscPress = function (evt) {
      window.util.isEscEvent(evt, closeError);
    };

    document.addEventListener('keydown', onPopupEscPress);
  };

  window.backend.load(successHandler, errorHandler);

  // var adverts = createAnnouncements(announcementsQantity);

  window.data = {
    OFFER_TYPE: OFFER_TYPE,
    announcementsQantity: announcementsQantity,
    // createAnnouncements: createAnnouncements
    adverts: adverts
  };
})();
