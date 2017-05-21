myApp.factory('VolunteerService', ['$http', '$location', function($http, $location){
console.log("Volunteer Service loaded");

var volunteerToDB = {
    email: '',
    first_name: '',
    last_name: '',
    // address1: '',
    // address2: '',
    // city: '',
    // state: '',
    // zip: '',
    under_18: true,
    birthdate: '',
    // birthdate: '3000-12-01',
    has_signed_waiver: false,
    has_allowed_photos: false,
    parent_email: '',
    // validation_required: false,
    // school: '',
    // employer: '',
    // employer_match: false
  };

  var preregisteredVolunteer = {
    email: '',
    first_name: '',
    last_name: '',
    // address1: '',
    // address2: '',
    // city: '',
    // state: '',
    // zip: '',
    under_18: '',
    birthdate: '',
    // birthdate: '3000-12-01',
    has_signed_waiver: '',
    has_allowed_photos: '',
    parent_email: '',
    // validation_required: false,
    // school: '',
    // employer: '',
    // employer_match: false
  };

  var newVolunteer = [];

  preregisteredVolunteer = function(){
      console.log("inside preregisteredVolunteer function");
      $http.get('/volunteer')
      .then(function(response){
        preregisteredVolunteer = response.data;
        console.log('PREREGISTERED VOLUNTEER: ', preregisteredVolunteer);
      });
    };
//volunteerCheckIn takes in what was entered on volunteer.html and first compares it to volunteeers already on the db.
//if they already exist it checks to see status of each waiver and directs them appropriately. If volunteer is not
//already on the database it posts them to the database and directs them to the general waiver view.
  volunteerCheckIn = function(volunteer){
  console.log("volunteerCheckIn function accessed Email:", volunteer.email + " " + "First Name:", volunteer.first_name + " " + "Last Name:", volunteer.last_name);
    for(i=0; i < preregisteredVolunteer.length; i++){
      // console.log("preregisteredVolunteer.email: ", preregisteredVolunteer[i].email);
      if(volunteer.email === preregisteredVolunteer[i].email && volunteer.first_name === preregisteredVolunteer[i].first_name && volunteer.last_name === preregisteredVolunteer[i].last_name){
        console.log("MATCH FOUND");
            if(preregisteredVolunteer[i].under_18 === true && preregisteredVolunteer[i].has_signed_waiver === false){
              $location.path('/waiver-youth');
            } else if
              (preregisteredVolunteer[i].under_18 === false && preregisteredVolunteer[i].has_signed_waiver === false){
              $location.path('/waiver-adult');
            } else if
              (preregisteredVolunteer[i].under_18 === true && preregisteredVolunteer[i].has_allowed_photos === false){
              $location.path('/waiver-photo');
            } else if
              (preregisteredVolunteer[i].under_18 === false && preregisteredVolunteer[i].has_allowed_photos === false){
              $location.path('/waiver-photo');
            } else {
              $location.path('/confirmation');
            }
      } else {
        newVolunteer.push(volunteer);
        console.log("New Volunteer Inside: ", newVolunteer);
        // newVolunteer = angular.copy(volunteer);
      }
    }//end of for loop

  };//end of volunteerCheckIn

  // .then(function(newVolunteer){
  //     $http.post('/volunteer', newVolunteer).then(function(){
  //       if(volunteer.under_18 === true){
  //         console.log("General Waiver Needed- youth", volunteer.birthdate);
  //         $location.path('/waiver-youth');
  //       } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === true) {
  //         console.log("Adult General Waiver & Photo Waiver on record");
  //         $location.path('/confirmation');
  //       } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === false) {
  //         console.log("General Waiver on record, just need Photo Waiver");
  //         $location.path('/waiver-photo');
  //       } else if (volunteer.has_signed_waiver === false && volunteer.has_allowed_photos === true) {
  //         console.log("Photo Waiver on record, just need General Waiver");
  //         $location.path('/waiver-adult');
  //       } else {
  //         $location.path('/waiver-adult');
  //       }
  //     });
  //   });

  clearVolunteerObject = function(){
    volunteer = {};
  };

 return {
   volunteerToDB: volunteerToDB,
   volunteerCheckIn: volunteerCheckIn,
   clearVolunteerObject: clearVolunteerObject,
   preregisteredVolunteer: preregisteredVolunteer,
  //  postNewVolunteer: postNewVolunteer
 };

}]); //end of VolunteerService
