import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, results) {
    controller.set("model", results[0]);
    controller.set("products", results[1]);
  },

  model() {
    return Promise.all([
      this.store.query('node', {
        orderBy: "tag",
        equalTo: "production",
        limitToFirst: 10
      }),
      this.store.query('node', {
        orderBy: "tag",
        equalTo: "product"
      })
    ]);
  },

  actions: {
    createProduction(products) {
      const node = this.store.createRecord("node", {
        tag:"production",
        yield: 1
      });

      const edges = products.map(product => this.store.createRecord("edge", {a:node, b:product, q:0}));

      node.save();
      edges.forEach(edge => edge.save());
    }
  }
});
