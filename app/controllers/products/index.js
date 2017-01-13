import Ember from "ember";

export default Ember.Controller.extend({

  products: Ember.computed.filterBy("model", "type", "product")
});
