import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('node', {
      orderBy: "tag",
      equalTo: "product"
    });
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
