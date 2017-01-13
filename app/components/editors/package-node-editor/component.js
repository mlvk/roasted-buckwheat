import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["col"],

  actions: {
    saveNode() {
      this.get("model").save();
    },

    saveEdge(edge) {
      edge.save();
    }
  }
});
