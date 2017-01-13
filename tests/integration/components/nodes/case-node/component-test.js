import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nodes/case-node', 'Integration | Component | nodes/case node', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nodes/case-node}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nodes/case-node}}
      template block text
    {{/nodes/case-node}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
