import DS from 'ember-data';
import _ from 'lodash';

export default DS.Model.extend({
  label: DS.attr('string'),
  x: DS.attr('number'),
  y: DS.attr('number'),
  type: DS.attr('string', {defaultValue:"default"}),
  children: DS.hasMany('edge'),
  parents: DS.hasMany('edge'),

  nodeType: Ember.computed("type", function() {
    const type = this.get("type") || "default";
    return `nodes/${type}-node`;
  }),

  async materializeDown() {
    const edges = await this.get("children");
    await Promise.all(edges.map(edge => edge.materializeDown()));
  },

  childNodes: Ember.computed("children.@each.{childNodes}", function() {
    const edges = this.get("children");
    const nodes = edges.map(edge => edge.get("childNodes"));
    return _.flattenDeep([this, nodes]);
  })
});
