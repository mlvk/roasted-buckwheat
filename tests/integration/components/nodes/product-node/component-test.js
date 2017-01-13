import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nodes/product-node', 'Integration | Component | nodes/product node', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nodes/product-node}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nodes/product-node}}
      template block text
    {{/nodes/product-node}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
