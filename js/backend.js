'use strict';

(function () {
  var TIMEOUT = 10000;
  var STATUS_LOAD_OK = 200;

  var Url = {
    POST: 'https://javascript.pages.academy/keksobooking',
    GET: 'https://javascript.pages.academy/keksobooking/data',
  };

  var Method = {
    GET: 'GET',
    POST: 'POST',
  };

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    var onDataLoad = function () {
      if (xhr.status === STATUS_LOAD_OK) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    };

    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';
    xhr.addEventListener('load', onDataLoad);

    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', onError);

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
