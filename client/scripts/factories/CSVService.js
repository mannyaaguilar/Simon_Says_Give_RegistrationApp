myApp.factory('CSVService', ['$http','$mdDialog', function($http,$mdDialog){
  console.log('CSVService Loaded');

  serverResponseObject = {};

  // Sends CSV file content to server
  sendCSV = function(csv) {
    var csvToPost = {};
    csvToPost.fileContent = csv;
    $http.post('/csv/upload', csvToPost).then(function(response) {
      console.log('Back from server after posting csv content', response);
      showAlert(response.data);
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

  // Requests CSV file from server
  requestOfficeHoursCSV = function(data) {
    console.log('Getting Office hours .csv ');
    console.log('Data: ', data);
    var formattedFromDate = formatDate(data.fromDate);
    var formattedToDate = formatDate(data.toDate);
    $http.get('/csv/export/officeHours/' + formattedFromDate + '/' + formattedToDate).then(function(response) {
      console.log('Back from server after getting csv content',response);
      // opens the route - downloads the file
      var route = '/csv/export/officeHours/' + formattedFromDate + '/' + formattedToDate;
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
  };

  // Alert dialog to inform response to the user
  showAlert = function(message) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title(message)
          .ariaLabel(message)
          .ok('Ok')
      );
    };

  return {
    sendCSV : sendCSV,
    requestVolunteerCSV : requestVolunteerCSV,
    requestHoursCSV : requestHoursCSV,
    requestOfficeHoursCSV : requestOfficeHoursCSV,
    serverResponseObject : serverResponseObject
  };
}]);
