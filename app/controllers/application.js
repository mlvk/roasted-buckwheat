import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createNode() {
      const record = this.store.createRecord("node", {label: "hey", x:0, y:0});
      record.save();
    }
  }
});
