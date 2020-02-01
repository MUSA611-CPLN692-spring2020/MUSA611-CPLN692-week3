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

  var makeZipNum = function (obj) {
    if (typeof obj.ZIPCODE === 'string') {
      split = obj.ZIPCODE.split(' ');
      normalized_zip = parseInt(split[0]);
      obj.ZIPCODE = normalized_zip;
    }
    return obj;
  };

  var makeLevels = function(obj) {
    if (typeof obj.GRADE_ORG === 'number') {  // if number
      obj.HAS_KINDERGARTEN = obj.GRADE_LEVEL < 1;
      obj.HAS_ELEMENTARY = 1 < obj.GRADE_LEVEL < 6;
      obj.HAS_MIDDLE_SCHOOL = 5 < obj.GRADE_LEVEL < 9;
      obj.HAS_HIGH_SCHOOL = 8 < obj.GRADE_LEVEL < 13;
    } else {  // otherwise (in case of string)
      obj.HAS_KINDERGARTEN = obj.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      obj.HAS_ELEMENTARY = obj.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      obj.HAS_MIDDLE_SCHOOL = obj.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      obj.HAS_HIGH_SCHOOL = obj.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
    return obj;
  };

  var makeNice = function(obj) {
    obj = makeZipNum(obj);
    obj = makeLevels(obj);
    return obj;
  };

  data = _.map(schools, makeNice);

  // console.log('data[0]:', data[0]);

  var isGood = function(school){
    isOpen = school.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (school.TYPE.toUpperCase() !== 'CHARTER' ||
                school.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (school.HAS_KINDERGARTEN ||
                school.HAS_ELEMENTARY ||
                school.HAS_MIDDLE_SCHOOL ||
                school.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = school.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(school.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);

    return filter_condition;
  };

  filtered_data = _.filter(data, isGood);
  filtered_out = _.reject(data, isGood);

  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // console.log('filtered_data[0]:', filtered_data[0]);

  var plotSchool = function(school, index, list) {
    // Constructing the styling  options for our map
    if (school.HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (school.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    // The style options
    var pathOpts = {'radius': school.ENROLLMENT / 30,
                    'fillColor': color};
    // console.log("[school.Y, school.X]: ", [school.Y, school.X]);
    L.circleMarker([school.Y, school.X], pathOpts)
      .bindPopup(school.FACILNAME_LABEL)
      .addTo(map);
  };

  _.each(filtered_data, plotSchool);

})();
