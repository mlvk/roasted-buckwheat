import Ember from 'ember';
import DS from 'ember-data';
import _ from 'lodash';
import UnitOfMeasureTypes from 'roasted-buckwheat/constants/unit-of-measure-types';

const {
  computed
} = Ember;

const {
  equal,
  notEmpty
} = computed;

export default DS.Model.extend({
  label:    DS.attr('string'),
  x:        DS.attr('number'),
  y:        DS.attr('number'),
  uom:      DS.attr('string'),
  yield:    DS.attr('number'),
  type:     DS.attr('string', {defaultValue:"default"}),

  children: DS.hasMany('edge'),
  parents:  DS.hasMany('edge'),

  hasChildren: notEmpty("children"),

  // isWeightType: equal("uom", UnitOfMeasureTypes.WEIGHT),
  // isTimeType: equal("uom", UnitOfMeasureTypes.TIME),
  // isVolumeType: equal("uom", UnitOfMeasureTypes.VOLUME),
  // isEachType: equal("uom", UnitOfMeasureTypes.EACH),

  // totalInput: computed("children.@each.{q}", function() {
  //   return this.get("children")
  //     .filter(edge => Ember.isPresent(edge))
  //     .reduce((acc, cur) => acc + Number(cur.get("q")), 0);
  // }),

  normalizedYield: computed("yield", "hasChildren", function() {
    return this.get("hasChildren") ? 1 / this.get("yield") : 1;
  }),

  normalizedChildren: computed("children.@each.{normalizedChildren}", function() {
    const selfData = {
      [this.get("id")]: {
        node: this,
        factor: this.get("normalizedYield")
      }
    };

    const normalizedYield = this.get("normalizedYield");
    const factor = obj => {
      return {
        node: obj.node,
        factor: obj.factor * normalizedYield
      }
    };

    const sum = (a, b) => {
      return {
        node: a.node,
        factor: a.factor + b.factor
      }
    }

    const childDatoms = this.get("children")
      .map(edge => edge.get("normalizedChildren"))
      .reduce((acc, cur) => R.mergeWith(sum, acc, cur), {});

    const factored = R.map(factor, childDatoms);

    return R.mergeWith(() => {
      debugger;
    }, selfData, factored);
  }),

  // shrink: computed("yield", "totalInput", function() {
  //   return this.get("totalInput") / Number(this.get("yield"));
  // }),

  nodeType: computed("type", function() {
    const type = this.get("type") || "default";
    return `nodes/${type}-node`;
  }),

  nodeEditorType: computed("type", function() {
    const type = this.get("type") || "default";
    return `editors/${type}-node-editor`;
  }),

  async materializeDown() {
    const edges = await this.get("children");
    await Promise.all(edges.map(edge => edge.materializeDown()));
  },

  childNodes: computed("children.@each.{childNodes}", function() {
    const edges = this.get("children");
    const nodes = edges.map(edge => edge.get("childNodes"));
    return _.flattenDeep([this, nodes]);
  }),

  childEdges: computed("children.@each.{childEdges}", function() {
    const children = this.get("children.content").toArray();
    const edges = children.map(edge => edge.get("childEdges"));
    return _.flattenDeep([children, edges]);
  })
});
