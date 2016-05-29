app.controller('MainController', ['$scope', "$firebaseArray", function($scope, $firebaseObject) { 

  var ref = new Firebase("https://map-notes.firebaseio.com/"); 
  //$scope.data = $firebaseObject(ref);
  var noteArray = [];

  ref.on("value", function(snapshot) {
    // This isn't going to show up in the DOM immediately, because
    // Angular does not know we have changed this in memory.
    // $scope.data = snapshot.val();
    // To fix this, we can use $scope.$apply() to notify Angular that a change occurred.
    $scope.$apply(function() {
      $scope.data = snapshot.val();

      for (msg in $scope.data) {
        $scope.data[msg].marker = new google.maps.Marker({
          position: $scope.data[msg].pos,
          map: map,
          title: $scope.data[msg].note
        });
      }
    });
  });

  $scope.title = 'This Month\'s Bestsellers'; 
  $scope.promo = 'The most popular books this month.';
  $scope.caption = '* must be at 16 years or older for this offer to take effect.';
  $scope.products = [
  	{ 
    	name: 'The Book of Trees', 
    	price: 19, 
    	pubdate: new Date('2014', '03', '08'), 
    	cover: 'img/the-book-of-trees.jpg',
    	likes: 0,
    	dislikes: 0
  	}, 
  	{ 
    	name: 'Program or be Programmed', 
    	price: 8, 
    	pubdate: new Date('2013', '08', '01'), 
    	cover: 'img/program-or-be-programmed.jpg',
    	likes: 0,
    	dislikes: 0
  	}, 
  	{ 
    	name: 'Harry Potter & The Prisoner of Azkaban', 
    	price: 11.99, 
    	pubdate: new Date('1999', '07', '08'), 
    	cover: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Harry_Potter_and_the_Prisoner_of_Azkaban_(US_cover).jpg',
    	likes: 0,
    	dislikes: 0 
  	}, 
  	{ 
    	name: 'Ready Player One', 
    	price: 7.99, 
    	pubdate: new Date('2011', '08', '16'), 
    	cover: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Ready_Player_One_cover.jpg',
    	likes: 0,
    	dislikes: 0 
  	}, 
  	{ 
    	name: 'fast7', 
    	price: 7.99, 
    	pubdate: new Date('2011', '08', '16'), 
    	cover: 'https://ia.media-imdb.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg',
    	likes: 0,
    	dislikes: 0 
  	}
  ];
  $scope.plusOne = function(index) { 
  	$scope.products[index].likes += 1; 
    $scope.products[index].cover = $scope.products[index].tmp;
	};
	$scope.minusOne = function(index) { 
  	$scope.products[index].dislikes += 1; 
    $scope.products[index].tmp = $scope.products[index].cover;
    $scope.products[index].cover = 'https://ia.media-imdb.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg';
	};
}]);