import DS from 'ember-data';
import Ember from "ember";

const {
  computed
} = Ember;

export default DS.Model.extend({
  label: DS.attr('string'),
  q:     DS.attr('number'),

  a:     DS.belongsTo('node', {inverse: 'children'}),
  b:     DS.belongsTo('node', {inverse: 'parents'}),

  edgeType: Ember.computed("type", function() {
    const type = this.get("type") || "default";
    return `edges/${type}-edge`;
  }),

  normalizedChildren: computed("b.normalizedChildren", "q", function() {
    const q = this.get("q");
    const mul = obj => ({
      node: obj.node,
      factor: obj.factor * q
    });

    const childDatoms = this.get("b.normalizedChildren") || {};

    return R.map(mul, childDatoms);
  }),

  childNodes: Ember.computed.alias("b.childNodes"),
  childEdges: Ember.computed.alias("b.childEdges")
});
