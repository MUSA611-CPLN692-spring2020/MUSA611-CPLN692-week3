// Bike Share data stored as array of arrays

var bikeArrayClean = [
  [
    -75.16374,
    39.95378,
    "Municipal Services Building Plaza",
    25
  ],
  [
    -75.14403,
    39.94733,
    "Welcome Park, NPS",
    13
  ],
  [
    -75.20311,
    39.9522,
    "40th & Spruce",
    17
  ],
  [
    -75.15993,
    39.94517,
    "11th & Pine, Kahn Park",
    15
  ],
  [
    -75.14973,
    39.98082,
    "Temple University Station",
    19
  ],
  [
    -75.18982,
    39.95576,
    "33rd & Market",
    14
  ],
  [
    -75.16618,
    39.94711,
    "15th & Spruce",
    19
  ],
  [
    -75.19701,
    39.96046,
    "38th & Lancaster",
    8
  ],
  [
    -75.1775,
    39.94217,
    "21st & Catharine",
    27
  ],
  [
    -75.14792,
    39.96317,
    "6th & Fairmount",
    15
  ],
  [
    -75.17369,
    39.95886,
    "21st & Winter, Franklin Institute",
    25
  ],
  [
    -75.1487,
    39.94759,
    "4th & Walnut, NPS",
    11
  ],
  [
    -75.1547,
    39.96892,
    "11th & Poplar, John F. Street Community Center",
    15
  ],
  [
    -75.14371,
    39.98003,
    "6th & Berks",
    15
  ],
  [
    -75.15979,
    39.95273,
    "12th & Filbert",
    18
  ],
  [
    -75.14983,
    39.95403,
    "6th & Race",
    15
  ],
  [
    -75.18986,
    39.94887,
    "University City Station",
    35
  ],
  [
    -75.16902,
    39.9539,
    "18th & JFK",
    20
  ],
  [
    -75.18323,
    39.95472,
    "Amtrak 30th Street Station",
    21
  ],
  [
    -75.17286,
    39.95048,
    "Rittenhouse Square",
    21
  ],
  [
    -75.20908,
    39.94822,
    "43rd & Chester, Clark Park",
    19
  ],
  [
    -75.1612,
    39.93724,
    "11th & Washington",
    15
  ],
  [
    -75.14564,
    39.94138,
    "2nd & South",
    17
  ],
  [
    -75.20177,
    39.95708,
    "40th Street Station, MFL",
    6
  ],
  [
    -75.14958,
    39.94061,
    "4th & Bainbridge",
    15
  ],
  [
    -75.19479,
    39.9538,
    "36th & Sansom",
    17
  ],
  [
    -75.15716,
    39.93935,
    "Darien & Catharine",
    29
  ],
  [
    -75.15522,
    39.98005,
    "13th & Montgomery",
    21
  ],
  [
    -75.17971,
    39.94527,
    "23rd & South",
    17
  ],
  [
    -75.15672,
    39.95005,
    "10th & Chestnut",
    20
  ],
  [
    -75.16248,
    39.93315,
    "11th & Reed",
    16
  ],
  [
    -75.19419,
    39.96271,
    "Dornsife Center",
    20
  ],
  [
    -75.14001,
    39.96844,
    "2nd & Germantown",
    15
  ],
  [
    -75.16138,
    39.95424,
    "Pennsylvania Convention Center",
    21
  ],
  [
    -75.19409,
    39.94781,
    "The Children's Hospital of Philadelphia (CHOP)",
    15
  ],
  [
    -75.1597,
    39.97121,
    "Broad & Girard",
    19
  ],
  [
    -75.16606,
    39.96289,
    "17th & Spring Garden, Community College of Philadelphia",
    21
  ],
  [
    -75.13546,
    39.96849,
    "Girard Station, MFL",
    19
  ],
  [
    -75.17474,
    39.93082,
    "18th & Fernon, Aquinas Center",
    18
  ],
  [
    -75.16237,
    39.94792,
    "13th & Locust",
    15
  ],
  [
    -75.14472,
    39.95012,
    "2nd & Market",
    11
  ],
  [
    -75.14921,
    39.95071,
    "Independence Mall, NPS",
    20
  ],
  [
    -75.1425,
    39.94509,
    "Foglietta Plaza",
    29
  ],
  [
    -75.15426,
    39.95339,
    "9th & Arch",
    15
  ],
  [
    -75.17507,
    39.96744,
    "23rd & Fairmount",
    25
  ],
  [
    -75.15695,
    39.94732,
    "9th & Locust",
    25
  ],
  [
    -75.18154,
    39.93231,
    "Point Breeze & Tasker",
    19
  ],
  [
    -75.1742,
    39.9625,
    "Rodin Museum",
    15
  ],
  [
    -75.15457,
    39.95112,
    "8th & Market",
    15
  ],
  [
    -75.15813,
    39.97669,
    "Broad & Oxford",
    23
  ],
  [
    -75.17999,
    39.96442,
    "Philadelphia Museum of Art",
    13
  ],
  [
    -75.17001,
    39.96716,
    "20th & Fairmount",
    13
  ],
  [
    -75.16174,
    39.96265,
    "Spring Garden Station, BSL",
    21
  ],
  [
    -75.17036,
    39.95923,
    "Free Library of Philadelphia - Central Library",
    19
  ],
  [
    -75.17761,
    39.95425,
    "23rd & Market",
    25
  ],
  [
    -75.17943,
    39.95197,
    "24th & Sansom",
    15
  ],
  [
    -75.1698,
    39.94633,
    "17th & Pine",
    25
  ],
  [
    -75.17327,
    39.9384,
    "18th & Washington, Chew Playground",
    15
  ],
  [
    -75.15171,
    39.9707,
    "Girard & Hutchinson",
    15
  ],
  [
    -75.17348,
    39.94561,
    "19th & Lombard",
    19
  ],
  [
    -75.19973,
    39.96411,
    "39th & Mt. Vernon, Mantua Haverford Community Center",
    17
  ],
  [
    -75.16711,
    39.93549,
    "Broad & Federal",
    18
  ],
  [
    -75.15038,
    39.93704,
    "4th & Christian",
    23
  ],
  [
    -75.13983,
    39.96062,
    "Spring Garden Station, MFL",
    19
  ],
  [
    -75.18788,
    39.96173,
    "32nd & Baring, Drexel Park",
    13
  ],
  [
    -75.14541,
    39.93445,
    "Front & Carpenter",
    25
  ],
  [
    -75.15242,
    39.96143,
    "9th & Spring Garden",
    15
  ],
  [
    -75.20987,
    39.95511,
    "44th & Walnut",
    15
  ],
  [
    -75.16125,
    39.96718,
    "Fairmount & Ridge",
    12
  ],
  [
    -75.16351,
    39.97207,
    "17th & Girard",
    19
  ],
  [
    -75.17192,
    39.95355,
    "19th & Market",
    16
  ],
  [
    -75.16691,
    39.94019,
    "Broad & Christian",
    21
  ],
  [
    -75.1418,
    39.96984,
    "3rd & Girard",
    20
  ]
];
