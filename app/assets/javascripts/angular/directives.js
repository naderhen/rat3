app.directive('xeditable', function($timeout) {
  return {
    restrict: 'A',
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {
      var loadXeditable = function() {
        angular.element(element).editable({
          display: function(value, srcData) {
            ngModel.$setViewValue(value);
            scope.$apply();
          }
        });
      }
      $timeout(function() {
        loadXeditable();
      }, 10);
    }
  };
});
