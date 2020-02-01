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

  // Mock user input
  // Filter out according to these zip codes:
  var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  var minEnrollment = 300;



  // clean the data
  function clean(school) {
    // If we have '19104 - 1234', splitting and taking the first (0th) element
    // as an integer should yield a zip in the format above
    if (typeof school.ZIPCODE === 'string') {
      var split = school.ZIPCODE.split(' ');
      var normalized_zip = parseInt(split[0]);
      school.ZIPCODE = normalized_zip;
    }
  }
  _.each(schools, clean);

    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry.
  function isHighSchool(school) {
      if (typeof school.GRADE_ORG === 'number') {
        return 8 < school.GRADE_LEVEL < 13;
      } else {
        return school.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
      }
  }

  function isMiddleSchool(school) {
    if (typeof school.GRADE_ORG === 'number') {
      return 5 < school.GRADE_LEVEL < 9;
    } else {
      return school.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
    }
  }

  function isElementarySchool(school) {
    if (typeof school.GRADE_ORG === 'number') {
      return 1 < school.GRADE_LEVEL < 6;
    } else {
      return school.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
    }
  }

  function isKindergarten(school) {
    if (typeof school.GRADE_ORG === 'number') {
      return school.GRADE_LEVEL < 1;
    } else {
      return school.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
    }
  }


  // filter data
  var filtered_data = [];
  var filtered_out = [];
  function filterpred(school) {
    isOpen = school.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (school.TYPE.toUpperCase() !== 'CHARTER' ||
                school.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (isHighSchool(school) ||
                isMiddleSchool(school) ||
                isElementarySchool(school) ||
                isKindergarten(school));
    meetsMinimumEnrollment = school.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(school.ZIPCODE) >= 0;
    return isOpen && isSchool && meetsMinimumEnrollment && !meetsZipCondition;
  }

  filtered_data = _.filter(schools, filterpred);
  filtered_out = _.filter(schools, function(school) {return !filterpred(school);});

  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // main loop
  var color;
  function mapschool(school) {
    if (isHighSchool(school)){
      color = '#0000FF'; // blue
    } else if (isMiddleSchool(school)) {
      color = '#00FF00'; // green
    } else {
      color = '#FF0000'; //red
    }
    var pathOpts = {'radius': school.ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([school.Y, school.X], pathOpts)
      .bindPopup(school.FACILNAME_LABEL)
      .addTo(map);
  }

  _.each(filtered_data, mapschool);

})();
