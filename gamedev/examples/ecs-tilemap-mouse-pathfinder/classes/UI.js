function UI(initialDom = null) {
  const self = this;
  this.dom = initialDom;
  this.init = function (dom) {
    self.dom = dom;
  };
  this.show = function (vector) {
    self.dom.style.display = 'block';

    if (vector) {
      $menu.style.left = vector.x;
      $menu.style.top = vector.y;
    }
  };
  this.hide = function () {
    self.dom.style.display = 'none';
  };
  this.add = function (dom) {
    self.dom.appendChild(dom);
  };
  this.reset = function () {
    self.dom.innerHTML = '';
  };
  return this;
}
