import Ember from 'ember';

export default Ember.Route.extend({
  async model() {
    const record = await this.store.findRecord("node", "node1");
    await record.materializeDown();
    return record;
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
