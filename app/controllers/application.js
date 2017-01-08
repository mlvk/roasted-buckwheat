import Ember from 'ember';

export default Ember.Controller.extend({

  hasSelectedNode: Ember.computed.notEmpty("currentNode"),

  actions: {
    createNode() {
      const record = this.store.createRecord("node", {label: "hey", x:0, y:0});
      record.save();
    },

    focusNode(node) {
      this.set("currentNode", node);
    }
  }
});
