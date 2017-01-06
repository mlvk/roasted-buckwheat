import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edges/default-edge', 'Integration | Component | edges/default edge', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edges/default-edge}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#edges/default-edge}}
      template block text
    {{/edges/default-edge}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
