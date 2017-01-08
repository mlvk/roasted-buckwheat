import Ember from 'ember';

export default Ember.Route.extend({
  async model() {
    const record = await this.store.findRecord("node", "node1");
    await record.materializeDown();
    return record;
  },

  actions: {
    onNodeDrag(node, position) {
      node.setProperties(position);
    },

    onNodeDrop(node) {
      node.save();
    }
  }
});
