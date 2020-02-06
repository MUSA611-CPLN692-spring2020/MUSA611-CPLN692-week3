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

  /*
  // clean the data
  for (var i = 0; i < schools.length - 1; i++) {
    // If we have '19104 - 1234', splitting and taking the first (0th) element
    // as an integer should yield a zip in the format above
    if (typeof schools[i].ZIPCODE === 'string') {
      var split = schools[i].ZIPCODE.split(' ');
      var normalized_zip = parseInt(split[0]);
      schools[i].ZIPCODE = normalized_zip;
    }
*/

    var schoool = _.map(schools, function(each){
      if (typeof each.ZIPCODE === 'string'){
        var split = each.ZIPCODE.split(' ');
        var normalized_zip = parseInt(split[0]);
        each.ZIPCODE = normalized_zip;
      }

    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry.
    if (typeof each.GRADE_ORG === 'number') {
      each.HAS_KINDERGARTEN = each.GRADE_LEVEL < 1;
      each.HAS_ELEMENTARY = 1 < each.GRADE_LEVEL < 6;
      each.HAS_MIDDLE_SCHOOL = 5 < each.GRADE_LEVEL < 9;
      each.HAS_HIGH_SCHOOL = 8 < each.GRADE_LEVEL < 13;
    } else {
      each.HAS_KINDERGARTEN = each.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      each.HAS_ELEMENTARY = each.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      each.HAS_MIDDLE_SCHOOL = each.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      each.HAS_HIGH_SCHOOL = each.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
  })

  // filter data
  var filtered_data = [];
  var filtered_out = [];
  _.filter(schools, function(one){

 //for (var i = 0; i < schools.length - 1; i++) {
    // These really should be predicates!
    isOpen = one.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (one.TYPE.toUpperCase() !== 'CHARTER' ||
                one.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (one.HAS_KINDERGARTEN ||
                one.HAS_ELEMENTARY ||
                one.HAS_MIDDLE_SCHOOL ||
                one.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = one.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(one.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);

    if (filter_condition) {
      filtered_data.push(one);
    } else {
      filtered_out.push(one);
    }
  })
  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // main loop
  var color;
  _.map(filtered_data, function(main){

  //for (var i = 0; i < filtered_data.length - 1; i++) {
    isOpen = main.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (main.TYPE.toUpperCase() !== 'CHARTER' ||
                main.TYPE.toUpperCase() !== 'PRIVATE');
    meetsMinimumEnrollment = main.ENROLLMENT > minEnrollment;

    // Constructing the styling  options for our map
    if (main.HAS_HIGH_SCHOOL){
      color = '#0000FF'; // blue
    } else if (main.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00'; // green
    } else {
      color = '#FF0000'; //red
    }

    // The style options - note that we're using an object to define properties
    var pathOpts = {'radius': main.ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([main.Y, main.X], pathOpts)
      .bindPopup(main.FACILNAME_LABEL)
      .addTo(map);
  })

})();
