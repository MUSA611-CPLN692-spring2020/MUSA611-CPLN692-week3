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

    // If we have '19104 - 1234', splitting and taking the first (0th) element
    // as an integer should yield a zip in the format above
   var new_school = -.map(schools,function(arr){
     if(typeof arr.ZIPCODE === 'string'){
       split = arr.ZIPCODE.split(' ');
       normalized_zip = parseInt(split[0]);
       arr.ZIPCODE = normalized_zip;
     }
   }

    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry
  var school_level = -.map(new_school,function(arr){  // if number
      arr.HAS_KINDERGARTEN = arr.GRADE_LEVEL < 1;
      arr.HAS_ELEMENTARY = 1 < arr.GRADE_LEVEL < 6;
      arr.HAS_MIDDLE_SCHOOL = 5 < arr.GRADE_LEVEL < 9;
      arr.HAS_HIGH_SCHOOL = 8 < arr.GRADE_LEVEL < 13;
    } else {
      arr.HAS_KINDERGARTEN = arr.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      arr.HAS_ELEMENTARY = arr.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      arr.HAS_MIDDLE_SCHOOL = arr.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      arr.HAS_HIGH_SCHOOL = arr.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    })


  // filter data
var filter_data = _.filter (school_level,function(arr) {
    isOpen = arr.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (arr.TYPE.toUpperCase() !== 'CHARTER' ||
                arr.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (arr.HAS_KINDERGARTEN ||
                arr.HAS_ELEMENTARY ||
                arr.HAS_MIDDLE_SCHOOL ||
                arr.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = arr.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(arr.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);
    return arr;
  })


  // main loop
  var color;
    // Constructing the styling  options for our map
    var mapschool = -.map(filter_data,function(arr){
    if (arr.HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (arr.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    // The style options
    var pathOpts = {'radius': filter_data[i].ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([filter_data[i].Y, filter_data[i].X], pathOpts)
      .bindPopup(filter_data[i].FACILNAME_LABEL)
      .addTo(map);
  }

})();
