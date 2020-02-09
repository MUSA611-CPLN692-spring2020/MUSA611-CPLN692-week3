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


  // clean the data
  for (var i = 0; i < schools.length - 1; i++) {
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


  // filter data
  var filtered_data = _.filter(schools, function(school) {
    var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
    var minEnrollment = 300;

    return (school.ACTIVE == 'Open') &&
    (school.TYPE !== 'Charter' || school.TYPE !== 'Private') && ///// I DON'T UNDERSTAND WHY THIS IS OR?
    (school.ENROLLMENT > minEnrollment) &&
    (school.HAS_KINDERGARTEN || school.HAS_ELEMENTARY || school.HAS_MIDDLE_SCHOOL || school.HAS_HIGH_SCHOOL) &&
    !(acceptedZipcodes.indexOf(school.ZIPCODE) >= 0);
  });

  // main loop
_.map(filtered_data, function(school){
  var color;
  if (school.HAS_HIGH_SCHOOL){color = '#0000FF';}
  else if (school.HAS_MIDDLE_SCHOOL){color = '#00FF00';}
  else {color = '#FF0000';}

  var pathOpts = {'radius': school.ENROLLMENT / 30,
                  'fillColor': color};

  L.circleMarker([school.Y, school.X], pathOpts)
  .bindPopup(school.FACILNAME_LABEL)
  .addTo(map);
});

})();
