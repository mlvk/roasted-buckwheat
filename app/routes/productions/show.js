import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, results) {
    controller.set("model", results[0]);
    controller.set("products", results[1]);
  },

  async model(params) {
    const production = await this.store.findRecord('node', params.production_id);
    const products = await this.store.query('node', {
      orderBy: "tag",
      equalTo: "product"
    });

    await production.materializeDown();

    return [production, products];
  },

  actions: {
    saveEdge(edge) {
      edge.save();
    }
  }
});
