/* =====================
# Lab 2, Part 1 — Underscore Selection

## Introduction

Set variables "query1" through "query8" by using an underscore function to answer the specified question.
When you are finished, check your browser's console log to test the results.

For datan all of the queries, use the following two lists of board games.
===================== */

var jeffGameList = ["chess", "monopoly", "sorry", "pandemic", "candyland"];
console.log('Jeff\'s list', jeffGameList);

var nathanGameList = ["chess", "dice", "catan", "pandemic"];
console.log('Nathan\'s list', nathanGameList);

/* =====================
What is the first game in Jeff's list?
===================== */

var query1 = _.first(jeffGameList);

console.log('What is the first game in Jeff\'s list?', query1);

/* =====================
What are all of the games except for the first game in Jeff's list?
===================== */

var query2 = _.rest(jeffGameList);

console.log('What are all of the games except for the first game in Jeff\'s list?', query2);

/* =====================
What is the last game in Nathan's list?
===================== */

var query3 = _.last(nathanGameList);

console.log('What is the last game in Nathan\'s list?', query3);

/* =====================
What are all of the games in Nathan's list except for the last?
===================== */

var query4 = _.initial(nathanGameList);

console.log('What are all of the games in Nathan\'s list except for the last?', query4);

/* =====================
What would Nathan's game list look like if he sold "catan"?
===================== */

var query5 = _.without(nathanGameList, "catan");

console.log('What would Nathan\'s game list look like if he sold "catan"?', query5);

/* =====================
If Nathan and Jeff play a board game, what are their options? This should be a list of all games owned by Jeff or Nathan, with no duplicates.
===================== */

var query6 = _.union(jeffGameList, nathanGameList);

console.log('If Nathan and Jeff play a board game, what are their options? This should be a list of all games owned by Jeff or Nathan, with no duplicates.', query6);

/* =====================
Which games are owned by both Jeff and Nathan?
===================== */

var query7 = _.intersection(jeffGameList, nathanGameList);

console.log('Which games are owned by both Jeff and Nathan', query7);

/* =====================
Which games are exclusive to collections? In other words, only owned by either Jeff or Nathan.
===================== */

var query8 = _.difference(jeffGameList, nathanGameList);

console.log('Which games are exclusive to one collection? In other words, only owned by either Jeff or Nathan (but not both!).', query8);
