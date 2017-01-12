export default function(){
  this.transition(
    this.hasClass('hello-world'),
    this.use('fade')
  );
}
