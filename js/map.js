'use strict';

(function () {
  window.map = {
    renderPin: function (advert, index) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var pin = pinTemplate.cloneNode(true);
      var pinImg = pin.querySelector('img');

      pin.style.left = advert.location.x - 20 + 'px';
      pin.style.top = advert.location.y - 50 + 'px';
      pin.dataset.numPin = index;
      pinImg.src = advert.author.avatar;
      pinImg.alt = advert.offer.title;

      return pin;
    }
  };
})();
