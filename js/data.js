'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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

  // Создание массива объявлений

  var createAnnouncements = function (count) {
    var announcements = [];
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
    return announcements;
  };

  var adverts = createAnnouncements(announcementsQantity);

  window.data = {
    OFFER_TYPE: OFFER_TYPE,
    announcementsQantity: announcementsQantity,
    adverts: adverts
  };
})();
