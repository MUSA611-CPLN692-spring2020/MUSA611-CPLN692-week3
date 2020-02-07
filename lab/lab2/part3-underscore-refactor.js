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
  var splitzip = function(row) {
    split = row.ZIPCODE.split(' ');
    normalized_zip = parseInt(split[0]);
    row.ZIPCODE = normalized_zip;
    return row;
  };
  _.map(_.filter(schools, function(row){return typeof row.ZIPCODE == 'string';}), splitzip);

  var schooltype1 = function(row) {
    row.HAS_KINDERGARTEN = row.GRADE_LEVEL < 1;
    row.HAS_ELEMENTARY = _.contains(_.range(1,7), row.GRADE_LEVEL);
    row.HAS_MIDDLE_SCHOOL = _.contains(_.range(5,10), row.GRADE_LEVEL);
    row.HAS_HIGH_SCHOOL = _.contains(_.range(8,14), row.GRADE_LEVEL);
  };

  var schooltype2 = function(row) {
    row.HAS_KINDERGARTEN = _.contains(row.GRADE_LEVEL.toUpperCase(),'K');
    row.HAS_ELEMENTARY = _.contains(row.GRADE_LEVEL.toUpperCase(),'ELEM');
    row.HAS_MIDDLE_SCHOOL = _.contains(row.GRADE_LEVEL.toUpperCase(),'MID');
    row.HAS_HIGH_SCHOOL = _.contains(row.GRADE_LEVEL.toUpperCase(),'HIGH');
  };

  _.map(_.filter(schools, function(row){return typeof row.GRADE_ORG === 'number';}), schooltype1);
  _.map(_.filter(schools, function(row){return typeof row.GRADE_ORG !== 'number';}), schooltype2);

  // filter data
  var filtered_data = [];
  var filtered_out = [];

  var schooltype3 = function(row) {
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
  };

  _.each(schools, schooltype3);

  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // main loop
  var color;

  var schooltype4 = function(row){
    isOpen = row.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = _.some([row.TYPE.toUpperCase() !== 'CHARTER',row.TYPE.toUpperCase() !== 'PRIVATE']);
    meetsMinimumEnrollment = row.ENROLLMENT > minEnrollment;

    // Constructing the styling  options for our map
    if (row.HAS_HIGH_SCHOOL){
      color = '#0000FF'; // blue
    } else if (row.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00'; // green
    } else {
      color = '#FF0000'; //red
    }

    // The style options - note that we're using an object to define properties
    var pathOpts = {'radius': row.ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([row.Y, row.X], pathOpts)
      .bindPopup(row.FACILNAME_LABEL)
      .addTo(map);
  };

  _.each(filtered_data, schooltype4);

})();
