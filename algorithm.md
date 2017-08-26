
## 数组

### 1. 在数组中寻找一对和为指定值的元素

**输入：**    

`arr = [8, 7, 2, 5, 3, 1], sum = 10`   

**输出：**   

`Pair found an index 0 and 2`    

两种解法，第一种就是里外两重循环，一个一个的找，效率太低，略过。     

解法2：   

```js
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
```   

### 2. 打印出所有和为0的子数组   

**输入：**   

`arr = [4, 2, -3, -1, 0, 4]`   

**输出：**   

`sub-arrays with 0 sum are: [-3, -1, 0, 4], [0]`   

解法：   

```js
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
```   

使用一个统计当前前 n 个元素的和的数组，如果之后出现了一个和已经在数组中出现过，说明有一个和为0的子数组出现。    

同理，可以扩展到和为指定值的情况：   

```js
function printAllSubarrays2(arr, n) {
  // 先推入一个0是防止开头元素就是0
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
```    

### 3. 寻找一个数组中有相等数量0和1的最长的子数组   

**输入：**   

`arr= [0,0,1,0,1,0,0]`   

**输出：**    

`Largest subarray is [0,1,0,1] or [1,0,1,0]`   

这个问题的解法与上题类似，我们首先将数组中的 0 替换为 -1，则问题就转换成了寻找最长的和为0的子数组了。    

略。    


### 4. 将数组中所有0移到末尾

有一点要注意的是需要保持元素在原数组中的顺序。     

```js
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
```   

### 5. 最大和子数组问题

使用 Kadane 算法，也属于动态规划的一种。   