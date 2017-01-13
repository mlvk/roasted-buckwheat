import Ember from 'ember';
import Draggable from 'roasted-buckwheat/mixins/draggable';

export default Ember.Component.extend(Draggable, {
  tagName: "g",

  x: Ember.computed("model.x", function() {
    return this.get("model.x") || -20;
  }),

  y: Ember.computed("model.y", function() {
    return this.get("model.y") || -20;
  })
});
