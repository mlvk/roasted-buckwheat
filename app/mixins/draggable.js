import Ember from 'ember';

export default Ember.Mixin.create({
  didInsertElement() {
    this.setupStreams();
  },

  willDestroyElement() {
    if(this.subscription !== undefined) {
      this.subscription.dispose();
    }
  },

  setupStreams() {
    const mouseDowns = Rx.Observable.fromEvent(this, "mouseDown"),
          mouseMoves = Rx.Observable.fromEvent(window, "mousemove"),
          mouseUps   = Rx.Observable.fromEvent(window, "mouseup"),
          elmOffset  = this.$().offset();

    this.subscription = mouseDowns.subscribe(mouseDownEvent => {
      const offsetX = mouseDownEvent.clientX - elmOffset.left,
            offsetY = mouseDownEvent.clientY - elmOffset.top,
            model   = this.get("model");

      mouseMoves
        .takeUntil(mouseUps)
        .distinctUntilChanged()
        .map(e => ({x:e.offsetX - offsetX, y:e.offsetY - offsetY}))
        .subscribe(
          position => model.setProperties(position),
          () => {},
          () => this.attrs.onDrop());
    });
  }
});
