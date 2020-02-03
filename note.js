for (var i = 0; i <= schools.length; i++) {
  debugger
}

var sum = function(num, num2) {
  console.log(arguments)
  return num+num2
}

var addOne = function (num){return num+1 }

/////////////////////////

var returnAddFunction = function(num1) {
  var theFunction = function(num2){
    return num1 + num2
  }
  return theFunction
}
//returnAddFunction returns a FUNCTION

var plus5 = returnAddFunction(5)
returnAddFuction(5)(2) //<==> plus5(2)

////////////////////////////
var fmap = function(arr, func) {
  var holder = []
  for (i = 0; i < arr.length; i++) {
    holder.push(func(arr[i]))
  }
  return holder
}

var timestwo = function(num) {return num*2}

mylist = [1, 2, 3]
for (i = 0; i < mylist.length; i++){
  if (mylist[i]%2 ==0) {
    holder.push(mylist[i])
  }
}

var isEven = function(num) {
  return num%2 == 0
}

mylist = [1, 2, 3]
var fitler = function(arr, pred){
  var holder = []
  for (var i = 0; i < arr.length; i++){
    if (pred(arr[i])) {holder.push(arr[i])}
  }
  return holder
}

var alwaysTrue = function() {return true}

var doAthingNTimes = function (athing, N) {
  for (i = 0; i < n; i++) {
    console.log(athing())
  }
}

modifyA = function(){return 2}

//_.each: not returning an array, just do something e.g. _.each = ([1,2,3], timestwo) still returns [1,2,3]
//_.map: return an array e.g. _.map = ([1,2,3], timestwo)  returns [2, 4, 6]
_.reduce // produce an end product



//underscorejs.org/#collections
