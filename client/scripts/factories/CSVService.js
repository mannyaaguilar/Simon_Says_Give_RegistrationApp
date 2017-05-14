myApp.factory('CSVService', ['$http', function($http){
  console.log('CSVService Loaded');

  // Sends CSV file content to server
  sendCSV = function(csv) {
    var csvToPost = {};
    csvToPost.fileContent = csv;
    console.log('Posting csv ', csvToPost);
    $http.post('/csv/upload', csvToPost).then(function(response) {
      console.log('Back from server after posting csv content', response);
    });
  };

  return {
    sendCSV: sendCSV
  };
}]);
