'use strict';

(function () {
  var successHandler = function (data) {
    data.forEach(function (item, i) {
      item.id = i;
    });
    window.map.activatePage();
    window.filter.initFilters(data);
  };

  var errorHandler = function () {
    window.notification.showError();
  };

  var load = function () {
    window.backend.load(successHandler, errorHandler);
  };

  window.data = {
    load: load
  };
})();
