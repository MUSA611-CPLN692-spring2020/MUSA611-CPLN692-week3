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
  schools = _.map(schools, function(row)
  {
    if (typeof row.ZIPCODE === 'string'){
        split = row.ZIPCODE.split(' ');
        normalized_zip = parseInt(split[0]);
        row.ZIPCODE = normalized_zip;
  }

    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry
    if (typeof row.GRADE_ORG === 'number') {  // if number
      row.HAS_KINDERGARTEN = row.GRADE_LEVEL < 1;
      row.HAS_ELEMENTARY = 1 < row.GRADE_LEVEL < 6;
      row.HAS_MIDDLE_SCHOOL = 5 < row.GRADE_LEVEL < 9;
      row.HAS_HIGH_SCHOOL = 8 < row.GRADE_LEVEL < 13;
    } else {  // otherwise (in case of string)
      row.HAS_KINDERGARTEN = row.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      row.HAS_ELEMENTARY = row.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      row.HAS_MIDDLE_SCHOOL = row.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      row.HAS_HIGH_SCHOOL = row.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
    return row;
  }
);
  // filter data
  var filtered_data = [];
  var filtered_out = [];
  _.map(schools,function(row){
      isOpen = row.ACTIVE.toUpperCase() == 'OPEN';
      isPublic = _.some([row.TYPE.toUpperCase() !== 'CHARTER',
                  row.TYPE.toUpperCase() !== 'PRIVATE']);
      isSchool = _.some([row.HAS_KINDERGARTEN,row.HAS_ELEMENTARY,row.HAS_MIDDLE_SCHOOL,row.HAS_HIGH_SCHOOL]);
      meetsMinimumEnrollment = row.ENROLLMENT > minEnrollment;
      meetsZipCondition = _.contains(acceptedZipcodes,row.ZIPCODE);
      filter_condition = _.every([isOpen,isSchool,meetsMinimumEnrollment,!meetsZipCondition]);
    if (filter_condition) {
      filtered_data.push(row);
    } else {
      filtered_out.push(row);
    }
  });
  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // main loop
  var color;
  _.map(filtered_data,function(row){
    isOpen = row.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (row.TYPE.toUpperCase() !== 'CHARTER' ||
                row.TYPE.toUpperCase() !== 'PRIVATE');
    meetsMinimumEnrollment = row.ENROLLMENT > minEnrollment;

    // Constructing the styling  options for our map
    if (row.HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (row.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    // The style options
    var pathOpts = {'radius': row.ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([row.Y, row.X], pathOpts)
      .bindPopup(row.FACILNAME_LABEL)
      .addTo(map);
  });

})();
