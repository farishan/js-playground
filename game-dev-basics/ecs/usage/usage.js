function Entity(id) {
  this.id = id;
}

function Component(props) {
  var self = this;
  this.id = props.id;

  if (props.data) {
    Object.keys(props.data).forEach(function (key) {
      self[key] = props.data[key];
    });
  }

  return this;
}

function ECS() {
  this.idCounter = 1;
  this.entityMap = {};
  this.componentMap = {};
  this.systemMap = {};
}

ECS.prototype.createEntity = function () {
  const entity = new Entity(this.idCounter.toString());
  this.idCounter++;
  this.entityMap[entity.id] = entity;
  return entity;
};

ECS.prototype.createComponent = function (data) {
  const component = new Component({
    id: this.idCounter.toString(),
    data
  });
  this.idCounter++;
  this.componentMap[component.id] = component;
  return component;
};

ECS.prototype.addComponentToEntity = function (componentId, entityId) {
  var entity = this.entityMap[entityId];
  var component = this.componentMap[componentId];
  Object.keys(component).forEach(function (key) {
    if (key === 'id') return;
    entity[key] = component[key];
  });

  if (
    entity.componentIds &&
    entity.componentIds.includes(componentId) === false
  ) {
    entity.componentIds.push(componentId);
  } else {
    entity.componentIds = [componentId];
  }
  this.entityMap[entityId] = entity;
  return entity;
};

ECS.prototype.createSystem = function (props) {
  const system = Object.assign({}, props);
  system.id = this.idCounter.toString();
  this.idCounter++;
  this.systemMap[system.id] = system;
  return system;
};

console.groupCollapsed('init.');
var ecs = new ECS();
console.log('ecs created.');

var player = ecs.createEntity();
console.log('player created.');
console.groupEnd();

console.groupCollapsed('create components.');
var isMortal = ecs.createComponent({
  healthPoint: 100
});
console.log('isMortal component created.');

var haveStamina = ecs.createComponent({
  stamina: 1000
});
console.log('haveStamina component created.');

var canAttack = ecs.createComponent({
  damage: 1,
  maxDamage: 20
});
console.log('canAttack component created.');
console.groupEnd();

console.groupCollapsed('add components to entity.');
ecs.addComponentToEntity(isMortal.id, player.id);
console.log('isMortal added to player.');
ecs.addComponentToEntity(haveStamina.id, player.id);
console.log('haveStamina added to player.');
ecs.addComponentToEntity(canAttack.id, player.id);
console.log('canAttack added to player.');
console.groupEnd();

console.log(ecs);
