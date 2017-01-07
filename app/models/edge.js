import DS from 'ember-data';

export default DS.Model.extend({
  label: DS.attr('string'),
  a: DS.belongsTo('node', {inverse: 'children'}),
  b: DS.belongsTo('node', {inverse: 'parents'}),

  async materializeDown() {
    const node = await this.get("b");
    await node.materializeDown();
  },

  childNodes: Ember.computed.alias("b.childNodes")
});
