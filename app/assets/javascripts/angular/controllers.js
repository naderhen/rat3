function bootstrapObject($scope, $routeParams, Restangular) {
  var el = $("#initial_object");

  if (el && el.data('board') && el.data('current_user')) {
    $scope.board = el.data('board');
    $scope.current_user = el.data('current_user');
  } else {
    var board = Restangular.one('organizations', $routeParams.org_id).one('boards', $routeParams.board_id);

    board.get().then(function(result) {
      $scope.board = result;
      $scope.current_user = el.data('current_user');
    })
  }
}

function newSale($rootScope, sale) {
  $rootScope.$broadcast('new_sale', {sale: sale});
}

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
      .when('/organizations/:org_id/boards/new', {
        templateUrl: "/assets/templates/boards/builder.html",
        controller: "BoardBuilderCtrl"
      })
      .when('/organizations/:org_id/boards/:board_id', {
        templateUrl: "/assets/templates/boards/view.html",
        controller: "BoardViewCtrl"
      })
      .when('/organizations/:org_id/boards/:board_id/sales', {
        templateUrl: "/assets/templates/boards/sales.html",
        controller: "SalesCtrl"
      })

  $locationProvider.html5Mode(true);
});

app.controller("BoardViewCtrl", function($scope, $routeParams, Restangular, $location) {
  // handles the callback from the received event
  var handleCallback = function (msg) {
    $scope.$apply(function () {
      var sale = $.parseJSON(msg.data),
          grades = _.flatten(_.pluck($scope.board.warehouses, 'grades')),
          grade = _.where(grades, {id: sale.grade_id});

      if (grade.length) {
        grade[0].sales.push(sale);
      }
    });
  }

  bootstrapObject($scope, $routeParams, Restangular);

  $scope.availableCount = function(grade) {
    return grade.total - $scope.totalSales(grade);
  }

  $scope.totalSales = function(grade) {
    return _.reduce(grade.sales, function(count, sale) { return count + sale.amount; }, 0);
  }

  $scope.salespersonSales = function(grade, salesperson) {
    var total_amount = _.where(grade.sales, {user_id: salesperson.id}).reduce(function(count, sale) { return count + sale.amount }, 0);

    return total_amount;
  }

  $scope.averagePrice = function(grade) {
    var sales = grade.sales;

    return _.reduce(sales, function(count, sale) { return count + sale.price; }, 0) / sales.length;
  }

  $scope.showSummary = function() {
    $location.path($location.path() + "/sales");
  }


  // Totals Row
  $scope.available = function(warehouse) {
    return _.reduce(warehouse.grades, function(count, grade) { return count + $scope.availableCount(grade); }, 0);
  }

  $scope.sold = function(warehouse) {
    return _.reduce(warehouse.grades, function(count, grade) { return count + $scope.totalSales(grade); }, 0);
  }

  $scope.total = function(warehouse) {
    return _.reduce(warehouse.grades, function(count, grade) { return count + grade.total; }, 0);
  }

  $scope.salespersonTotal = function(warehouse, salesperson) {
    var all_sales = _.flatten(_.pluck(warehouse.grades, 'sales')),
        sales_for_salesperson = _.where(all_sales, {user_id: salesperson.id});

    return _.reduce(sales_for_salesperson, function(count, sale) { return count + sale.amount; }, 0);
  }
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

app.controller("SaleCtrl", function($scope, $rootScope, Restangular) {
  $scope.select2options = {
    minimumInputLength: 2,
    ajax: {
      url: "/customers/search",
      data: function (term, page) {
        return {term: term, page: page};
      },
      results: function (data, page) {
        _.map(data, function(item) { item.text = item.name; })
        return {results: data};
      }
    }
  }

  $scope.submit = function() {
    var sale = $scope.sale;

    sale.customer_id = sale.customer.id;
    sale.amount = parseInt(sale.amount);
    sale.price = parseFloat(sale.price);

    var sales = Restangular.all('sales');
    sales.post({sale: sale}).then(function(result) {
      $scope.hide();
    });
  }
})

app.controller("SalesCtrl", function($scope, $rootScope, $routeParams, Restangular, $location) {
  var el = $("#initial_object")
      board = Restangular.one('organizations', $routeParams.org_id).one('boards', $routeParams.board_id);

  if (el.data('sales')) {
    $scope.sales = el.data('sales');
  } else {
    board.getList('sales').then(function(result) {
      $scope.sales = result;
    });
  }

  $scope.back = function() {
    $location.path("/organizations/" + $routeParams.org_id + "/boards/" + $routeParams.board_id);
  }

  $scope.removeSale = function(sale) {
    var saleResource = Restangular.one('sales', sale.id);
    saleResource.remove().then(function(result) {
      $scope.sales.splice(_.indexOf($scope.sales, sale), 1);
    });
  }
})
