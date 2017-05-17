myApp.factory('CSVService', ['$http', function($http){
  console.log('CSVService Loaded');

  serverResponseObject = {};

  // Sends CSV file content to server
  sendCSV = function(csv) {
    var csvToPost = {};
    csvToPost.fileContent = csv;
    //console.log('Posting csv ', csvToPost);
    $http.post('/csv/upload', csvToPost).then(function(response) {
      console.log('Back from server after posting csv content', response);
      serverResponseObject.response = response;
    });
  };

  // Requests CSV file from server
  requestCSV = function(option) {
    //console.log('Getting csv option: ', option);
    $http.get('/csv/export/' + option ).then(function(response) {
      console.log('Back from server after getting csv content', response);
      // opens the route - downloads the file
      window.open('/csv/export/volunteer');
    });
  };

  return {
    sendCSV : sendCSV,
    requestCSV : requestCSV,
    serverResponseObject : serverResponseObject
  };
}]);
