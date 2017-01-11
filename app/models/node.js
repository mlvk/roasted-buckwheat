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
  tag:      DS.attr('string', {defaultValue:"ingredient"}),

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

  normalizedChildren: computed("children.@each.{normalizedChildren,q}", "normalizedYield", function() {
    const selfData = {
      [this.get("id")]: {
        node: this,
        factor: 1
      }
    };

    const normalizedYield = this.get("normalizedYield");
    const mul = obj => ({
        node: obj.node,
        factor: obj.factor * normalizedYield
    });

    const sum = (a, b) => ({
      node: a.node,
      factor: a.factor + b.factor
    });

    const childDatoms = this.get("children")
      .map(edge => edge.get("normalizedChildren"))
      .reduce((acc, cur) => R.mergeWith(sum, acc, cur), {});

    const factored = R.map(mul, childDatoms);

    console.log("Node", this.get("id"), R.mergeWith(() => {}, selfData, factored));

    return R.mergeWith(() => {}, selfData, factored);
  }),

  nodeType: computed("type", function() {
    const type = this.get("type") || "default";
    return `nodes/${type}-node`;
  }),

  nodeEditorType: computed("type", function() {
    const type = this.get("type") || "default";
    return `editors/${type}-node-editor`;
  }),

  childNodes: computed("children.@each.{childNodes}", function() {
    const edges = this.get("children");
    const nodes = edges.map(edge => edge.get("childNodes"));
    return _.flattenDeep([this, nodes]);
  }),

  childEdges: computed("children.@each.{childEdges}", function() {
    const edges = this.get("children").toArray();
    const downstreamEdges = edges.map(edge => edge.get("childEdges"));
    return _.flattenDeep([edges, downstreamEdges]);
  }),

  async materializeDown() {
    const edges = await this.get("children");
    await Promise.all(edges.map(edge => edge.materializeDown()));
  }
});
