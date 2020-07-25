'use strict';

(function () {
  var main = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var onPopupEscPress = function (evt) {
    if (evt.key === window.constants.KeyCode.ESC) {
      var errorPopup = main.querySelector('.error');
      var successPopup = main.querySelector('.success');
      if (errorPopup) {
        onErrorMessageClose();
      }
      if (successPopup) {
        onSuccessMessageClose();
      }
    }
  };

  var showSuccess = function () {
    main.appendChild(successMessageTemplate);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onSuccessMessageClose);
  };

  var showError = function () {
    var tryAgainBtn = errorMessageTemplate.querySelector('.error__button');

    main.appendChild(errorMessageTemplate);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('mousedown', onErrorMessageClose);
    tryAgainBtn.addEventListener('click', onErrorMessageClose);
  };

  var onErrorMessageClose = function () {
    errorMessageTemplate.remove();
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', onErrorMessageClose);
  };

  var onSuccessMessageClose = function () {
    successMessageTemplate.remove();
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', onSuccessMessageClose);
  };

  window.notification = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
