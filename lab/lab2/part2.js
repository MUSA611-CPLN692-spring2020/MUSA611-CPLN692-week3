/* =====================
# Lab 2, Part 2 — Underscore Analyze

## Introduction

Let's revisit the bike share data from Week 2 Lab 1, Part 4. Remember, each array contains the following:

1. lng
2. lat
3. label
4. number of bike share docks at the station

## Task 1

We're especially interested in number 4: number of bike share docks at the station.

Using underscore functions, generate a list of all bike share docks that are greater than 20. One
way to do this is by using _.filter, but you can try other solutions as well. Set your answer to
variable "largeStationList".

Reminder: you can (and should) use `console.log` to test your solutions!

## Task 2

Let's say we only care about the final count of bike share locations with more than 20 docks.
Calculate the value by using _.countBy and set your answer to variable "largeStationCount".
===================== */

var data = bikeArrayClean;

// consider how to extract just the [3] position of each array that is bigger than 20
// and then count how many there are.

var largeStationList = _.filter (data, function(arr){
  for (i=0; i < data.length; i++){
  if (arr[3] > 20) {
    return arr
    }
  console.log(arr)
}
}
)// the console in the html returns 20


var largeStationCount = _.countBy (data, function(arr) {
  for (i=0; i < data.length; i++){
  return arr[3] > 20 ? 'yes': 'no';
}})//the console in the html returns yes 20, no 53


//_.arraysEqual
