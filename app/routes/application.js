import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll("node");
    // return {
    //   nodes: [
    //     {
    //       label: "Het",
    //       type: "product",
    //       data: {},
    //       edges: {
    //         e001: true
    //       }
    //     },
    //     {
    //       label: "Label2",
    //       type: "product",
    //       data: {},
    //       edges: {
    //         e001: true
    //       }
    //     }
    //   ],
    //   edges: [
    //     {
    //       type: "uses",
    //       a: "n001",
    //       b: "n002",
    //       data: {}
    //     }
    //   ]
    // }
  }
});
