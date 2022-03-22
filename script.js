"use strict";

var body = document.getElementsByTagName("body");

var bigImg = document.getElementById("BIG");
bigImg.addEventListener("mousedown", mouseDown, false);
document.addEventListener("dblclick", hide, false);

var array = [];
for (var i = 0; i < 8; i++) {
  var img = document.createElement("div");
  bigImg.appendChild(img);
  img.style.position = "absolute";
  img.style.visibility = "hidden";
  img.style.width = "10px";
  img.style.height = "10px";
  img.style.backgroundColor = "#FEC55C";
  img.addEventListener("mousedown", mouseDownl, false);
  img.addEventListener("mouseover", mouseOverl, false);
  array.push(img);
}
function countAndSetNewCoordsForLittleImg(imgWidth, imgHeight, width) {
  var formulas = [
    [-width / 2, -width / 2],
    [(imgWidth - width) / 2, -width / 2],
    [imgWidth - width / 2, -width / 2],
    [imgWidth - width / 2, (imgHeight - width) / 2],
    [imgWidth - width / 2, imgHeight - width / 2],
    [(imgWidth - width) / 2, imgHeight - width / 2],
    [-width / 2, imgHeight - width / 2],
    [-width / 2, (imgHeight - width) / 2],
  ];
  for (var i = 0; i < array.length; i++) {
    var a = formulas[i][0] + "px";
    var b = formulas[i][1] + "px";
    array[i].style.left = a;
    array[i].style.top = b;
    array[i].style.visibility = 'visible';
  }
}

function mouseDown(e) {
  e = e || window.event;
  var self = this;
  e.preventDefault();
  var imgPos = self.getBoundingClientRect();
  var imgTop = imgPos.y + window.pageYOffset;
  var imgLeft = imgPos.x + window.pageXOffset;
  var imgWidth = imgPos.width;
  var imgHeight = imgPos.height;
  var deltaX = e.clientX - imgLeft;
  var deltaY = e.clientY - imgTop;

  var littleImgPos = array[0].getBoundingClientRect();
  var width = littleImgPos.width;
  countAndSetNewCoordsForLittleImg(imgWidth, imgHeight, width);

  document.addEventListener("mousemove", mouseMove, false);
  document.addEventListener("mouseup", mouseUp, false);

  function mouseUp(e) {
    e.preventDefault();
    document.removeEventListener("mousemove", mouseMove, false);
    document.removeEventListener("mouseup", mouseUp, false);
  }

  function mouseMove(e) {
    e.preventDefault();
    self.style.left = Math.round(e.pageX - deltaX) + "px";
    self.style.top = Math.round(e.pageY - deltaY) + "px";
  }
}

function hide(e) {
  e = e || window.event;
  var self = this;
  e.preventDefault();
  for (var i = 0; i < array.length; i++) {
    array[i].style.visibility = "hidden";
  }
}

function mouseDownl(e) {
  e = e || window.event;
  var self = this;
  e.preventDefault();
  bigImg.removeEventListener("mousedown", mouseDown, false);

  var j = array.indexOf(self);

  var startX = e.clientX;
  var startY = e.clientY;

  document.addEventListener("mousemove", mouseMovel, false);
  document.addEventListener("mouseup", mouseUpl, false);

  function mouseUpl(e) {
    e.preventDefault();
    bigImg.addEventListener("mousedown", mouseDown, false);
    self.style.cursor = "default";
    document.removeEventListener("mousemove", mouseMovel, false);
    document.removeEventListener("mouseup", mouseUpl, false);
  }

  function mouseMovel(e) {
    e.preventDefault();
    var imgPos = self.getBoundingClientRect();
    var width = imgPos.width;

    var bigPos = bigImg.getBoundingClientRect();
    var bigLeft = bigPos.x;
    var bigTop = bigPos.y;
    var bigWidth = bigPos.width;
    var bigHeight = bigPos.height;
    var ratio = bigHeight / bigWidth;
    var deltaX = e.clientX - startX;
    var deltaY = e.clientY - startY;

    switch (j) {
      case 0:
        bigTop += deltaX * ratio;
        bigHeight -= deltaX * ratio;
        bigLeft += deltaX;
        bigWidth -= deltaX;
        bigImg.style.left = bigLeft + "px";
        bigImg.style.top = bigTop + "px";
        bigImg.style.width = bigWidth + "px";
        bigImg.style.height = bigHeight + "px";
        break;
      case 1:
        bigTop += deltaY;
        bigHeight -= deltaY;
        bigImg.style.left = bigLeft + "px";
        bigImg.style.top = bigTop + "px";
        bigImg.style.width = bigWidth + "px";
        bigImg.style.height = bigHeight + "px";
        break;
      case 2:
        bigTop -= deltaX * ratio;
        bigHeight += deltaX * ratio;
        bigLeft -= deltaX;
        bigWidth += deltaX;
        bigImg.style.right = bigLeft + "px";
        bigImg.style.top = bigTop + "px";
        bigImg.style.width = bigWidth + "px";
        bigImg.style.height = bigHeight + "px";
        break;
      case 3:
        bigWidth += deltaX;
        bigImg.style.left = bigLeft + "px";
        bigImg.style.top = bigTop + "px";
        bigImg.style.width = bigWidth + "px";
        bigImg.style.height = bigHeight + "px";
        break;
      case 4:
        bigTop += deltaX * ratio;
        bigHeight += deltaX * ratio;
        bigLeft += deltaX;
        bigWidth += deltaX;
        bigImg.style.right = bigLeft + "px";
        bigImg.style.bottom = bigTop + "px";
        bigImg.style.width = bigWidth + "px";
        bigImg.style.height = bigHeight + "px";
        break;
      case 5:
        bigHeight += deltaY;
        bigImg.style.left = bigLeft + "px";
        bigImg.style.top = bigTop + "px";
        bigImg.style.width = bigWidth + "px";
        bigImg.style.height = bigHeight + "px";
        break;
      case 6:
        bigTop -= deltaX * ratio;
        bigHeight -= deltaX * ratio;
        bigLeft += deltaX;
        bigWidth -= deltaX;
        bigImg.style.left = bigLeft + "px";
        bigImg.style.bottom = bigTop + "px";
        bigImg.style.width = bigWidth + "px";
        bigImg.style.height = bigHeight + "px";
        break;
      case 7:
        bigLeft += deltaX;
        bigWidth -= deltaX;
        bigImg.style.left = bigLeft + "px";
        bigImg.style.top = bigTop + "px";
        bigImg.style.width = bigWidth + "px";
        bigImg.style.height = bigHeight + "px";
        break;
    }
    countAndSetNewCoordsForLittleImg(bigWidth, bigHeight, width);
    startX = e.clientX;
    startY = e.clientY;
  }
}
function mouseOverl(e) {
  e = e || window.event;
  var self = this;
  e.preventDefault();
  var j = array.indexOf(self);
  switch (j) {
    case 0:
    case 4:
      self.style.cursor = "nwse-resize";
      break;
    case 1:
    case 5:
      self.style.cursor = "ns-resize";
      break;
    case 2:
    case 6:
      self.style.cursor = "nesw-resize";
      break;
    case 3:
    case 7:
      self.style.cursor = "ew-resize";
      break;
  }
}