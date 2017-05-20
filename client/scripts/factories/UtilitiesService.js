myApp.factory('UtilitesService', ['$http', function($http){
console.log('UtilitesService loaded');

let todaysDate = new Date();

formatDate = function(date) {
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1; //Months are zero based
    var curr_year = date.getFullYear();
    var formattedDate = curr_year + "-" + curr_month + "-" + curr_date;
    return formattedDate;
  };

return {
    formatDate: formatDate
  };


}]);//end of UtilitesService
