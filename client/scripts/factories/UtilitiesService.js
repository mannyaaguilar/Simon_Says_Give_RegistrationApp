myApp.factory('UtilitiesService', ['$http','$mdDialog', function($http,$mdDialog){

var todaysDate = new Date();

  formatDate = function(date) {
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1; //Months are zero based
    var curr_year = date.getFullYear();
    var formattedDate = curr_year + "-" + curr_month + "-" + curr_date;
    return formattedDate;
  };

  formatTime = function(time) {
      var curr_hour = time.getHours();
      var curr_minutes = time.getMinutes();
      var formattedTime = curr_hour + ":" + curr_minutes;
      return formattedTime;
    };

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
    formatDate: formatDate,
    formatTime: formatTime,
    showAlert: showAlert
  };

}]);//end of UtilitiesService
