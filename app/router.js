import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('productions', function() {
    this.route('show', {path:':production_id'});
  });

  this.route('products', function() {
    this.route('show', {path:':product_id'});
  });
});

export default Router;
