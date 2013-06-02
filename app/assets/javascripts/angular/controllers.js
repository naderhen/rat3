function bootstrapObject($scope) {
  var el = $("#initial_object");

  if (el && el.data('board')) {
    $scope.board = el.data('board');
    console.log($scope);
  }
}

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
      .when('/organizations/:org_id/boards/new', {
        templateUrl: "/assets/templates/boards/builder.html",
        controller: "BoardBuilderCtrl"
      })
      .when('/organizations/:org_id/boards/:id', {
        templateUrl: "/assets/templates/boards/view.html",
        controller: "BoardViewCtrl"
      })

  $locationProvider.html5Mode(true);
});

app.controller("BoardViewCtrl", function($scope, $routeParams, Restangular) {
  bootstrapObject($scope);
})

app.controller("BoardBuilderCtrl", function($scope, $routeParams, Restangular) {
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

  $scope.submit = function() {
    var boards = Restangular.one('organizations', 1).all('boards');

    boards.post({board: $scope.board});
  }
});
