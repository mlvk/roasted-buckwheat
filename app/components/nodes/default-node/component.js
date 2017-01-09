import Ember from 'ember';
import Draggable from 'roasted-buckwheat/mixins/draggable';

const WIDTH = 100;
const HEIGHT = 50;

const {
  computed
} = Ember;

export default Ember.Component.extend(Draggable, {
  tagName: "g"
});
