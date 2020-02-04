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

/*
  // clean the data
  for (var i = 0; i < schools.length; i++) {
    // If we have '19104 - 1234', splitting and taking the first (0th) element
    // as an integer should yield a zip in the format above
    if (typeof schools[i].ZIPCODE === 'string') {
      var split = schools[i].ZIPCODE.split(' ');
      var normalized_zip = parseInt(split[0]);
      schools[i].ZIPCODE = normalized_zip;
    }

    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry.
    if (typeof schools[i].GRADE_ORG === 'number') {
      schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL < 1;
      schools[i].HAS_ELEMENTARY = 1 < schools[i].GRADE_LEVEL < 6;
      schools[i].HAS_MIDDLE_SCHOOL = 5 < schools[i].GRADE_LEVEL < 9;
      schools[i].HAS_HIGH_SCHOOL = 8 < schools[i].GRADE_LEVEL < 13;
    } else {
      schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      schools[i].HAS_ELEMENTARY = schools[i].GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      schools[i].HAS_MIDDLE_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      schools[i].HAS_HIGH_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
  } */

var schools2 = _.map(schools, function(eachSchool) {
  if (typeof eachSchool.ZIPCODE === 'string') {
    var split = eachSchool.ZIPCODE.split(' ');
    var normalized_zip = parseInt(split[0]);
    eachSchool.ZIPCODE = normalized_zip;
  }
  if (typeof eachSchool.GRADE_ORG === 'number') {
    eachSchool.HAS_KINDERGARTEN = eachSchool.GRADE_LEVEL < 1;
    eachSchool.HAS_ELEMENTARY = 1 < eachSchool.GRADE_LEVEL < 6;
    eachSchool.HAS_MIDDLE_SCHOOL = 5 < eachSchool.GRADE_LEVEL < 9;
    eachSchool.HAS_HIGH_SCHOOL = 8 < eachSchool.GRADE_LEVEL < 13;
  } else {
    eachSchool.HAS_KINDERGARTEN = eachSchool.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
    eachSchool.HAS_ELEMENTARY = eachSchool.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
    eachSchool.HAS_MIDDLE_SCHOOL = eachSchool.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
    eachSchool.HAS_HIGH_SCHOOL = eachSchool.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
  }
  return eachSchool
})

console.log(schools2)

  // // filter data
  // var filtered_data = [];
  // var filtered_out = [];
  // for (var i = 0; i < schools.length; i++) {
  //   // These really should be predicates!
  //   isOpen = schools[i].ACTIVE.toUpperCase() == 'OPEN';
  //   isPublic = (schools[i].TYPE.toUpperCase() !== 'CHARTER' ||
  //               schools[i].TYPE.toUpperCase() !== 'PRIVATE');
  //   isSchool = (schools[i].HAS_KINDERGARTEN ||
  //               schools[i].HAS_ELEMENTARY ||
  //               schools[i].HAS_MIDDLE_SCHOOL ||
  //               schools[i].HAS_HIGH_SCHOOL);
  //   meetsMinimumEnrollment = schools[i].ENROLLMENT > minEnrollment;
  //   meetsZipCondition = acceptedZipcodes.indexOf(schools[i].ZIPCODE) >= 0;
  //   filter_condition = (isOpen &&
  //                       isSchool &&
  //                       meetsMinimumEnrollment &&
  //                       !meetsZipCondition);
  //
  //   if (filter_condition) {
  //     filtered_data.push(schools[i]);
  //   } else {
  //     filtered_out.push(schools[i]);
  //   }
  // }
  //   console.log('Included:', filtered_data.length);
  //   console.log('Excluded:', filtered_out.length);

/////////////////////
//// NEW version ////
/////////////////////
  var filtered_data2 = _.filter(schools2, function(eachSchool) {
    isOpen = eachSchool.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (eachSchool.TYPE.toUpperCase() !== 'CHARTER' ||
                eachSchool.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (eachSchool.HAS_KINDERGARTEN ||
                eachSchool.HAS_ELEMENTARY ||
                eachSchool.HAS_MIDDLE_SCHOOL ||
                eachSchool.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = eachSchool.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(eachSchool.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);
    return filter_condition

  })

  var filtered_out2 = _.difference(schools2, filtered_data2)

  console.log('Included:', filtered_data2.length);
  console.log('Excluded:', filtered_out2.length);


  // main loop
  var color;
  for (var i = 0; i < filtered_data2.length; i++) {

    // Constructing the styling  options for our map
    if (filtered_data2[i].HAS_HIGH_SCHOOL){
      color = '#0000FF'; // blue
    } else if (filtered_data2[i].HAS_MIDDLE_SCHOOL) {
      color = '#00FF00'; // green
    } else {
      color = '#FF0000'; //red
    }

    // The style options - note that we're using an object to define properties
    var pathOpts = {'radius': filtered_data2[i].ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([filtered_data2[i].Y, filtered_data2[i].X], pathOpts)
      .bindPopup(filtered_data2[i].FACILNAME_LABEL)
      .addTo(map);
  }

})();
