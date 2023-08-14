var _c = document.getElementById('canvas');
var _mw = _mx = 800;
var _mh = _my = 600;
var _running = true;
var fps = 60;
_c.width = _mw;
_c.height = _mh;
var c = _c.getContext('2d');
var keyState = {};