import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord("node", params.product_id);
  },

  actions: {
    createNode(node) {
      const newNode = this.store.createRecord("node");
      this.store.createRecord("edge", {a:node, b:newNode});
    },

    onNodeDrag(node, position) {
      node.setProperties(position);
    },

    onNodeDrop(node) {
      node.save();
    }
  }
});
