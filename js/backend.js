'use strict';

(function () {
  var Url = {
    POST: 'https://javascript.pages.academy/keksobooking',
    GET: 'https://javascript.pages.academy/keksobooking/data',
  };

  var Method = {
    GET: 'GET',
    POST: 'POST',
  };

  var TIMEOUT = 10000;

  var statusLoadOk = 200;

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === statusLoadOk) {
        onLoad(xhr.response);
      } else {
        onError('Данные не загрузились. Причина: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var req = createRequest(onLoad, onError);
    req.open(Method.GET, Url.GET);
    req.send();
  };

  var save = function (data, onLoad, onError) {
    var req = createRequest(onLoad, onError);
    req.open(Method.POST, Url.POST);
    req.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
