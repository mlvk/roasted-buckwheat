import Ember from 'ember';
import Draggable from 'roasted-buckwheat/mixins/draggable';

export default Ember.Component.extend(Draggable, {
  tagName: "g"
});
