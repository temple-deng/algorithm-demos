// 插入排序——升序
function insertionSort(arr) {
  const len = arr.length;
  for(let i = 1; i < len; i++) {
    let preIndex = i - 1;
    let current = arr[i];
    while(preIndex >= 0 && current < arr[preIndex]) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

// 插入排序——降序

function insertionSort2(arr) {
  const len = arr.length;
  for(let i = 1; i < len; i++) {
    let preIndex = i -1;
    let current = arr[i];
    while(preIndex >= 0 && current > arr[preIndex]) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

var arr = [5,2,4,6,1,3];

console.log(insertionSort(arr));
console.log(insertionSort2(arr));



// 合并排序
function mergeSort(arr) {
  let len = arr.length;

  // 如果问题足够小，直接求解
  if(len === 1) {
    return arr;
  }

  // 否则将问题对半分
  var midIndex = Math.floor(len/2);
  var left = arr.slice(0, midIndex);
  var right = arr.slice(midIndex);

  // 返回子问题合并值
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var arr = [];

  while(left.length > 0 && right.length > 0) {
    if(left[0] <= right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  if (left.length > 0) {
    arr = arr.concat(left);
  } else {
    arr = arr.concat(right);
  }

  return arr;
}

var arr1 = [4,1,3,7,5,8];

console.log(mergeSort(arr1));

var arr2 = [16,4,10,14,7,9,3,2,8,1];


// 保持最大堆特性
function maxHeapify(arr, i) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var len = arr.length;
  var largest;
  if(left < len && arr[left] > arr[i]) {
    largest = left;
  } else {
    largest = i;
  }

  if(right < len && arr[right] > arr[largest]) {
    largest = right;
  }

  if(largest !== i) {
    var temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;

    maxHeapify(arr, largest)
  }
}

maxHeapify(arr2, 1);

console.log(arr2);


// 快排
function quickSort(arr) {
  var len = arr.length;
  if(len <= 1) {
    return arr;
  }


  // 其实也是分治法的一种实现吧，和合并排序很像
  // 不同的是合并排序是直接对半分
  // 快排是先找个中间元素划分
  var key = arr[0];
  var lt = [], gt = [];
  for(let i = 1; i < len; i++) {
    if( arr[i] <= key) {
      lt.push(arr[i]);
    } else {
      gt.push(arr[i]);
    }
  }

  return quickSort(lt).concat(key).concat(quickSort(gt));
}

var arr3 = [4,1,5,3,8,2];

console.log(quickSort(arr3));


// 建堆

function buildMaxHeap(arr) {
  var len = arr.length;

  // 从最后一个非叶节点开始构建堆
  for(var i = Math.floor(len/2) - 1; i >= 0; i--) {
    maxHeapify(arr, i);
  }
}

var arr4= [4,1,3,2,16,9,10,14,8,7];

buildMaxHeap(arr4);
console.log(arr4);


// 堆排序
function heapSort(arr) {
  buildMaxHeap(arr);
  var len = arr.length;
  var sortedArr = new Array(len);
  for(var i = len-1; i >= 1; i--) {
    sortedArr[i] = arr[0];
    arr[0] = arr[i];
    arr.length--;

    maxHeapify(arr, 0);
  }

  sortedArr[0]= arr[0];
  return sortedArr;
}

console.log(heapSort(arr4));


// 这里 left, right 都是索引
function quickSort2(arr, left, right) {
  if(left === right) {
    return;
  }

  var keyIndex = partition(arr, left, right);
  quickSort2(arr, left, keyIndex-1);
  quickSort2(arr, keyIndex + 1, right);
  return arr;
}


function partition(arr, left, right) {
  var key = arr[right];
  var i = left;
  var j = right -1;

  while(i < j){
    while(arr[i] <= key) {
      i++;
    }

    while(arr[j] > key) {
      j--;
    }

    if( i < j) {
      var temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
      i++;
      j--;
    }
  }

  var temp = arr[right];
  arr[right] = arr[i];
  arr[i] = temp;
  return i;
}

var arr5 = [1,4,2,9,6,11,5];

console.log(quickSort2(arr5,0,arr5.length-1));


// 二叉查找树的搜索
function treeSearch(x,k) {
  if(x == null || x.key === k) {
    return x;
  }

  if(x.key < k) {
    return treeSearch(x.left, k)
  } else {
    return treeSearch(x.right, k)
  }
}

// 迭代版本的搜索
function treeSearch2(x, k) {
  while(x != null && x.key !=k) {
    if(x.key < k) {
      x = x.left;
    } else {
      x = x.right;
    }
  }

  return x;
}

// 递归版本
function treeMaximun(x) {
  if(x.right != null) {
    return treeMaximun(x);
  } else {
    return x;
  }
}

// 迭代
function treeMaximun2(x) {
  while (x.right != null) {
    x = x.right;
  }
  return x;
}

// 递归
function treeMinimun(x) {
  if (x.left != null) {
    return treeMaximun(x);
  } else {
    return x;
  }
}

// 迭代
function treeMinimun2(x) {
  while(x.left != null) {
    x = x.left;
  }
  return x;
}

// 二叉树插入
function treeInsert(t, z) {
  var par = null;
  var child = t.root;

  // 空树的情况
  if(child == null) {
    t.root = z;
    return;
  }

  while(child != null) {
    par = child;
    if(child.key < z.key) {
      child = child.right;
    } else {
      child = child.left
    }
  }

  if (par.key <= z.key) {
    par.right = z;
  } else {
    par.left = z;
  }
}

// a [ [time, time, time], [time, time, time] ]
// t [ [time, time ], [time, time]]  注意子数组的长度要比 a 少1
// e [ time, time ]
// x [ time, time ]
// n length == a[0].length == a[1].length
function fastestWay(a, t, e, x, n) {
  var f0=[], f1=[];

  f0[0] = e[0] + a[0][0];
  f1[0] = e[1] + a[1][0];   

  var lineStation = [];

  for(var i = 1; i < n; i++) {

    if(f0[i-1] + a[0][i] <= f1[i-1] + t[1][i-1] + a[0][i]) {
      f0[i] = f0[i - 1] + a[0][i];
    } else {
      f0[i] = f1[i - 1] + t[1][i - 1] + a[0][i];
    }

    if (f1[i - 1] + a[1][i] <= f0[i - 1] + t[0][i - 1] + a[1][i]) {
      f1[i] = f1[i - 1] + a[1][i];
    } else {
      f1[i] = f0[i - 1] + t[0][i - 1] + a[1][i];
    }
  }


  var fMin = Math.min(f0[n - 1] + x[0], f1[n - 1] + x[1]);

  console.log('Min Time is ' + fMin + '\n');
}

var a = [
  [7, 9, 3, 4, 8, 4],
  [8, 5, 6, 4, 5, 7]
];

var e = [2, 4];
var x = [3, 2];
var t = [
  [2, 3, 1, 3, 4],
  [2, 1, 2, 2, 1]
]

fastestWay(a, t, e, x, 6);

function lcs(str1, str2) {
  var len1 = (' ' + str1).length ;
  var len2 = (' ' + str2).length ;
  var lcs = '';
  var c = [];
  for(let i=0; i< len1; i++) {
    c.push(new Array(len2));
  }

  for(let i=0; i<len1; i++) {
    c[i][0] = 0;
  }

  for(let j=0; j<len2;j++) {
    c[0][j] = 0;
  }

  for(var i=1; i < len1; i++) {
    var added = false;
    for(var j=1; j < len2; j++) {
      if(str1[i] === str2[j]) {
          c[i][j] = c[i-1][j-1] + 1;
      } else {
          if(c[i-1][j] >= c[i][j-1]) {
            c[i][j] = c[i-1][j];
          } else {
            c[i][j] = c[i][j-1];
          }
      }
    }
  }

  console.log(c[i-1][j-1] + lcs);
}

lcs('abcbdab', 'bdcaba');
