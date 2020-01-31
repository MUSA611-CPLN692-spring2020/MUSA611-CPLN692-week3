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

bikeCount = function(numBikes){  return numBikes > 20;};

var largeStationList = _.filter(bikeArrayClean, bikeCount(num){  return num > 20;});

console.log(largeStationList);

var largeStationCount;
