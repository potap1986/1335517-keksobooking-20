'use strict';

(function () {
  var main = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      var errorPopup = main.querySelector('.error');
      var successPopup = main.querySelector('.success');
      if (errorPopup) {
        closeError();
      }
      if (successPopup) {
        closeSuccess();
      }
    }
  };

  var showSuccess = function () {
    main.appendChild(successMessageTemplate);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', closeSuccess);
  };

  var showError = function (action, data, onSuccess, onError) {
    var tryAgainBtn = errorMessageTemplate.querySelector('.error__button');

    main.appendChild(errorMessageTemplate);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', closeError);
    tryAgainBtn.addEventListener('click', function () {
      closeError();
      if (data === null) {
        action(onSuccess, onError);
      } else {
        action(data, onSuccess, onError);
      }
    });
  };

  var closeError = function () {
    errorMessageTemplate.remove();
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', closeError);
  };

  var closeSuccess = function () {
    successMessageTemplate.remove();
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', closeSuccess);
  };

  window.notification = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
