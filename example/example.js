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

  console.log(schools);

  // clean the data
  var zip = function(s){
    if(typeof s.ZIPCODE === 'string'){
      var split = s.ZIPCODE.split(' ');
      var normalized_zip = parseInt(split[0]);
      s.ZIPCODE = normalized_zip;
    }
    return s;
  };

  var hasKindergarten = function(s){
    if(typeof s.GRADE_ORG !== 'string'){
      s.HAS_KINDERGARTEN = s.GRADE_LEVEL < 1;
    }else{
      s.HAS_KINDERGARTEN = s.GRADE_LEVEL.toUpperCase().indexOf('K')>=0;
    }
    return s;
  };

  var hasElementary = function(s){
    if(typeof s.GRADE_ORG !== 'string'){
      s.HAS_ELEMENTARY = 1 < s.GRADE_LEVEL < 6;
    }else{
      s.HAS_ELEMENTARY = s.GRADE_LEVEL.toUpperCase().indexOf('ELEM')>=0;
    }
    return s;
  };

  var hasMiddleschool = function(s){
    if(typeof s.GRADE_ORG !== 'string'){
      s.HAS_MIDDLE_SCHOOL = 5 < s.GRADE_LEVEL < 9;
    }else{
      s.HAS_MIDDLE_SCHOOL = s.GRADE_LEVEL.toUpperCase().indexOf('MID')>=0;
    }
    return s;
  };

  var hasHighschool = function(s){
    if(typeof s.GRADE_ORG !== 'string'){
      s.HAS_HIGH_SCHOOL = 8 < s.GRADE_LEVEL < 13;
    }else{
      s.HAS_HIGH_SCHOOL = s.GRADE_LEVEL.toUpperCase().indexOf('HIGH')>=0;
    }
    return s;
  };

  schools = _.map(schools,zip);
  schools = _.map(schools,hasKindergarten);
  schools = _.map(schools,hasElementary);
  schools = _.map(schools,hasMiddleschool);
  schools = _.map(schools,hasHighschool);

  console.log(schools);


  // filter data
  var filtered_data = [];
  var filtered_out = [];

  var isopen = function(s){
    return s.ACTIVE.toUpperCase() === 'OPEN';
  };
  var ispublic = function(s){
    return (s.TYPE.toUpperCase() !== 'CHARTER' || s.TYPE.toUpperCase() !== 'PRIVATE');
  };
  var isschool = function(s){
    return (s.HAS_KINDERGARTEN || s.HAS_ELEMENTARY || s.HAS_MIDDLE_SCHOOL || s.HAS_HIGH_SCHOOL);
  };
  var meetsMinimumEnrollment = function(s){
    return (s.ENROLLMENT > minEnrollment);
  };
  var meetsZipCondition = function(s){
    return (acceptedZipcodes.indexOf(s.ZIPCODE) >= 0);
  };
  var filtered = function(s){
    return (isopen(s) && isschool(s)&& meetsMinimumEnrollment(s) && !meetsZipCondition(s));
  };
  var filterout = function(s){
    return (!filtered(s));
  };

  filtered_data = _.filter(schools,filtered);
  filtered_out = _.filter(schools,filterout);

  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);
  console.log(schools);

  // Step3
  var color = function(s){
    if(s.HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (s.HAS_MIDDLE_SCHOOL){
      color = '#00FF00'; // green
    } else {
      color = '#FF0000'; //red
    }
    var pathOpts = {'radius': s.ENROLLMENT / 30,
                  'fillColor': color};
    return  L.circleMarker([s.Y, s.X], pathOpts)
       .bindPopup(s.FACILNAME_LABEL)
       .addTo(map);
   };

   var final = _.map(filtered_data,color)
   console.log(final)

})();
