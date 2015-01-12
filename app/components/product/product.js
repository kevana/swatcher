'use strict';

angular.module('myApp.product', [])

.value('urlPrefix', 'http://s7d5.scene7.com/is/image/bluestembrands/')
.value('thumbUrlSuffix', '?$Swatch$&hei=48&wid=48')
.value('mainUrlSuffix', '?scl=1')
.controller('productController', ['$scope', 'ImportService', 'urlPrefix', 'thumbUrlSuffix', 'mainUrlSuffix', function($scope, ImportService, urlPrefix, thumbUrlSuffix, mainUrlSuffix) {
	if (angular.isUndefined($scope.productId)) {
		throw new Error('productViewer: attribute `productId` is mandatory');
	} else if (angular.isUndefined($scope.selectedImgSrc)) {
		throw new Error('productViewer: attribute `selectedImgSrc` is mandatory');
	}
	$scope.images = null;

	$scope.getProduct = function() {
		$scope.product = ImportService.getProduct($scope.searchProduct);
		$scope.images = $scope.product.images.map(function(image){
			var cleanId = image.url.replace('.jpg', '');
			return {
				name: cleanId,
				thumbUrl: urlPrefix + cleanId + thumbUrlSuffix,
				fullUrl: urlPrefix + cleanId + mainUrlSuffix
			};
		});

		$scope.selectedImgSrc = $scope.images[0].fullUrl;
	};

	$scope.selectImage = function(image) {
		$scope.selectedImgSrc = image.fullUrl;
	};
}])

.directive('productViewer', [function() {

	return {
		restrict: 'EA',
		templateUrl: '/app/components/product/product.html',
		scope: {
			productId: '=',
			selectedImgSrc: '='
		},
		controller: 'productController'
	};
}]);