import Ember from 'ember';

export default Ember.Route.extend({
  // setupController(controller, model) {
  //   controller.set("nodes", this.store.peekAll("node"));
  //   controller.set("edges", this.store.peekAll("edge"));
  //   this._super(controller, model);
  // },

  async model() {
    const hey = await this.store.findRecord("node", "node1");
    await hey.materializeDown();
    return hey;
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
  },

  actions: {
    onNodeDrag(node, position) {
      node.setProperties(position);
    },

    onNodeDrop(node) {
      node.save();
    }
  }
});
