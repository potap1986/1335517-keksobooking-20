'use strict';

(function () {
  var renderPin = function (advert) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');

    var onPinClick = function () {
      pinClickHandler(advert);
    };

    pin.style.left = advert.location.x - window.constants.PinSize.WIDTH / 2 + 'px';
    pin.style.top = advert.location.y - window.constants.PinSize.HEIGHT + 'px';
    pin.dataset.numPin = advert.id;
    pinImg.src = advert.author.avatar;
    pinImg.alt = advert.offer.title;

    pin.addEventListener('click', onPinClick);

    return pin;
  };

  var renderPins = function (data) {
    var pinContainer = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    var advWithOffer = data.slice().filter(function (adv) {
      return adv.offer;
    });
    advWithOffer.slice(0, window.constants.PIN_COUNT).forEach(function (adv) {
      fragment.appendChild(renderPin(adv));
    });
    pinContainer.appendChild(fragment);
  };

  var pinClickHandler = function (data) {
    var card = window.card.renderPopup(data);
    var map = document.querySelector('.map');
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    map.insertBefore(card, mapFiltersContainer);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.pin = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
