/* =====================
# Lab 1, Part 1 — Function Review
===================== */

/* =====================
Instructions: "Write a function that adds one to the number provided"
Example: "plusOne(2) should return 3"
===================== */
/* =====================
   var f = function(num1) {
     var ff= function (num2){
       return num1+num2
     }
   }
  f(1)(2)
  ===================== */






var plusOne = function(num) {
  if(typeof num ==='number'){
    return num = num + 1
  }
};

console.log('plusOne success:', plusOne(99) === 100);

/* =====================
Instructions: "Write a function, age, that takes a birth year and returns an age in years."
(Let's just assume this person was born January 1 at 12:01 AM)
Example: "age(2000) should return 18"
===================== */

var age = function(birth) {
  if (typeof birth === 'number') {
    return birth = 2017-birth
  }
};

console.log('age success:', age(1971) === 46);

/* =====================
Instructions: "Write a function that returns true for numbers over 9000 and false otherwise"
Example: "over9000(22) should return false"
===================== */

var over9000 = function(num) {
  if (num > 9000){
    return true
  } else{
    return false
  }
};

console.log('over9000 success:', over9000(9001) === true && over9000(12) === false);

/* =====================
Instructions: "Write a function that returns the value of an object at a specified key"
Example: "valueAtKey({'name': 'Nathan'}, 'name') should return 'Nathan'"
===================== */

var valueAtKey = function(key,name) {
  return key[name]
};

console.log('valueAtKey success:', valueAtKey({'foo': 'bar'}, 'foo') === 'bar');

/* =====================
Instructions: "Write a function which returns the y coordinate of a line given m, x, and b"
Example: "y(0, 0, 0) should return 0; y(1, 1, 1) should return 2"
Remember: The standard mathematical expression for such a function is y=mx+b
===================== */

var y = function(a,b,c) {
  return a*b+c
};

console.log('y success:', y(12, 1, 12) === 24);

/* =====================
Instructions: "Write a function which counts the number of times a value occurs in an array "
Example: "countItem(['a', 'b', 'a'], 'a') should return 2"
===================== */

var countItem = function(num,x) {
  count = 0
  for (var i = 0; i < num.length; i++) {
      if (num[i] === x){
        count = count + 1
      }
    } return count
};

console.log('countItem success:', countItem([1, 2, 3, 4, 5, 4, 4], 4) === 3);
