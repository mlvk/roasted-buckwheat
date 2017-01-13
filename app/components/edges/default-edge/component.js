import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "g",

  ax: Ember.computed("model.a.x", function() {
    return this.get("model.a.x") || -20;
  }),

  ay: Ember.computed("model.a.y", function() {
    return this.get("model.a.y") || -20;
  }),

  bx: Ember.computed("model.b.x", function() {
    return this.get("model.b.x") || -20;
  }),

  by: Ember.computed("model.b.y", function() {
    return this.get("model.b.y") || -20;
  })
});
