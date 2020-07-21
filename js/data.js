'use strict';

(function () {
  var successHandler = function (data) {
    data.forEach(function (item, i) {
      item.id = i;
    });
    window.pin.renderPins(data);
  };

  var errorHandler = function () {
    window.notification.showError(load, null, successHandler, errorHandler);
  };

  var load = function () {
    window.backend.load(successHandler, errorHandler);
  };

  window.data = {
    load: load
  };
})();
