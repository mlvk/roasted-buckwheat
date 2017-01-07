import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  classNames: ['graphEditor'],

  // nodes: computed("model.childNodes.[]", function() {
  //   console.log(this.get("model.childNodes"));
  //   return this.get("model.childNodes");
  // })

  // edges: computed("model.@each.{x,y}", function() {
  //   return
  // })
});
