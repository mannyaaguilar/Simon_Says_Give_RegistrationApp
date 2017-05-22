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

  var preregisteredVolunteerObj = {
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

  preregisteredVolunteer = function(volunteer){
      console.log("inside preregisteredVolunteer function", volunteer );
      $http.post('/volunteer', volunteer)
      // $http.post('/volunteer')
      .then(function(response){
        console.log('RESPONSE: ', response.data[0]);
        preregisteredVolunteerObj = response.data[0];
        if(response.data[0]){
          console.log("found");
          if(preregisteredVolunteerObj.under_18 === true && preregisteredVolunteerObj.has_signed_waiver === false){
            $location.path('/waiver-youth');
          } else if
            (preregisteredVolunteerObj.under_18 === false && preregisteredVolunteerObj.has_signed_waiver === false){
            $location.path('/waiver-adult');
          } else if
            (preregisteredVolunteerObj.under_18 === true && preregisteredVolunteerObj.has_allowed_photos === false){
            $location.path('/waiver-photo');
          } else if
            (preregisteredVolunteerObj.under_18 === false && preregisteredVolunteerObj.has_allowed_photos === false){
            $location.path('/waiver-photo');
          } else {
            $location.path('/confirmation');
          }
        }
        // else {
        //   console.log("not found");
        //   $http.post('/volunteer', volunteer).then(function(){
        //     if(volunteer.under_18 === true){
        //       console.log("General Waiver Needed- youth", volunteer.birthdate);
        //       $location.path('/waiver-youth');
        //     } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === true) {
        //       console.log("Adult General Waiver & Photo Waiver on record");
        //       $location.path('/confirmation');
        //     } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === false) {
        //       console.log("General Waiver on record, just need Photo Waiver");
        //       $location.path('/waiver-photo');
        //     } else if (volunteer.has_signed_waiver === false && volunteer.has_allowed_photos === true) {
        //       console.log("Photo Waiver on record, just need General Waiver");
        //       $location.path('/waiver-adult');
        //     } else {
        //       $location.path('/waiver-adult');
        //     }
        //   });
        // }
        console.log('PREREGISTERED VOLUNTEER: ', preregisteredVolunteerObj);
      });
    };
//volunteerCheckIn takes in what was entered on volunteer.html and first compares it to volunteeers already on the db.
//if they already exist it checks to see status of each waiver and directs them appropriately. If volunteer is not
//already on the database it posts them to the database and directs them to the general waiver view.
//################
// volunteerCheckIn = function(volunteer){
// console.log("volunteerCheckIn function accessed Email:", volunteer.email + " " + "First Name:", volunteer.first_name + " " + "Last Name:", volunteer.last_name);
//   // for(i=0; i < preregisteredVolunteer.length; i++){
//   //   console.log(preregisteredVolunteerObj);
//   //   console.log("preregisteredVolunteer.email: ", preregisteredVolunteerObj[i].email);
//   //   if(volunteer.email === preregisteredVolunteerObj[i].email && volunteer.first_name === preregisteredVolunteerObj[i].first_name && volunteer.last_name === preregisteredVolunteerObj[i].last_name){
//   //     found = true;
//   //     console.log("MATCH FOUND");
//   //   }
//   // }//end of for loop
//   if(found === true){
//
// } else {
//
//   }
//   // newVolunteer.push(volunteer);
//   // console.log("New Volunteer Inside: ", newVolunteer);
// };//end of volunteerCheckIn
//################
  // volunteerCheckIn = function(volunteer){
  // console.log("volunteerCheckIn function accessed Email:", volunteer.email + " " + "First Name:", volunteer.first_name + " " + "Last Name:", volunteer.last_name);
  // var found = false;
  //   for(i=0; i < preregisteredVolunteer.length; i++){
  //     // console.log("preregisteredVolunteer.email: ", preregisteredVolunteer[i].email);
  //     if(volunteer.email === preregisteredVolunteer[i].email && volunteer.first_name === preregisteredVolunteer[i].first_name && volunteer.last_name === preregisteredVolunteer[i].last_name){
  //       found = true;
  //       console.log("MATCH FOUND");
  //           if(preregisteredVolunteer[i].under_18 === true && preregisteredVolunteer[i].has_signed_waiver === false){
  //             $location.path('/waiver-youth');
  //           } else if
  //             (preregisteredVolunteer[i].under_18 === false && preregisteredVolunteer[i].has_signed_waiver === false){
  //             $location.path('/waiver-adult');
  //           } else if
  //             (preregisteredVolunteer[i].under_18 === true && preregisteredVolunteer[i].has_allowed_photos === false){
  //             $location.path('/waiver-photo');
  //           } else if
  //             (preregisteredVolunteer[i].under_18 === false && preregisteredVolunteer[i].has_allowed_photos === false){
  //             $location.path('/waiver-photo');
  //           } else {
  //             $location.path('/confirmation');
  //           }
  //     } else {
  //       $http.post('/volunteer', volunteer).then(function(){
  //         if(volunteer.under_18 === true){
  //           console.log("General Waiver Needed- youth", volunteer.birthdate);
  //           $location.path('/waiver-youth');
  //         } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === true) {
  //           console.log("Adult General Waiver & Photo Waiver on record");
  //           $location.path('/confirmation');
  //         } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === false) {
  //           console.log("General Waiver on record, just need Photo Waiver");
  //           $location.path('/waiver-photo');
  //         } else if (volunteer.has_signed_waiver === false && volunteer.has_allowed_photos === true) {
  //           console.log("Photo Waiver on record, just need General Waiver");
  //           $location.path('/waiver-adult');
  //         } else {
  //           $location.path('/waiver-adult');
  //         }
  //       });
  //     }//end of if
  //   }//end of for loop
  //   // newVolunteer.push(volunteer);
  //   // console.log("New Volunteer Inside: ", newVolunteer);
  // };//end of volunteerCheckIn

  postNewVolunteer = function(newVolunteer){

    };

  clearVolunteerObject = function(){
    volunteer = {};
  };

 return {
   volunteerToDB: volunteerToDB,
  //  volunteerCheckIn: volunteerCheckIn,

   clearVolunteerObject: clearVolunteerObject,
   preregisteredVolunteer: preregisteredVolunteer,
   preregisteredVolunteerObj: preregisteredVolunteerObj,
   postNewVolunteer: postNewVolunteer
 };

}]); //end of VolunteerService
