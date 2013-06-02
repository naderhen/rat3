var app = angular.module('app', ['ngResource', 'restangular', '$strap.directives', 'ui.select2'])
    .config(function(RestangularProvider) {
      RestangularProvider.setBaseUrl("");
      RestangularProvider.setRequestSuffix('.json');
    });

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers['common']['Accept'] = 'application/json';
  $httpProvider.defaults.headers['common']['X-CSRF-Token'] = $('meta[name="csrf-token"]').attr('content');
}]);
