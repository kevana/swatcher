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
    maxWidth: null,
    maxHeight: null
    });
}])

.controller('SwatchCtrl', ['$scope', 'ImportService', 'ExportService', function($scope, ImportService, ExportService) {
  $scope.exportSwatch = function() {
    var canvas = document.createElement("canvas");
    var swatchImage = $('.ng-jcrop-image')[0];

    canvas.width = 100;
    canvas.height = 100;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(swatchImage,              // image
                  $scope.obj.selection[0],  // sx
                  $scope.obj.selection[1],  // sy
                  $scope.obj.selection[4],  // sWidth
                  $scope.obj.selection[5],  // sHeight
                  0,                        // dx
                  0,                        // dy
                  canvas.width,             // dWidth
                  canvas.height);           // dHeight
    
    $scope.productId = 'QF969';
    $scope.selectedImgSrc = ''; // map to $scope.obj.src

    var dataUrl = canvas.toDataURL("image/jpg");
    ExportService.toDataUrl(dataUrl);

    $('.swatch-selector').after(canvas);
  };

  // Setup for Jcrop
  $scope.obj = {};
  $scope.obj.productId = 'QF969';
  $scope.obj.src = ImportService.fromDataUrl();
  $scope.obj.selectedImgSrc = ''; // remove and point product directive at src
  $scope.obj.selection = [0, 0, 100, 100, 100, 100];
  $scope.obj.thumbnail = true;
}]);
