app.config(function($routeProvider, $locationProvider) {
  $routeProvider
      .when('/organizations/:org_id/boards/new', {
        templateUrl: "/assets/templates/boards/builder.html",
        controller: "BoardBuilderCtrl"
      })

  $locationProvider.html5Mode(true);
});

app.controller("BoardBuilderCtrl", function($scope, $routeParams) {
  var new_item = {name: "New Grade", total: 0, available: new Date()};

  $scope.board = {
    date: new Date(),
    warehouses: [
      {name: "Tidewater", grades: [], new_grade: angular.copy(new_item)},
      {name: "MIT", grades: [], new_grade: angular.copy(new_item)}
    ]
  };

  $scope.addItem = function(warehouse) {
    warehouse.grades.push(warehouse.new_grade);
    warehouse.new_grade = angular.copy(new_item);
  }
});
