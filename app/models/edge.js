import DS from 'ember-data';

export default DS.Model.extend({
  label: DS.attr('string'),
  a: DS.belongsTo('node', {inverse: 'parents'}),
  b: DS.belongsTo('node', {inverse: 'children'})
});
