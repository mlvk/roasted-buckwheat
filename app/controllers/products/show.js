import Ember from 'ember';

export default Ember.Controller.extend({
  hasSelectedNode: Ember.computed.notEmpty("currentNode"),

  actions: {
    focusNode(node) {
      this.set("currentNode", node);
    }
  }
});
