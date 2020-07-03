'use strict';

(function () {
  var getPrice = function (price) {
    return price + '₽/ночь';
  };

  var OFFER_TYPE_TRANSLATE = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];

  var getType = function (type) {
    var typeTranslate;
    window.data.OFFER_TYPE.forEach(function (elem, i) {
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
  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var renderPopup = function (advert) {
    var popupTemplate = document.querySelector('#card').content.querySelector('.popup');
    var popup = popupTemplate.cloneNode(true);
    var popupClose = popup.querySelector('.popup__close');
    popup.style.display = 'block';
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

    popupClose.addEventListener('click', function () {
      closePopup();
    });

    popupClose.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        closePopup();
      }
    });
    // debugger
    return popup;
  };

  var removePopup = function () {
    var popupWindow = document.querySelector('.popup');

    if (popupWindow) {
      popupWindow.remove();
    }
  };

  var closePopup = function () {
    removePopup();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.card = {
    renderPopup: renderPopup,
    removePopup: removePopup
  };
})();
