(function(){

  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  /* =====================

  # Lab 2, Part 3

  ## Introduction

    You've already seen this file organized and refactored. In this lab, you will
    try to refactor this code to be cleaner and clearer - you should use the
    utilities and functions provided by underscore.js. Eliminate loops where possible.

  ===================== */

  // Mock user input
  // Filter out according to these zip codes:
  var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  var minEnrollment = 300;


  // clean data
  var schools_clean = _.map(schools, function(arr){
    if(typeof arr.ZIPCODE === 'string'){
      split = arr.ZIPCODE.split(' ');
      normalized_zip = parseInt(split[0]);
      arr.ZIPCODE = normalized_zip;
    }
    return arr;
  })

  //function
function kindergarten(arr){
  if (typeof arr.GRADE_ORG === 'number') { 
     return  arr.GRADE_LEVEL < 1;
  }
  else{
    return  arr.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
  }
}

function element(arr){
  if (typeof arr.GRADE_ORG === 'number') { 
     return  1< arr.GRADE_LEVEL < 6;
  }
  else{
    return  arr.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
  }
}

function middleschool(arr){
  if (typeof arr.GRADE_ORG === 'number') { 
     return  5< arr.GRADE_LEVEL < 9;
  }
  else{
    return  arr.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
  }
}

function highschool(arr){
  if (typeof arr.GRADE_ORG === 'number') { 
     return  8< arr.GRADE_LEVEL < 13;
  }
  else{
    return  arr.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
  }
}

//var schools_type = _.map(schools_clean, function(arr){
//    if (typeof arr.GRADE_ORG === 'number') {  
//      arr.HAS_KIN_ELE = arr.GRADE_LEVEL < 6;
//      arr.HAS_MIDDLE_SCHOOL = 5 < arr.GRADE_LEVEL < 9;
//      arr.HAS_HIGH_SCHOOL = 8 < arr.GRADE_LEVEL < 13;
//    } else {  
//      arr.HAS_KIN_ELE = (arr.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0 || 
//                         arr.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0);
//      arr.HAS_MIDDLE_SCHOOL = arr.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
//      arr.HAS_HIGH_SCHOOL = arr.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
//    }
//    return arr;
//})

  // filter data
var filtered_data = _.filter(schools_clean, function(arr){
    isOpen = arr.ACTIVE.toUpperCase() == 'OPEN';
    isSchool = (kindergarten(arr) ||
                element(arr) ||
                middleschool(arr) ||
                highschool(arr));
    meetsMinimumEnrollment = arr.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(arr.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);
    if (filter_condition) {
      return arr;
    }
  });

  console.log('Included:', filtered_data.length);

function changecolor(arr){
    var color;
    if (highschool(arr)){
      color = '#0000FF';
    } else if (middleschool(arr)) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    return color;
  }

_.collect(filtered_data, function(arr){
        var pathOpts = {'radius': arr.ENROLLMENT/30, 
                'fillColor': changecolor(arr)};  
        var circle = L.circleMarker([arr.Y, arr.X], pathOpts)
        .bindPopup(arr.FACILNAME_LABEL)
        .addTo(map);
        return circle;
  })

})();
