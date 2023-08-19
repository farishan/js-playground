define(['./Entity', './Component', './System'], function (
  Entity,
  Component,
  System
) {
  function ECS(getId) {
    if (getId) {
      this.getId = getId;
    } else {
      this.count = 0;
    }

    this.entityMap = {};
    this.componentMap = {};
    this.systemMap = {};
    this.getId = getId;
  }

  /**
   *
   * @returns {int} Entity ID
   */
  ECS.prototype.createEntity = function (amount = 1) {
    let entityIds = [];

    for (let index = 0; index < amount; index++) {
      let id;
      if (this.getId) id = this.getId();
      else {
        this.count++;
        id = this.count;
      }

      const entity = new Entity(id);
      this.entityMap[id] = entity;
      entityIds.push(id);
    }

    return amount === 1 ? entityIds[0] : entityIds;
  };

  ECS.prototype.getEntityIds = function () {
    return Object.keys(this.entityMap).map((k) => k);
  };

  ECS.prototype.getEntities = function () {
    return Object.keys(this.entityMap).map((k) => this.entityMap[k]);
  };

  ECS.prototype.forEachEntity = function (callback) {
    for (const [, value] of Object.entries(this.entityMap)) {
      callback(value);
    }
  };

  ECS.prototype.getEntity = function (id) {
    return this.entityMap[id];
  };

  ECS.prototype.removeEntity = function (id) {
    if (id === '*') {
      this.entityMap = {};
    } else {
      delete this.entityMap[id];
    }
  };

  ECS.prototype.createComponent = function (name, data) {
    const component = new Component(data);
    this.componentMap[name] = component.keys;
    return component;
  };

  ECS.prototype.forEachComponent = function (callback) {
    for (const key of Object.keys(this.componentMap)) {
      callback(key);
    }
  };

  ECS.prototype.removeComponent = function (name) {
    if (name === '*') {
      this.componentMap = {};
      const entityIds = this.getEntityIds();

      entityIds.forEach((id) => {
        this.entityMap[id] = { id };
      });

      return;
    }

    const self = this;

    /* Remove this component from all entities first */
    this.forEachEntity(function (entity) {
      self.removeComponentFromEntity(name, entity.id);
    });

    delete this.componentMap[name];
  };

  ECS.prototype.addAllComponentsToEntity = function (entityId) {
    const self = this;
    this.forEachComponent(function (component) {
      self.addComponentToEntity(component, entityId);
    });

    return entityId;
  };

  ECS.prototype.addComponentToEntity = function (
    componentKey,
    entityId,
    payload
  ) {
    const self = this;

    function addComponentToEntity(componentKey, entityId, payload) {
      const properties = self.componentMap[componentKey];
      if (!properties) throw Error('Unknown component. ' + componentKey);

      for (let index = 0; index < properties.length; index++) {
        const p = properties[index];
        const entity = self.entityMap[entityId];

        if (entity && entity[p] === undefined) {
          if (payload && payload[p]) {
            entity[p] = payload[p];
          } else {
            entity[p] = null;
          }
        }
      }

      return entityId;
    }

    if (componentKey === '*' && entityId === '*') {
      this.forEachEntity(function (entity) {
        self.addAllComponentsToEntity(entity.id);
      });
    } else if (componentKey === '*') {
      this.addAllComponentsToEntity(entityId);
    } else if (entityId === '*') {
      this.forEachEntity(function (entity) {
        self.addComponentToEntity(componentKey, entity.id, payload);
      });
    } else {
      addComponentToEntity(componentKey, entityId, payload);
    }

    return entityId;
  };

  ECS.prototype.removeAllComponentsFromEntity = function (entityId) {
    const self = this;
    this.forEachComponent(function (component) {
      self.removeComponentFromEntity(component, entityId);
    });
  };

  ECS.prototype.removeComponentFromEntity = function (componentKey, entityId) {
    const self = this;

    /* Remove all components from all entities */
    if (componentKey === '*' && entityId === '*') {
      this.forEachEntity(function (entity) {
        self.removeAllComponentsFromEntity(entity.id);
      });

      return entityId;
    }

    /* Remove all components from entity */
    if (componentKey === '*') {
      this.removeAllComponentsFromEntity(entityId);
      return entityId;
    }

    /* Remove component from all entities */
    if (entityId === '*') {
      this.forEachEntity(function (entity) {
        self.removeComponentFromEntity(componentKey, entity.id);
      });
      return entityId;
    }

    /* Remove component from entity */
    const properties = this.componentMap[componentKey];
    if (properties) {
      for (let index = 0; index < properties.length; index++) {
        delete this.entityMap[entityId][properties[index]];
      }
    }

    return entityId;
  };

  ECS.prototype.addSystem = function (name, callback) {
    const system = new System(callback);
    this.systemMap[name] = system;

    return system;
  };

  ECS.prototype.removeSystem = function (name) {
    if (name === '*') {
      this.systemMap = {};
      return;
    }
    delete this.systemMap[name];
  };

  ECS.prototype.forEachSystem = function (callback) {
    for (const [, value] of Object.entries(this.systemMap)) {
      callback(value);
    }
  };

  ECS.prototype.forEachActiveSystem = function (callback) {
    for (const [, value] of Object.entries(this.systemMap)) {
      if (value.shouldUpdate === true) {
        callback(value);
      }
    }
  };

  ECS.prototype.activate = function (system) {
    if (system === '*') {
      this.forEachSystem(function (system) {
        system.turnOn();
      });
      return;
    }
    this.systemMap[system].turnOn();
  };
  ECS.prototype.deactivate = function (system) {
    if (system === '*') {
      this.forEachSystem(function (system) {
        system.turnOff();
      });
      return;
    }
    this.systemMap[system].turnOff();
  };
  ECS.prototype.toggle = function (system) {
    if (system === '*') {
      this.forEachSystem(function (system) {
        system.toggle();
      });
      return;
    }
    this.systemMap[system].toggle();
  };
  ECS.prototype.update = function () {
    const self = this;

    this.forEachActiveSystem(function (system) {
      self.forEachEntity(function (entity) {
        system.update(entity);
      });
    });
  };

  return ECS;
});
