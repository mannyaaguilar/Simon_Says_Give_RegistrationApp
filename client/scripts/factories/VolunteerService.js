myApp.factory('VolunteerService', ['$http', '$location', 'UserService', 'UtilitiesService', function($http, $location, UserService, UtilitiesService){
console.log("Volunteer Service loaded");

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

  var todaysDate = new Date();

  var waiverObj = {
    //Adult waiver
    volunteerID: "",
    dateTopAdult: todaysDate,
    nameTopAdult: "",
    agreedAdult: false,
    nameBottomAdult: "",
    dateBottomAdult: todaysDate,
    //Youth waiver
    dateTopYouth: todaysDate,
    nameTopYouth: "",
    agreedYouth: false,
    nameBottomYouth: "",
    dateBottomYouth: todaysDate,
    noParentYouth: "",
    dateBottomVolYouth: todaysDate,
    guardianEmailYouth: "",
    guardianTopYouth: "",
    guardianBottomYouth: "",
    dateBottomGuardYouth: todaysDate,
    //Photo waiver
    agreedPhoto: false,
    nameBottomPhoto: "",
    dateBottomPhoto: todaysDate,
    dateBottomVolPhoto: todaysDate,
    guardianBottomPhoto: "",
    dateBottomGuardPhoto: todaysDate
  };


  preregisteredVolunteer = function(volunteer){
      console.log("inside preregisteredVolunteer function", volunteer );
      $http.post('/volunteer/initial', volunteer)
      // $http.post('/volunteer')
      .then(function(response){
        console.log('RESPONSE: ', response.data[0]);
        console.log('RESPONSE: ', response.data[0].id);

        // volunteerToDB = angular.copy(response.data)
        // console.log('VOLUNTEERTODB', volunteerToDB);
        preregisteredVolunteerObj.email = response.data[0].email;
        preregisteredVolunteerObj.first_name = response.data[0].first_name;
        preregisteredVolunteerObj.last_name = response.data[0].last_name;
        preregisteredVolunteerObj.under_18 = response.data[0].under_18;
        preregisteredVolunteerObj.birthdate = response.data[0].birthdate;
        preregisteredVolunteerObj.has_signed_waiver = response.data[0].has_signed_waiver;
        preregisteredVolunteerObj.has_allowed_photos = response.data[0].has_allowed_photos;
        preregisteredVolunteerObj.parent_email = response.data[0].parent_email;
        preregisteredVolunteerObj.id = response.data[0].id;

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
        console.log('PREREGISTERED VOLUNTEER: ', preregisteredVolunteerObj);
      });
      // return preregisteredVolunteerObj;
    };


    setEventTime = function(){
          console.log("in setEventTime!");
          updateWaiver();
    };



    updateWaiver = function(){
      console.log("in updateWaiver!");
        var checkInTime = new Date();
        waiverObj.event_id = UserService.eventObject.eventCode;
        waiverObj.time_in = UtilitiesService.formatTime(checkInTime);
        waiverObj.date = UtilitiesService.formatDate(checkInTime);
        waiverObj.volunteerID = preregisteredVolunteerObj.id;
        $http.post('/volunteer/complete', waiverObj)
        .then(function(response){
          console.log("in .then from updateWaiver! ", response);
          return response;
        });
      };

  clearVolunteerObject = function(){
    preregisteredVolunteerObj.email = '';
    preregisteredVolunteerObj.first_name = '';
    preregisteredVolunteerObj.last_name = '';
    preregisteredVolunteerObj.under_18 = '';
    preregisteredVolunteerObj.birthdate = '';
    preregisteredVolunteerObj.has_signed_waiver = '';
    preregisteredVolunteerObj.has_allowed_photos = '';
    preregisteredVolunteerObj.parent_email = '';
    // preregisteredVolunteerObj.address1 = '';
    // preregisteredVolunteerObj.address2 = '';
    // preregisteredVolunteerObj.city = '';
    // preregisteredVolunteerObj.state = '';
    // preregisteredVolunteerObj.zip = '';
    // preregisteredVolunteerObj.birthdate = '3000-12-01';
    // preregisteredVolunteerObj.validation_required = false;
    // preregisteredVolunteerObj.school = '';
    // preregisteredVolunteerObj.employer = '';
    // preregisteredVolunteerObj.employer_match = false;
    waiverObj.volunteerID = "";
    waiverObj.dateTopAdult = todaysDate;
    waiverObj.nameTopAdult = "";
    waiverObj.agreedAdult = false;
    waiverObj.nameBottomAdult = "";
    waiverObj.dateBottomAdult = todaysDate;
    waiverObj.dateTopYouth = todaysDate;
    waiverObj.nameTopYouth = "";
    waiverObj.agreedYouth = false;
    waiverObj.nameBottomYouth = "";
    waiverObj.dateBottomYouth = todaysDate;
    waiverObj.noParentYouth = "";
    waiverObj.dateBottomVolYouth = todaysDate;
    waiverObj.guardianEmailYouth = "";
    waiverObj.guardianTopYouth = "";
    waiverObj.guardianBottomYouth = "";
    waiverObj.dateBottomGuardYouth = todaysDate;
    waiverObj.agreedPhoto = false;
    waiverObj.nameBottomPhoto = "";
    waiverObj.dateBottomPhoto = todaysDate;
    waiverObj.dateBottomVolPhoto = todaysDate;
    waiverObj.guardianBottomPhoto = "";
    waiverObj.dateBottomGuardPhoto = todaysDate;
    UserService.userObject.id = "";
    UserService.userObject.userName = "";
  };

 return {
   clearVolunteerObject: clearVolunteerObject,
   preregisteredVolunteer: preregisteredVolunteer,
   preregisteredVolunteerObj: preregisteredVolunteerObj,
   waiverObj: waiverObj,
   setEventTime: setEventTime
 };

}]); //end of VolunteerService
