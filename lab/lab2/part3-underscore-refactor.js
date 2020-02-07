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

  // clean the data
  var clean_data = _.each(schools, function (n) {
    if (typeof n.ZIPCODE === 'string') {
      var split = n.ZIPCODE.split(' ');
      var normalized = parseInt(split[0]);
      n.ZIPCODE = normalized;
    }
    if (typeof n.GRADE_ORG === 'number') {
      n.HAS_KINDERGARTEN = n.GRADE_LEVEL < 1;
      n.HAS_ELEMENTARY = 1 < n.GRADE_LEVEL < 6;
      n.HAS_MIDDLE_SCHOOL = 5 < n.GRADE_LEVEL < 9;
      n.HAS_HIGH_SCHOOL = 8 < n.GRADE_LEVEL < 13;
    } else {
      n.HAS_KINDERGARTEN = n.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      n.HAS_ELEMENTARY = n.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      n.HAS_MIDDLE_SCHOOL = n.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      n.HAS_HIGH_SCHOOL = n.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
  });

  /* for (var i = 0; i < schools.length - 1; i++) {
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
  }
console.log(schools);*/

  var filter_data = _.filter(clean_data, function (school) {
    isOpen = school.ACTIVE.toUpperCase() == 'OPEN';
    console.log(isOpen);
    isSchool = (school.HAS_KINDERGARTEN || school.HAS_ELEMENTARY || school.HAS_MIDDLE_SCHOOL || school.HAS_HIGH_SCHOOL);
    console.log(isSchool);
    enroll = school.ENROLLMENT > minEnrollment;
    console.log(enroll);
    within_zips = acceptedZipcodes.indexOf(school.ZIPCODE) >= 0;
    console.log(within_zips);
    filter = isOpen && isSchool && enroll && !within_zips;
    console.log(filter)
    //isPublic = (school.TYPE.toUpperCase() !== 'CHARTER' || school.acceptedZipcodes.TYPE.toUpperCase() !== 'PRIVATE');
    if (filter) {
      return school;
    }
  });
  /*
  // filter data
    var filtered_data = [];
    var filtered_out = [];

    for (var i = 0; i < clean_data.length - 1; i++) {
    // These really should be predicates!
      isOpen = clean_data[i].ACTIVE.toUpperCase() == 'OPEN';
      isPublic = (clean_data[i].TYPE.toUpperCase() !== 'CHARTER' || 
                  clean_data[i].TYPE.toUpperCase() !== 'PRIVATE');
      isSchool = (clean_data[i].HAS_KINDERGARTEN ||
                  clean_data[i].HAS_ELEMENTARY ||
                  clean_data[i].HAS_MIDDLE_SCHOOL ||
                  clean_data[i].HAS_HIGH_SCHOOL);
      meetsMinimumEnrollment = clean_data[i].ENROLLMENT > minEnrollment;
      meetsZipCondition = acceptedZipcodes.indexOf(clean_data[i].ZIPCODE) >= 0;
      filter_condition = (isOpen &&
                          isSchool &&
                          meetsMinimumEnrollment &&
                          !meetsZipCondition);

      if (filter_condition) {
        filtered_data.push(clean_data[i]);
      } else {
        filtered_out.push(clean_data[i]);
      }
    }
    console.log('Included:', filtered_data);
    console.log('Excluded:', filtered_out.length);
    */
  console.log('Filter Data: ', filter_data);

  // main loop
  var color;

  var addToMap = _.each(filter_data, function (data_point) {
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
  /*
    for (var i = 0; i < filter_data.length - 1; i++) {
      isOpen = filter_data[i].ACTIVE.toUpperCase() == 'OPEN';
      isPublic = (filter_data[i].TYPE.toUpperCase() !== 'CHARTER' ||
                  filter_data[i].TYPE.toUpperCase() !== 'PRIVATE');
      meetsMinimumEnrollment = filter_data[i].ENROLLMENT > minEnrollment;

      // Constructing the styling  options for our map
      if (filter_data[i].HAS_HIGH_SCHOOL){
        color = '#0000FF'; // blue
      } else if (filter_data[i].HAS_MIDDLE_SCHOOL) {
        color = '#00FF00'; // green
      } else {
        color = '#FF0000'; //red
      }

      // The style options - note that we're using an object to define properties
      var pathOpts = {'radius': filter_data[i].ENROLLMENT / 30,
                      'fillColor': color};
      L.circleMarker([filter_data[i].Y, filter_data[i].X], pathOpts)
        .bindPopup(filter_data[i].FACILNAME_LABEL)
        .addTo(map);
    }
    */

})()