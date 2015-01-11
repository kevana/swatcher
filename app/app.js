'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.swatch',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.import',
  'myApp.export'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
