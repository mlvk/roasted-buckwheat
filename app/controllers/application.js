import Ember from 'ember';

export default Ember.Controller.extend({
  showHello: true,
  actions: {
    toggleHello() {
      this.set("showHello", !this.get("showHello"));
    }
  }
});
