'use strict';

angular.module('myApp.swatch', ['ngRoute', 'ngJcrop'])

.config(['$routeProvider', 'ngJcropConfigProvider', function($routeProvider, ngJcropConfigProvider) {
  $routeProvider.when('/swatch', {
    templateUrl: 'swatch/swatch.html',
    controller: 'SwatchCtrl'
  });

  ngJcropConfigProvider.setJcropConfig({
        bgColor: 'black',
        bgOpacity: 0.4,
        aspectRatio: 4 / 4
    });
}])

.controller('SwatchCtrl', ['$scope', 'ImportService', 'ExportService', function($scope, ImportService, ExportService) {
  $scope.exportSwatch = function() {
    var canvas = document.createElement("canvas");
    var $swatchImage = $('.ng-jcrop-thumbnail');
    // set width, height, 4, 5
    canvas.width = $scope.obj.selection[4];
    canvas.height = $scope.obj.selection[5];
    var ctx = canvas.getContext("2d");
    ctx.drawImage($swatchImage[0], 0, 0);


    var dataUrl = canvas.toDataURL("image/jpg");
    ExportService.toDataUrl(dataUrl);

    $('.swatch-selector').after(canvas);
  };

  // Setup for Jcrop
  $scope.obj = {};
  $scope.obj.src = ImportService.fromDataUrl();
  $scope.obj.selection = [0, 0, 100, 100, 100, 100];
  $scope.obj.thumbnail = true;
}]);
