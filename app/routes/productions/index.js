import Ember from 'ember';

const {
  Promise
} = Ember.RSVP;

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
      }),
      this.store.findAll("node"),
      this.store.findAll("edge")
    ]);
  },

  actions: {
    createProduction(products) {
      const node = this.store.createRecord("node", {
        tag:"production",
        yield: 1
      });

      products.forEach(product => {
        const edge = this.store.createRecord("edge", {a:node, b:product, q:0});
        edge.save();
        product.save();
      });

      node.save();
    },

    async destroyProduction(production) {
      const edges = await production.get("children");
      edges.forEach(async edge => {
        const b = await edge.get("b");
        edge.destroyRecord();
        b.save();
      });

      production.destroyRecord();
    }
  }
});
