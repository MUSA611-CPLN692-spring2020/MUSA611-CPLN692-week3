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
  var fixZipCodes = function(zip) {
    if (typeof zip == "string") {
      var split = zip.split(' ');
      var firstSplit = split[0];
      var firstSplitAsNumber = parseInt(firstSplit);
      return firstSplitAsNumber;
    } else {
      return zip;
    }
  };

  var UpdatedZipCodes;
  for (var i = 0; i < schools.length - 1; i++) {
    fixZipCodes('ZIPCODE');
    return UpdatedZipCodes;
  }



    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry
var hasKindergarten = function(school) {
  if (typeof school.GRADE_ORG == 'number') {
    return school.GRADE_LEVEL < 1;
  } else {
    return school.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
  }
};

var hasElementary = function(school) {
  if (typeof school.GRADE_ORG == 'number') {
    return school.GRADE_LEVEL < 6;
  } else {
    return school.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
  }
};

var hasMiddle = function(school) {
  if (typeof school.GRADE_ORG == 'number') {
    return school.GRADE_LEVEL < 9;
  } else {
    return school.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
  }
};

var hasHS = function(school) {
  if (typeof school.GRADE_ORG == 'number') {
    return school.GRADE_LEVEL < 9;
  } else {
    return school.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
  }
};

  // filter data
  var filtered_data = [];
  var filtered_out = [];
  for (i = 0; i < schools.length - 1; i++) {
    isOpen = schools[i].ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (schools[i].TYPE.toUpperCase() !== 'CHARTER' ||
                schools[i].TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (schools[i].hasKindergarten ||
                schools[i].hasElementary ||
                schools[i].hasMiddle ||
                schools[i].hasHS);
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
  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // main loop
  var color;
  for (i = 0; i < filtered_data.length - 1; i++) {
    isOpen = filtered_data[i].ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (filtered_data[i].TYPE.toUpperCase() !== 'CHARTER' ||
                filtered_data[i].TYPE.toUpperCase() !== 'PRIVATE');
    meetsMinimumEnrollment = filtered_data[i].ENROLLMENT > minEnrollment;

    // Constructing the styling  options for our map
    if (filtered_data[i].HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (filtered_data[i].HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    // The style options
    var pathOpts = {'radius': filtered_data[i].ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([filtered_data[i].Y, filtered_data[i].X], pathOpts)
      .bindPopup(filtered_data[i].FACILNAME_LABEL)
      .addTo(map);
  }

})();
