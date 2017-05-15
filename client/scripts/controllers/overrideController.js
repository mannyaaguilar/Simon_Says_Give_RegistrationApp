myApp.controller('OverrideController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log('OverrideController loaded');

$scope.redirect = UserService.redirect;


}]);
