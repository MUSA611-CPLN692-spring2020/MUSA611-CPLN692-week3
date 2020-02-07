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
  for (var i = 0; i < schools.length - 1; i++) {
    // If we have '19104 - 1234', splitting and taking the first (0th) element
    // as an integer should yield a zip in the format above
    if (_.isString(schools[i].ZIPCODE)) {
      split = schools[i].ZIPCODE.split(' ');
      normalized_zip = parseInt(split[0]);
      schools[i].ZIPCODE = normalized_zip;
    }

    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry
    // build a function if is middle school or what not . give it a has_thing function 
    if (_.isNumber(schools[i].GRADE_ORG)) {  // if number
      schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL < 1;
      schools[i].HAS_ELEMENTARY = 1 < schools[i].GRADE_LEVEL < 6;
      schools[i].HAS_MIDDLE_SCHOOL = 5 < schools[i].GRADE_LEVEL < 9;
      schools[i].HAS_HIGH_SCHOOL = 8 < schools[i].GRADE_LEVEL < 13;
    } else {  // otherwise (in case of string)
      schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      schools[i].HAS_ELEMENTARY = schools[i].GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      schools[i].HAS_MIDDLE_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      schools[i].HAS_HIGH_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
  }

  // filter data use _.filter ?
  var filtered_data = [];
  var filtered_out = [];
  var predicate = function(entry){
      isOpen = entry.ACTIVE.toUpperCase() == 'OPEN';
      isSchool = (entry.HAS_KINDERGARTEN ||
                  entry.HAS_ELEMENTARY ||
                  entry.HAS_MIDDLE_SCHOOL ||
                  entry.HAS_HIGH_SCHOOL);
      // it is a school if it has at least one of thes grades 
      meetsMinimumEnrollment = entry.ENROLLMENT > minEnrollment;
      // filter by enrolledment numbers 
      meetsZipCondition = acceptedZipcodes.indexOf(entry.ZIPCODE) >= 0;

      return isOpen && isSchool && meetsMinimumEnrollment && meetsZipCondition
    }

  filtered_data = _.filter(schools, predicate);
  filtered_out = _.filter(schools, function(entry){return !predicate(entry);});

  console.log('Included:', filtered_data);
  console.log('Excluded:', filtered_out.length);

  // main loop
  var color;
  var mapFiltered = function(row){
    if (row.HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (row.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000'; 
    }
    var pathOpts = {'radius': row.ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([row.Y, row.X], pathOpts)
      .bindPopup(row.FACILNAME_LABEL)
      .addTo(map);
  }
  _.each(filtered_data, mapFiltered)
})();

/* removed check for isPublic (seemed irrelevant)
removed check for isOpen and enrollment again since if in filtered data, that is tru
removed the ! for meetsZipCondition*/
