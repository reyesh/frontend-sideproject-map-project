app.controller('MainController', ['$scope', "fbMessages", function($scope, fbMessages) { 

  $scope.messages = fbMessages;
  console.log($scope.messages.length);
  
  //function to add message
  $scope.addMessage = function() {

    if(!pos){

      console.log("not allow to post, geolocation not found");

    }else{

      var d = new Date();
      var seconds = d.getTime();
      $scope.messages.$add({
        time: seconds,
        note: $scope.message,
        pos: pos
      });   

    }

    $scope.message = "";
  };

  var infoWindow = [];
  $scope.messagesLocal = [];
  $scope.messagesSearchResults = [];
  var searching = false;

  function setMapOnAll(map) {
    for (var i = 0; i < $scope.messagesLocal.length; i++) {
      $scope.messagesLocal[i].marker.setMap(map);
    }
  }

  $scope.messages.$watch(function() { 

    setMapOnAll(null);
    infoWindow = [];
    $scope.messagesLocal = [];
    console.log("inside watch");
    for(var i=0; i<$scope.messages.length; i++){

      $scope.messagesLocal[i] = {
          note: $scope.messages[i].note,
          pos: $scope.messages[i].pos,
          time: $scope.messages[i].time
       }


      infoWindow[i] = new google.maps.InfoWindow({
        content: "<h1>" + $scope.messagesLocal[i].note + "</h1>"
        });

      $scope.messagesLocal[i].marker = new google.maps.Marker({
        position: $scope.messagesLocal[i].pos,
        map: map,
        title: $scope.messagesLocal[i].note
      });     

      $scope.messagesLocal[i].marker.addListener('click', (function(iCopy) {
        return function() {
          infoWindow[iCopy].open(map, $scope.messagesLocal[iCopy].marker);
          };
        })(i));
    }

    if(searching){
      $scope.searchMarkers();
    } 
    console.log("searching: " + searching);
 

  });

  $scope.searchMarkers = function() {
    //console.log($scope.searchWord);
    if($scope.searchWord){
      searching = true;
    } else {
      searching = false;
    }

    console.log("searching: " + searching);

    $scope.messagesSearchResults = [];

    for (var x in $scope.messagesLocal){
      if( $scope.messagesLocal[x].note.toLowerCase().indexOf($scope.searchWord.toLowerCase()) >= 0 ) {
        console.log("searching: " + $scope.messagesLocal[x].note)
        $scope.messagesSearchResults.push($scope.messagesLocal[x]);
      }
    }
    console.log($scope.messagesSearchResults);
    //setMapOnAll(null);
    //infoWindow = [];
    //messagesLocal = [];
  };

/*

    for(var i=0; i<$scope.messages.length; i++){

      infoWindow[i] = new google.maps.InfoWindow({
        content: "<h1>" + $scope.messages[i].note + "</h1>"
        });

      $scope.messages[i].marker = new google.maps.Marker({
        position: $scope.messages[i].pos,
        map: map,
        title: $scope.messages[i].note
      });     

      $scope.messages[i].marker.addListener('click', (function(iCopy) {
        return function() {
          infoWindow[iCopy].open(map, $scope.messages[iCopy].marker);
          };
        })(i));
    }
*/

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