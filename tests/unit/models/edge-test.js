import { moduleForModel, test } from 'ember-qunit';

moduleForModel('edge', 'Unit | Model | edge', {
  // Specify the other units that are required for this test.
  needs: ['model:a', 'model:b']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
