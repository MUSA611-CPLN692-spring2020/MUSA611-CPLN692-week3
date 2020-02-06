(function (){

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
    var school2 = _.map(schools,function(zip) {
      if(typeof zip.ZIPCODE === 'string') {
        var split = zip.ZIPCODE.split(' ');
        var normalized_zip = parseInt(split[0]);
        zip.ZIPCODE = normalized_zip;
      }
    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry.
      if (typeof zip.GRADE_ORG === 'number') {
        zip.HAS_KINDERGARTEN = zip.GRADE_LEVEL < 1;
        zip.HAS_ELEMENTARY = 1 < zip.GRADE_LEVEL < 6;
        zip.HAS_MIDDLE_SCHOOL = 5 < zip.GRADE_LEVEL < 9;
        zip.HAS_HIGH_SCHOOL = 8 < zip.GRADE_LEVEL < 13;
      } else {
        zip.HAS_KINDERGARTEN = zip.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
        zip.HAS_ELEMENTARY = zip.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
        zip.HAS_MIDDLE_SCHOOL = zip.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
        zip.HAS_HIGH_SCHOOL = zip.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
      }
    return zip})

    console.log(school2)


  // filter data
  var filtered_data = [];
  var filtered_out = [];

  var school3 = _.filter(school2,function(eachone){
  //for (var i = 0; i < schools.length - 1; i++) {
    // These really should be predicates!
    isOpen = eachone.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (eachone.TYPE.toUpperCase() !== 'CHARTER' ||
                eachone.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (eachone.HAS_KINDERGARTEN ||
                eachone.HAS_ELEMENTARY ||
                eachone.HAS_MIDDLE_SCHOOL ||
                eachone.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = eachone.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(eachone.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);

    if (filter_condition) {
      return eachone
      //filtered_data.push(eachone);
    } else {
      filtered_out.push(eachone);
    }
  })

console.log(school3)

  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // main loop
  var color;
  _.map(school3,function(final){
//  for (var i = 0; i < final.length - 1; i++) {
    isOpen = final.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (final.TYPE.toUpperCase() !== 'CHARTER' ||
                final.TYPE.toUpperCase() !== 'PRIVATE');
    meetsMinimumEnrollment = final.ENROLLMENT > minEnrollment;

    // Constructing the styling  options for our map
    if (final.HAS_HIGH_SCHOOL){
      color = '#0000FF'; // blue
    } else if (final.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00'; // green
    } else {
      color = '#FF0000'; //red
    }

    // The style options - note that we're using an object to define properties
    var pathOpts = {'radius': final.ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([final.Y, final.X], pathOpts)
      .bindPopup(final.FACILNAME_LABEL)
      .addTo(map);
  })

})();
