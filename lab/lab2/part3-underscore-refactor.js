(function () {

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

  // Mock user input
  // Filter out according to these zip codes:
  var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  var minEnrollment = 300;

// clean the dat
  var kinder = function(school) {
    if (typeof school.GRADE_ORG == 'number') {
      school.HAS_KINDERGARTEN = school.GRADE_LEVEL < 1;
      return school.HAS_KINDERGARTEN;
    } else {
      school.HAS_KINDERGARTEN = school.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      return school.HAS_KINDERGARTEN;
    }
  }
  var elem = function(school) {
    if (typeof school.GRADE_ORG == 'number') {
      school.HAS_ELEMENTARY = 1 < school.GRADE_LEVEL < 6;  
      return school.HAS_ELEMENTARY;
    } else {
      school.HAS_ELEMENTARY = school.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      return school.HAS_ELEMENTARY;
    }
  }

  var mid = function(school) {
    if (typeof school.GRADE_ORG == 'number') {
      school.HAS_MIDDLE_SCHOOL = 5 < school.GRADE_LEVEL < 9;
      return school.HAS_MIDDLE_SCHOOL;
    } else {
      school.HAS_MIDDLE_SCHOOL = school.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      return school.HAS_MIDDLE_SCHOOL;
    }
  }
  var high = function(school) {
    if (typeof school.GRADE_ORG == 'number') {
      school.HAS_HIGH_SCHOOL = 8 < school.GRADE_LEVEL < 13;
      return school.HAS_HIGH_SCHOOL;
    } 
    else {
      school.HAS_HIGH_SCHOOL = school.GRADE_LEVEL.toUpperCase().indexOf('HGH') >= 0;
      return school.HAS_HIGH_SCHOOL;
    }
  }
  var convertZip = function(school){
    if (typeof school.ZIPCODE === 'string') {
      var split = school.ZIPCODE.split(' ');
      var normalized = parseInt(split[0]);
      school.ZIPCODE = normalized;
      return school.ZIPCODE;
    }
  }


  var clean_data = _.each(schools, function (school) {
    convertZip(school);
    kinder(school);
    elem(school);
    mid(school);
    high(school);
  });
  console.log(clean_data);

  var filter_data = _.filter(clean_data, function (school) {
    isOpen = school.ACTIVE.toUpperCase() == 'OPEN';
    //console.log(isOpen);
    isSchool = (school.HAS_KINDERGARTEN || school.HAS_ELEMENTARY || school.HAS_MIDDLE_SCHOOL || school.HAS_HIGH_SCHOOL);
    //console.log(isSchool);
    enroll = school.ENROLLMENT > minEnrollment;
    //console.log(enroll);
    within_zips = acceptedZipcodes.indexOf(school.ZIPCODE) >= 0;
    //console.log(within_zips);
    filter = isOpen && isSchool && enroll && !within_zips;
    //console.log(filter)
    //isPublic = (school.TYPE.toUpperCase() !== 'CHARTER' || school.acceptedZipcodes.TYPE.toUpperCase() !== 'PRIVATE');
    if (filter) {
      return school;
    }
  });
  
  console.log('Filter Data: ', filter_data);

  // main loop
  var color;

  var addToMap = _.map(filter_data, function (data_point) {
    if (data_point.HAS_HIGH_SCHOOL) {
      color = '#0000FF'; // blue
    } else if (data_point.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00'; // green
    } else {
      color = '#FF0000'; //red
    }
    
    var pathOpts = {
      'radius': data_point.ENROLLMENT / 30,
      'fillColor': color
    };
    L.circleMarker([data_point.Y, data_point.X], pathOpts)
      .bindPopup(data_point.FACILNAME_LABEL)
      .addTo(map);
  });
})()