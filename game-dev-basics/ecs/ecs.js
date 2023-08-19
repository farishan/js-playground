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
    if (key === 'id' || key === 'name') return;
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

var ecs = new ECS();
