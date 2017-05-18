myApp.factory('CSVService', ['$http', function($http){
  console.log('CSVService Loaded');

  serverResponseObject = {};

  // Sends CSV file content to server
  sendCSV = function(csv) {
    var csvToPost = {};
    csvToPost.fileContent = csv;
    // console.log('Posting csv ', csvToPost);
    $http.post('/csv/upload', csvToPost).then(function(response) {
      console.log('Back from server after posting csv content', response);
      serverResponseObject.response = response;
    });
  };

  // Requests CSV file from server
  requestVolunteerCSV = function() {
    console.log('Getting volunteer .csv');
    $http.get('/csv/export/volunteer').then(function(response) {
      console.log('Back from server after getting csv content');
      // opens the route - downloads the file
      window.open('/csv/export/volunteer');
    });
  };

  // Requests CSV file from server
  requestHoursCSV = function(data) {
    console.log('Getting hours .csv ');
    console.log('Data: ', data);
    var formattedFromDate = formatDate(data.fromDate);
    var formattedToDate = formatDate(data.toDate);
    $http.get('/csv/export/hours/' + formattedFromDate + '/' + formattedToDate).then(function(response) {
      console.log('Back from server after getting csv content',response);
      // opens the route - downloads the file
      var route = '/csv/export/hours/' + formattedFromDate + '/' + formattedToDate;
      window.open(route);
    });
  };

  // Formats date to DB format
  formatDate = function(date) {
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1; //Months are zero based
    var curr_year = date.getFullYear();
    var formattedDate = curr_year + "-" + curr_month + "-" + curr_date;
    return formattedDate;
  }

  return {
    sendCSV : sendCSV,
    requestVolunteerCSV : requestVolunteerCSV,
    requestHoursCSV :requestHoursCSV,
    serverResponseObject : serverResponseObject
  };
}]);
