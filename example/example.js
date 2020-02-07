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


  // clean the data
  /*
  for (var i = 0; i < schools.length - 1; i++) {
    // If we have '19104 - 1234', splitting and taking the first (0th) element
    // as an integer should yield a zip in the format above
    if (typeof schools[i].ZIPCODE === 'string') {
      var split = schools[i].ZIPCODE.split(' ');
      var normalized_zip = parseInt(split[0]);
      schools[i].ZIPCODE = normalized_zip;
    }
    */
    _.each(schools,function(x){
      if(typeof x.ZIPCODE === 'string') {
        _.first(x.ZIPCODE.split(' '));
    }
  })

    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry.
    /*
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
  }
*/
  _.each(schools,function(y){
    if (typeof y.GRADE_ORG === 'number') {
      y.HAS_KINDERGARTEN = y.GRADE_LEVEL < 1;
      y.HAS_ELEMENTARY = 1 < y.GRADE_LEVEL < 6;
      y.HAS_MIDDLE_SCHOOL = 5 < y.GRADE_LEVEL < 9;
      y.HAS_HIGH_SCHOOL = 8 < y.GRADE_LEVEL < 13;
    } else {
      y.HAS_KINDERGARTEN = y.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      y.HAS_ELEMENTARY = y.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      y.HAS_MIDDLE_SCHOOL = y.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      y.HAS_HIGH_SCHOOL = y.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
  }
})

  // filter data
  var filtered_data = [];
  var filtered_out = [];
  /*
  for (var i = 0; i < schools.length - 1; i++) {
    // These really should be predicates!
    isOpen = schools[i].ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (schools[i].TYPE.toUpperCase() !== 'CHARTER' ||
                schools[i].TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (schools[i].HAS_KINDERGARTEN ||
                schools[i].HAS_ELEMENTARY ||
                schools[i].HAS_MIDDLE_SCHOOL ||
                schools[i].HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = schools[i].ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(schools[i].ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);

    if (filter_condition) {
      filtered_data.push(schools[i]);
    } else {
      filtered_out.push(schools[i]);
    }
  }
*/
  _.each(schools,function(z){
    isOpen = z.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (z.TYPE.toUpperCase() !== 'CHARTER' ||
                z.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (z.HAS_KINDERGARTEN ||
                z.HAS_ELEMENTARY ||
                z.HAS_MIDDLE_SCHOOL ||
                z.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = z.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(z.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);

    if (filter_condition) {
      filtered_data.push(z);
    } else {
      filtered_out.push(z);
    }
  })

  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // main loop
  var color;
  /*
  for (var i = 0; i < filtered_data.length - 1; i++) {
    isOpen = filtered_data[i].ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (filtered_data[i].TYPE.toUpperCase() !== 'CHARTER' ||
                filtered_data[i].TYPE.toUpperCase() !== 'PRIVATE');
    meetsMinimumEnrollment = filtered_data[i].ENROLLMENT > minEnrollment;

    // Constructing the styling  options for our map
    if (filtered_data[i].HAS_HIGH_SCHOOL){
      color = '#0000FF'; // blue
    } else if (filtered_data[i].HAS_MIDDLE_SCHOOL) {
      color = '#00FF00'; // green
    } else {
      color = '#FF0000'; //red
    }

    // The style options - note that we're using an object to define properties
    var pathOpts = {'radius': filtered_data[i].ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([filtered_data[i].Y, filtered_data[i].X], pathOpts)
      .bindPopup(filtered_data[i].FACILNAME_LABEL)
      .addTo(map);
  }
*/
  _.each(filtered_data,function(i){
    isOpen = i.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (i.TYPE.toUpperCase() !== 'CHARTER' ||
                i.TYPE.toUpperCase() !== 'PRIVATE');
    meetsMinimumEnrollment = i.ENROLLMENT > minEnrollment;

    // Constructing the styling  options for our map
    if (i.HAS_HIGH_SCHOOL){
      color = '#0000FF'; // blue
    } else if (i.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00'; // green
    } else {
      color = '#FF0000'; //red
    }

    // The style options - note that we're using an object to define properties
    var pathOpts = {'radius': i.ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([i.Y, i.X], pathOpts)
      .bindPopup(i.FACILNAME_LABEL)
      .addTo(map);
  })

})();
