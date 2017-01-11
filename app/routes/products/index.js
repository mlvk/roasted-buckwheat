import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('node', {
      orderBy: "tag",
      equalTo: "product"
    });
  }
});
