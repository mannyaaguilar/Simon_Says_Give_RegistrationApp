myApp.controller('ImportController', ['$scope', '$http', '$location', 'UserService', 'CSVService', function($scope, $http, $location, UserService, CSVService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;

  console.log('ImportController loaded');

  var reader;
   var progress = document.querySelector('.percent');

   function abortRead() {
     reader.abort();
   }

   function errorHandler(evt) {
     switch(evt.target.error.code) {
       case evt.target.error.NOT_FOUND_ERR:
         alert('File Not Found!');
         break;
       case evt.target.error.NOT_READABLE_ERR:
         alert('File is not readable');
         break;
       case evt.target.error.ABORT_ERR:
         break; // noop
       default:
         alert('An error occurred reading this file.');
     };
   }

   function updateProgress(evt) {
     // evt is an ProgressEvent.
     if (evt.lengthComputable) {
       var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
       // Increase the progress bar length.
       if (percentLoaded < 100) {
         progress.style.width = percentLoaded + '%';
         progress.textContent = 'Preparing document ' + percentLoaded + '%';
       }
     }
   }

   function handleFileSelect(evt) {
     // Reset progress indicator on new file selection.
     progress.style.width = '0%';
     progress.textContent = 'Preparing document 0%';

     reader = new FileReader();
     reader.onerror = errorHandler;
     reader.onprogress = updateProgress;
     reader.onabort = function(e) {
       alert('File read cancelled');
     };
     reader.onloadstart = function(e) {
       document.getElementById('progress_bar').className = 'loading';
     };
     reader.onload = function(e) {
       // Ensure that the progress bar displays 100% at the end.
       progress.style.width = '100%';
       progress.textContent = 'Preparing document 100%';
       setTimeout("document.getElementById('progress_bar').className='';", 2000);

       console.log(e.target.result);
       CSVService.sendCSV(e.target.result);


     }

     // Read in the image file as a binary string.
     reader.readAsText(evt.target.files[0]);
   }

   document.getElementById('files').addEventListener('change', handleFileSelect, false);

}]);
