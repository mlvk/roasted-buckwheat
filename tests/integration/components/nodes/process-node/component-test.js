import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nodes/process-node', 'Integration | Component | nodes/process node', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nodes/process-node}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nodes/process-node}}
      template block text
    {{/nodes/process-node}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
