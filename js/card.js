'use strict';

(function () {
  var Rooms = {
    LIMIT_1: 0,
    LIMIT_2: 2,
    LIMIT_3: 5,
  };

  var Guests = {
    LIMIT_1: 0,
    LIMIT_2: 1,
  };

  var getPrice = function (price) {
    return price + '₽/ночь';
  };

  var getCapacity = function (rooms, guests) {
    var roomsLine;
    var guestsLine;
    if (rooms % window.constants.DIVIDER >= Rooms.LIMIT_2 && rooms % window.constants.DIVIDER < Rooms.LIMIT_3) {
      roomsLine = rooms + ' комнаты';
    } else if (rooms % window.constants.DIVIDER >= Rooms.LIMIT_3 || rooms % window.constants.DIVIDER === Rooms.LIMIT_1) {
      roomsLine = rooms + ' комнат';
    } else {
      roomsLine = rooms + ' комната';
    }
    if (guests % window.constants.DIVIDER === Guests.LIMIT_1) {
      guestsLine = ' не для гостей';
    } else if (guests % window.constants.DIVIDER === Guests.LIMIT_2) {
      guestsLine = ' для ' + guests + ' гостя';
    } else {
      guestsLine = ' для ' + guests + ' гостей';
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
    if (evt.key === window.constants.KeyCode.ESC) {
      evt.preventDefault();
      onPopupClose();
    }
  };

  var renderPhoto = function (url) {
    var node = document.createElement('img');
    node.classList.add('popup__photo');
    node.width = window.constants.PhotoSize.WIDTH;
    node.height = window.constants.PhotoSize.HEIGHT;
    node.src = url;
    node.alt = 'Фото жилья';
    return node;
  };

  var renderPhotos = function (urls, container) {
    container.querySelectorAll('.popup__photo').forEach(function (element) {
      element.remove();
    });
    var fragment = document.createDocumentFragment();
    urls.forEach(function (url) {
      fragment.appendChild(renderPhoto(url));
    });
    container.appendChild(fragment);
  };

  var renderPopup = function (advert) {
    onPopupClose();
    var popupTemplate = document.querySelector('#card').content.querySelector('.popup');
    var popup = popupTemplate.cloneNode(true);
    var popupClose = popup.querySelector('.popup__close');
    popup.style.display = 'block';
    popup.querySelector('.popup__title').textContent = advert.offer.title;
    popup.querySelector('.popup__text--address').textContent = advert.offer.address;
    popup.querySelector('.popup__text--price').textContent = getPrice(advert.offer.price);
    popup.querySelector('.popup__type').textContent = window.constants.OfferType[advert.offer.type];
    popup.querySelector('.popup__text--capacity').textContent = getCapacity(advert.offer.rooms, advert.offer.guests);
    popup.querySelector('.popup__text--time').textContent = getTime(advert.offer.checkin, advert.offer.checkout);
    getFeatures(advert.offer.features, popup);
    popup.querySelector('.popup__description').textContent = advert.offer.description;
    renderPhotos(advert.offer.photos, popup.querySelector('.popup__photos'));
    popup.querySelector('.popup__avatar').src = advert.author.avatar;

    popupClose.addEventListener('click', onPopupClose);

    document.addEventListener('keydown', onPopupEscPress);
    return popup;
  };

  var onPopupClose = function () {
    var popupWindow = document.querySelector('.popup');

    if (popupWindow) {
      popupWindow.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  window.card = {
    renderPopup: renderPopup,
    onPopupClose: onPopupClose
  };
})();
