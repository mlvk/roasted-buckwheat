import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['graphEditor'],

  actions: {
    onDrop(node) {
      node.save();
    }
  }
});
