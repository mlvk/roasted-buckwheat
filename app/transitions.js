export default function(){
  this.transition(
    this.matchSelector('#modal-backdrop'),
    this.toValue((toValue, fromValue) => toValue === null || fromValue === null),
    this.use('fade')
  );

  this.transition(
    this.matchSelector('#modal-dialog'),
    this.toValue((toValue, fromValue) => toValue === null || fromValue === null),
    this.use('fade')
  );

  this.transition(
    this.matchSelector('#modal-dialog'),
    this.toValue((toValue, fromValue) => toValue && fromValue && toValue > fromValue),
    this.use('to-left'),
    this.reverse('to-right')
  );
}
