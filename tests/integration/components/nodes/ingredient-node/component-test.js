import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nodes/ingredient-node', 'Integration | Component | nodes/ingredient node', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nodes/ingredient-node}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nodes/ingredient-node}}
      template block text
    {{/nodes/ingredient-node}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
