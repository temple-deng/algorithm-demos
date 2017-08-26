var arr = [8, 7, 2, 5, 3, 1];
var sum = 10;

function findPair(arr, sum) {
  let len = arr.length;

  for(let i = 0; i < len -1;i++) {
    var left = sum - arr[i];
    var index = arr.indexOf(left, i+1);
    if(index) {
      console.log(`Pair found at index ${i} and ${index}`);
      return;
    }
  }
  console.log('Pair not found');
}


findPair(arr, sum);

function printAllSubarrays(arr) {
  // 先推入一个0是防止开头元素就是0
  var sumArr = [0];
  var subarrays = [];
  var sum = 0;

  for(var i = 0; i< arr.length; i++) {
    sum = sum + arr[i];
    var index = 0 ;

    while ((index = sumArr.indexOf(sum, index)) !== -1 && index <= i) {
      subarrays.push(arr.slice(index, i + 1));
      index++;
    }
    sumArr.push(sum);
  }


  if(subarrays.length !==0) {
    console.log(`sub-arrays with 0 sum are: ${subarrays}`);
  } else {
    console.log('no such sub-arrays');
  }
}

printAllSubarrays([0,1,0,3,-3]);

function printAllSubarrays2(arr, n) {
  // 先推入一个n是防止开头元素就是n
  var sumArr = [n];
  var subarrays = [];
  var sum = 0;

  for (var i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
    var index = 0;

    while ((index = sumArr.indexOf(sum - n, index)) !== -1 && index <= i) {
      subarrays.push(arr.slice(index, i + 1));
      index++;
    }
    sumArr.push(sum);
  }


  if (subarrays.length !== 0) {
    console.log(`sub-arrays with 0 sum are: ${subarrays}`);
  } else {
    console.log('no such sub-arrays');
  }
}

printAllSubarrays2([5,6,-5,5,3,5,3,-2,0], 8)


function printAllSubarrays3(arr) {
  // 先推入一个0是防止开头元素就是0
  var sumArr = [0];
  var subarrays = [];
  var sum = 0;
  var arr1 = arr.map(function(v) {
    return v ===  0 ? -1 : 1;
  });

  for (var i = 0; i < arr1.length; i++) {
    sum = sum + arr1[i];
    var index = 0;

    while ((index = sumArr.indexOf(sum, index)) !== -1 && index <= i) {
      subarrays.push(arr1.slice(index, i + 1));
      index++;
    }
    sumArr.push(sum);
  }

  var lenArr = [];

  subarrays.forEach(function(v, i) {
    lenArr.push(v.length);
  });

  var maxLen = Math.max(...lenArr);

  var index = lenArr.indexOf(maxLen);


  if (subarrays.length !== 0) {
    // 注意这个还有点问题，数组中的 -1 还没有替换为0
    console.log(`Largest subarray is ${subarrays[index]}`);
  } else {
    console.log('no such sub-arrays');
  }
}


printAllSubarrays3([0,0,1,0,1,0,0]);


function moveZeroToEnd(arr) {
  var i=arr.length -1;
  var j=arr.length -1;

  while(i >=0 && j >= 0) {
    while(arr[i] !== 0 && i >= 0) {
      i--;
    }

    while(arr[j] === 0) {
      j--;
    }

    if( i < j && i >=0) {
      for(var k=i; k < j; k++) {
        arr[k] = arr[k+1];
      }
      arr[j] = 0;
      i--;
      j--;
    }
  }
  console.log(arr);
}

moveZeroToEnd([6,0,8,2,3,0,4,0,1])

function kadane(arr) {
  var globalMax = 0;
  var localMax = 0;
  var start = 0, end;

  for(var i =0; i < len; i++) {
    localMax = localMax + arr[i];
    if(localMax > arr[i]) {
      end = i;
    } else {
      start = i;
    }
    globalMax = Math.max(globalMax, localMax);
  }
}

function fibonacci(n) {
  if(n === 0) {
    return 0;
  } else if(n=== 1) {
    return 1;
  } else {
    return fibonacci(n-1) + fibonacci(n-2);
  }
}



var map = {};

// 动态规划解法，避免重复解决子问题
// 但是严格的说来，貌似也不算动态规划，毕竟并不是说具有最优子结构
function fibonacciDP(n) {
  if(n === 0) {
    return map[n] = 0;
  } else if(n === 1) {
    return map[n] = 1;
  } else {
    return map[n] = (map[n - 2] !== undefined ? map[n - 2] : fibonacciDP(n - 2)) + (map[n - 1] !== undefined ? map[n - 1] : fibonacciDP(n - 1))
  }
}

console.log(fibonacciDP(10))
console.log(map)

