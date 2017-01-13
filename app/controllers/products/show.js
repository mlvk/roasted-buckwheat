import Ember from 'ember';

// const MODAL_STEPS = ["addNodeStep1", "addNodeStep2", "addNodeStep3"];

export default Ember.Controller.extend({
  hasSelectedNode: Ember.computed.notEmpty("currentNode"),

  // showAddModalStep(step = 1) {
  //   this.set("currentModalStep", step);
  //   // MODAL_STEPS.forEach(step => this.set(step, false));
  //   // const nextStep = `addNodeStep${step}`;
  //   // this.set(nextStep, true);
  // },

  ingredients: Ember.computed.filterBy("nodes", "type", "ingredient"),

  actions: {
    focusNode(node) {
      this.set("currentNode", node);
    },

    showAddNode(node) {
      this.set("aNode", node);
      this.set("currentModalStep", 1);
    },

    selectNodeType(type) {
      this.set("desiredNodeType", type);
      this.set("currentModalStep", 2);
    },

    selectNodeForA(node) {
      this.set("desiredNodeA", node);
      console.log(node);
    },

    selectOrCreate(node, label) {
      console.log(node, label);
      // this.set("currentModalStep", 2);
    },

    cancelAddNode() {
      this.set("currentModalStep", 0);
    },

    createNewNode() {
      console.log("Create!");
      this.set("currentModalStep", 0);
    }
  }
});
