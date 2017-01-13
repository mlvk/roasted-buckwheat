import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    controller.set("model", this.store.peekAll("node"));
  },

  actions: {
    createProduct() {
      const node = this.store.createRecord("node", {
        tag:"product",
        yield: 1
      });

      node.save();
    }
  }

});
