import Ember from 'ember';

export default Ember.Mixin.create({
  didInsertElement() {
    const mouseDowns = Rx.Observable.fromEvent(this, "mouseDown"),
          mouseMoves = Rx.Observable.fromEvent(window, "mousemove"),
          mouseUps   = Rx.Observable.fromEvent(window, "mouseup");

    this.subscription = mouseDowns.subscribe(mouseDownEvent => {
      const elmOffset  = this.$().offset(),
            offsetX = mouseDownEvent.clientX - elmOffset.left,
            offsetY = mouseDownEvent.clientY - elmOffset.top;

      mouseUps
        .takeUntil(mouseMoves)
        .takeUntil(mouseDowns)
        .subscribe(() => this.attrs.onClick())
      
      mouseMoves
        .takeUntil(mouseUps)
        .distinctUntilChanged()
        .map(e => ({x:e.offsetX - offsetX, y:e.offsetY - offsetY}))
        .subscribe(
          position => this.attrs.onDrag(position),
          () => {},
          () => this.attrs.onDrop());
    });
  },

  willDestroyElement() {
    if(this.subscription !== undefined) {
      this.subscription.dispose();
    }
  }
});
