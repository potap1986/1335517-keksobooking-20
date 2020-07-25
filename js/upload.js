'use strict';
(function () {
  var avaChooser = document.querySelector('#avatar');
  var imgChooser = document.querySelector('#images');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var picPreview = document.querySelector('.ad-form__photo');

  var loadFile = function (source, cb) {
    var file = source.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      var onFileReaderLoad = function () {
        cb(reader.result);
      };

      reader.addEventListener('load', onFileReaderLoad);
      reader.readAsDataURL(file);
    }
  };

  var renderPicPreview = function (url) {
    var node = document.createElement('div');
    var pic = document.createElement('img');
    pic.width = window.constants.PicPreviewSize.WIDTH;
    pic.height = window.constants.PicPreviewSize.HEIGHT;
    pic.style.borderRadius = window.constants.PicPreviewSize.BORDER_RADIUS + 'px';
    pic.src = url;
    pic.alt = 'Фотография жилья';
    node.appendChild(pic);
    node.classList.add('ad-form__photo');
    return node;
  };

  var resetUploadedPics = function () {
    var photos = document.querySelectorAll('.ad-form__photo');
    photos.forEach(function (item) {
      item.remove();
    });
    photoContainer.appendChild(picPreview);
    avatar.src = window.constants.DEFAULT_AVATAR;
  };

  var onAvatarLoad = function (src) {
    avatar.src = src;
  };

  var onPicLoad = function (src) {
    picPreview.remove();
    photoContainer.appendChild(renderPicPreview(src));
  };

  var onAvaChooserChange = function () {
    loadFile(avaChooser, onAvatarLoad);
  };

  var onImageChooserChange = function () {
    loadFile(imgChooser, onPicLoad);
  };

  avaChooser.addEventListener('change', onAvaChooserChange);
  imgChooser.addEventListener('change', onImageChooserChange);

  window.upload = {
    resetUploadedPics: resetUploadedPics,
  };
})();
