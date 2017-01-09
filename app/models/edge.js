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

  normalizedChildren: computed("b.normalizedChildren", function() {
    const q = this.get("q");
    const mul = obj => ({
      node: obj.node,
      factor: obj.factor * q
    });

    console.log("Edge", this.get("id"), R.map(mul, this.get("b.normalizedChildren")));

    return R.map(mul, this.get("b.normalizedChildren"));
  }),

  async materializeDown() {
    const node = await this.get("b");
    await node.materializeDown();
  },

  childNodes: Ember.computed.alias("b.childNodes"),
  childEdges: Ember.computed.alias("b.childEdges")
});
