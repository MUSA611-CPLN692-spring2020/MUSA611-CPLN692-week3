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
  var clean = function(s) {if(typeof s["ZIPCODE"] === 'string'){
    var split = s["ZIPCODE"].split(' ');
    var normalized_zip = parseInt(split[0]);
    s["ZIPCODE"] = normalized_zip;
  }
};
  _.map(schools, clean);

/*    for (var i = 0; i < schools.length - 1; i++) {
    // If we have '19104 - 1234', splitting and taking the first (0th) element
    // as an integer should yield a zip in the format above
    if (typeof schools[i].ZIPCODE === 'string') {
      var split = schools[i].ZIPCODE.split(' ');
      var normalized_zip = parseInt(split[0]);
      schools[i].ZIPCODE = normalized_zip;
    }
*/

    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry.
    //define a function to get rid of the repeated lines below! do the same thing with simpler and readable codes.
    var hasKindergarten = function(s) {if(typeof s["GRADE_ORG"]!=='string'){
      return s["GRADE_LEVEL"] < 1;
    }else{
      return s["GRADE_LEVEL"].toUpperCase().indexOf('K') >= 0;
    }};

    var hasElementary = function(s) {if(typeof s["GRADE_ORG"]!=='string'){
      return 1 < s["GRADE_LEVEL"] < 6;
    }else{
      return s["GRADE_LEVEL"].toUpperCase().indexOf('ELEM') >= 0;
    }};

    var hasMiddle = function(s) {if(typeof s["GRADE_ORG"]!=='string'){
      return 5 < s["GRADE_LEVEL"] < 9;
    }else{
      return s["GRADE_LEVEL"].toUpperCase().indexOf('MID') >= 0;
    }};

    var hasHigh = function(s) {if(typeof s["GRADE_ORG"]!=='string'){
      return 8 < s["GRADE_LEVEL"] < 13;
    }else{
      return s["GRADE_LEVEL"].toUpperCase().indexOf('HIGH') >= 0;
    }};

/*
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
*/

  // filter data
//  var filtered_data = [];
  //var filtered_out = [];
  //use filter and other underscore to get rid of the loop below

  var filter = function (s){
    isOpen = s["ACTIVE"].toUpperCase() == 'OPEN';
    isPublic = (s["TYPE"].toUpperCase() !== 'CHARTER' ||
                s["TYPE"].toUpperCase() !== 'PRIVATE');
    isSchool = (hasKindergarten(s) ||
                hasElementary(s) ||
                hasMiddle(s) ||
                hasHigh(s));
    meetsMinimumEnrollment = s["ENROLLMENT"] > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(s["ZIPCODE"]) >= 0;
  return  filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);
  };

  var filtered_data =   _.filter(schools,filter);
  var filtered_out =   _.filter(schools,function(x){return ! filter(x)});



/*
  for (var i = 0; i < schools.length - 1; i++) {
    // These really should be predicates!
    isOpen = schools[i].ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (schools[i].TYPE.toUpperCase() !== 'CHARTER' ||
                schools[i].TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (schools[i].HAS_KINDERGARTEN ||
                schools[i].HAS_ELEMENTARY ||
                schools[i].HAS_MIDDLE_SCHOOL ||
                schools[i].HAS_HIGH_SCHOOL);
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
  */
  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // main loop
  var color;
  for (var i = 0; i < filtered_data.length - 1; i++) {
    isOpen = filtered_data[i].ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (filtered_data[i].TYPE.toUpperCase() !== 'CHARTER' ||
                filtered_data[i].TYPE.toUpperCase() !== 'PRIVATE');
    meetsMinimumEnrollment = filtered_data[i].ENROLLMENT > minEnrollment;

    // Constructing the styling  options for our map
    if (hasHigh(filtered_data[i])){
      color = '#0000FF'; // blue
    } else if (hasMiddle(filtered_data[i])) {
      color = '#00FF00'; // green
    } else {
      color = '#FF0000'; //red
    }

    // The style options - note that we're using an object to define properties
    var pathOpts = {'radius': filtered_data[i].ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([filtered_data[i].Y, filtered_data[i].X], pathOpts)
      .bindPopup(filtered_data[i].FACILNAME_LABEL)
      .addTo(map);
  }

})();
