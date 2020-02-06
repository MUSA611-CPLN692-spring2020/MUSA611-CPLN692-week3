// insert a break point for you
debugger
// in chrome open cosnole enter i
// you can control it in the sources window

//console log arguments
var sum = function (num, num2){
  console.log(arguments)
  return num+num2
}

//doesn't work
var addOne = function (num) {return num+ 1}
addOne (1)(2)

//does work
var returnAddFunction  = function(num1) {
  var theFunction = function (num2){
    return num1+num2
  }
    return theFunction
}

returnAddFunction(5)(2)

var add5 = returnAddFunction(5)
add5(2)

// using f map
var fmap= function(arr,func){
  var holder = [];
  for(i = 0; i<arr.length; i++){
    holder.push(func(arr[i]))
  }
  return holder
}

var timestwo = function (num) {return 2*num}

fmap([1,2,3,4,5],timestwo)

//**********  filtering using f map logic
    mylist = [1,2,3]
    holder =[]
    for (i=0; i < mylist.length; i++){
      if(mylist[i]%2==0){
        holder.push(mylist[i])
      }
    }

       //returns 2
    holder

      //but rather
    var isEven = function (num){
      return num % 2 == 0
    }
    // returns true / false
    isEven(3)

    var filter = function (arr, pred){
      var holder = [];
      for (var i = 0; i < arr.length ; i++){
        //pred function will measure whether the condition is satisfied
        if (pred (arr[i])){holder.push(arr[i])}
      }
      return holder
    }

filter (mylist, isEven)

//

[5]==[5] // it will return false

5 == 5 // it will return true

// inline function  return 4
(function(){return 4})()

//
_.each([1,2,3],alert);
_.map([1,2,3],alert)

// underscorejs.org
