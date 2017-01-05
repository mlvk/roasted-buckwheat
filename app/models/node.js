import DS from 'ember-data';

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
  })
});
