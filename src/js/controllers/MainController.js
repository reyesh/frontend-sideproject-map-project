app.controller('MainController', ['$scope', "fbMessages", function($scope, fbMessages) { 

  $scope.messages = fbMessages;

  $scope.addMessage = function() {
    // calling $add on a synchronized array is like Array.push(),
    // except that it saves the changes to our database!
    var d = new Date();
    var seconds = d.getTime();

    console.log(seconds);

    $scope.messages.$add({
      time: seconds,
      note: $scope.message
    });

    // reset the message input
    $scope.message = "";
  };

  $scope.title = 'Map Notes'; 
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