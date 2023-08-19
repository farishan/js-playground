/* import Vector2D from classes */
/* import MapEntity from classes */

function Player(
  x = 1 /* tile */,
  y = 1 /* tile */,
  width = 1 /* tile */,
  height = 1 /* tile */,
  color = 'magenta'
) {
  MapEntity.call(this, x, y, width, height, color);

  this.pathfinder = function () {};
  this.targetPosition = null; // grid coord

  this.actionQueue = [];
  this.actionTargetMap = {};

  this.inventory = [];
}

Player.prototype.checkShouldMove = function () {
  return (
    this.targetPosition &&
    this.targetPosition !== null &&
    (this.x !== this.targetPosition.x || this.y !== this.targetPosition.y)
  );
};

Player.prototype.moveVertical = function (direction) {
  if (direction.includes('N')) {
    this.y--;
  } else if (direction.includes('S')) {
    this.y++;
  }
};

Player.prototype.moveHorizontal = function (direction) {
  if (direction.includes('W')) {
    this.x--;
  } else if (direction.includes('E')) {
    this.x++;
  }
};

Player.prototype.move = function (pathCheck, callback) {
  const self = this;

  const shouldMove = this.checkShouldMove();
  if (!shouldMove) return;

  const currentPosition = new Vector2D(self.x, self.y);
  const direction = currentPosition.getDirection(self.targetPosition);

  const pathCheckResult = pathCheck(currentPosition, direction);

  if (!pathCheckResult) {
    this.setTargetPosition(null);
    callback(false);
  } else {
    if (pathCheckResult.x) {
      self.moveHorizontal(direction);
    } else if (pathCheckResult.y) {
      self.moveVertical(direction);
    } else {
      self.moveVertical(direction);
      self.moveHorizontal(direction);
    }

    callback(true);
  }
};

Player.prototype.setTargetPosition = function (target) {
  this.targetPosition = target;
};

Player.prototype.addAction = function (action, target) {
  this.actionQueue.push(action);

  if (target) {
    this.actionTargetMap[action] = target;
  }
};

Player.prototype.removeAction = function (action) {
  this.actionQueue = this.actionQueue.filter((a) => a != action);
};

Player.prototype.update = function (callback) {
  if (this.actionQueue.length === 0) return;

  const self = this;
  /* note: will add more conditions later */
  let shouldDraw = false;

  const action = self.actionQueue[0];

  if (action === 'move') {
    if (self.checkShouldMove()) {
      self.move(self.pathfinder, function (isMoved) {
        console.log('ISMOVED', isMoved);
        if (isMoved && !shouldDraw) shouldDraw = true;
        callback(shouldDraw);

        if(!self.checkShouldMove()){
          self.removeAction('move');
        }
      });
    } else {
      self.removeAction('move');
    }

    /* @TODO set take as action constant */
  } else if (action === 'take') {
    console.log('TAKING!');
    /* @TODO define take function */
    self.inventory.push(self.actionTargetMap['take']);
    callback(shouldDraw, {
      action: 'take',
      data: self.actionTargetMap['take']
    });

    self.removeAction('take');
    delete self.actionTargetMap['take'];
  }
};

Player.prototype.setPathfinder = function (fn) {
  this.pathfinder = fn;
};
