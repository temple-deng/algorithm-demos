# 2. 算法入门

## 2.1 插入排序

插入排序是原地排序的。    

```js
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
```    

**循环不变式**       

循环不变式主要用来帮助我们理解算法的正确性。对于循环不变式，必须证明它的三性质：   

+ **初始化：**它在循环的第一轮迭代开始之前，应该是正确的。
+ **保持：**如果在循环的某一次迭代开始之前它是正确的，那么，在下一次迭代开始之前，它应该保持正确。
+ **终止：**当循环结束时，不变式给了我们一个有用的性质，它有助于表明算法是正确的。    

## 2.2 算法设计

### 2.3.1 分治法

有很多算法在结构上是递归的：为了解决一个给定的问题，算法要一次或多次地递归调用自身来解决相关的子问题。这些算法通常采用**分治**策略：将原问题划分成 n 个规模较小得让结构与原问题相似的子问题；递归地解决这些子问题，然后再合并其结果，就得到原问题的解。    

注意一下分治法与动态规划的区别：分治是把大问题分解为结构相似的子问题，然后将子问题逐步合并得出最终解。动态规划则是充分利用之前解出的子问题的值还避免重复的计算某些子问题。    

分治模式在每一层递归上都有三个步骤：   

+ **分解(Divide)：**将原问题分解为一系列子问题
+ **解决(Conquer)：**递归地解各子问题。若子问题足够小，则直接求解
+ **合并(Combine)：**将子问题的结果合并成原问题的解    

合并排序算法完全依照了上述模式，直观地操作如下：   

+ 分解：将 n 个元素分成各包含 n/2 个元素的子序列
+ 解决：用合并排序法对两个子序列递归地排序
+ 合并：合并两个已排序的子序列以得到排序结果    

# 6. 推排序

像合并排序而不像插入排序，堆排序的运行时间为 O(nlgn)，像插入排序而不像合并排序，堆排序是一种原地排序的算法，在任何时间，数组中只有
常数个元素存储在输入数组外。这样，堆排序就能将两种排序算法的优点结合起来。    

## 6.1 堆

（二叉）堆数据结构是一种数组对象，它可以被视为一颗完全二叉树。树中的每个节点与数组中存放该节点值的那个元素对应。树的每一层都是填满的，最后一层可能除外。假设
树根的下标为0，则给定一个节点的下标 i，其父节点，左右子节点的下标计算方式如下：   

+ 父节点：貌似需要看 i 是奇数还是偶数，偶数的话就是 `i/2 -1`，奇数就是 `Math.floor(i/2)`。   
+ 左子节点：`2i+1`。
+ 右子节点：`2(i+1)`。   

堆可以被看成是一颗树，结点在堆中的高度定义为本结点到叶子的最长简单下降路径上边的数目；定义堆的高度为树根的高度。    

具有 n 个元素的堆是基于一颗完全二叉树的，其高度为 `Math.floor(lgn)`。一个高度为 h 的堆，最多包含 <samp>(2<sup>h+1</sup> - 1)</samp> 个元素，最少包含 <samp>2<sup>h</sup><samp> 个元素。因此当用数组表示
存储了 n 个元素的堆时，叶子节点的下标为 `Math.floor(n/2)`。     


二叉堆有两种：最大堆和最小堆。最大堆的特点是某个节点的值至多和其父节点一样大。堆中的最大元素就是根节点。最小堆的特点则相反。     

在堆排序算法中，我们使用的是最大堆。最小堆通常在构造优先级队列时使用。   

## 6.2 保持堆的性质

`maxHeadpify()` 是对最大堆进行操作的重要的子程序。其输入为一个数组 `arr` 及下标 `i`，当这个函数被调用时，我们假定以 left(i) 和 right(i)
为根的两颗二叉树都是最大堆，但这时 `arr[i]` 可能小于其子女，这就违反了最大堆的性质。这个方法的目的就是让 `arr[i]` 在堆中“下降”，使以 `i` 为根
的子树成为最大堆。    

```js
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

    maxHeapify(arr, largest);
  }
}
```   

首先，我们需要从 `arr[i]`, `arr[left]`, `arr[right]` 这3个元素中找出最大值，然后将其下标存到 `largest`中，如果 `largest == i` 那么本身已是
最大堆，程序结束，而如果不是的话，需要在交换位置重新处理以 `largest` 为根的堆。     

## 6.3 建堆

我们可以由底向上地用 `maxHeapify` 来将一个数组变成一个最大堆。由于 `arr[Math.floor(n/2)....n]` 都是叶子节点，因此都可视为一个元素的堆，所以
我们只要从最后一个非叶节点开始调用 `maxHeapify` 来构建最大堆即可。     

```js
function buildMaxHeap(arr) {
  var len = arr.length;

  // 从最后一个非叶节点开始构建堆
  for(var i = Math.floor(len/2) - 1; i >= 0; i--) {
    maxHeapify(arr, i);
  }
}
```    

## 6.4 堆排序

首先我们使用 `buildMaxHeap` 方法将数组转换为最大堆，那么最大的元素肯定在 `arr[0]` 处，那么我们可以将其与 `arr[n-1]` 即末尾的元素
互换位置，那么现在最大的元素就已经处在正确的位置。之后呢，我们需要对数组前 `n-1` 元素进行 `maxHeapify()` 来维持最大堆的特性，之后呢
继续把最大元素换到后面，依次类推。    

```js
function heapSort(arr) {
  buildMaxHeap(arr);
  var len = arr.length;
  var sortedArr = [];
  for(var i = len-1; i >= 1; i--) {
    sortedArr.unshift(arr[0]);
    arr[0] = arr[i];
    arr.length--;

    maxHeapify(arr, 0);
  }

  sortedArr.unshift(arr[0]);
  return sortedArr;
}
```   

但是注意一点的是，在 JS 中我们无法只针对数组的部分元素来调用 `maxHeapify()` 方法，但是像上面这样用另外一个数组保存已排序元素的话，又好像不符合原地排序的要求，除非连带修改 `maxHeapify` 函数增加一个表示在堆内元素的数量。          

## 6.5 优先级队列

优先级队列是一种用来维护一组元素构成的集合 S的数据结构。这一组元素中的每一个都有一个关键字 key。一个最大优先级队列支持一下操作：   

+ `insert(S, x)`: 把元素 x 插入到集合 S。
+ `maximum(S)`: 返回 S中具有最大关键字的元素。
+ `extractMax(S)`: 去掉并返回 S 中具有最大关键字的元素。 
+ `increaseKey(S, x, k)`: 将元素 x 的关键字增加到 k，这里的 k 不能小于 x 原关键字的值。    

这里我们用堆来实现一个优先级队列。    

看样子这里我们假设已经用堆实现好了最大优先级队列，剩下的只是实现上面的几个操作了。      

`maximum` 的实现：

```js
function heapMaximun(arr) {
  return arr[0];
}
```    

`extract-max` 的实现：   

```js
function HeapExtractMax(arr) {
  var max = arr.shift();
  maxHeapify(arr, 0);
  return max;
}
```    

剩下的先略。     

## 12. 二叉查找树

### 12.1 二叉查找树

二叉查找树中关键字的存储方式总是满足以下的二叉查找树的行呢：   

设 x 为二叉查找树中的一个结点。如果 y 是 x 的左子树中的一个结点，key[y] <= key[x]，如果 y 是 x 的右子树中的一个结点，则 key[y] >= key[x]。    

根据二叉查找树的性质，可以用一个递归算法按排列顺序输出树中的所有关键字。这种算法称为中序遍历算法，因为一子树根的关键字在输出时介于左子树和右子树的关键字之间（类似地，前序遍历中根的关键字在其左右子树中的关键字之前输出，而后序遍历中根的关键字在其左右子树中的关键字之后输出。     

### 12.2 查询二叉查找树

**查找的实现：**给定指向树根的指针和关键字 k，函数 `treeSearch()` 返回包含关键字 k 的结点的指针，如果不存在的话返回 `null`。     

```js
function treeSearch(x,k) {
  if(x == null || x.key === k) {
    return x;
  }

  if(x.key < k) {
    treeSearch(x.left, k)
  } else {
    treeSearch(x.right, k)
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
}
```   

**最大关键字元素和最小关键字元素：**    

```js
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
```    

### 12.3 插入和删除

**插入：**   

```js
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
```    

删除就略了，有点麻烦。    


## 13. 红黑树

### 13.1 红黑树的性质

红黑树是一种二叉查找树，但在每个节点上增加一个存储位表示节点的颜色，可以是 RED 或 BLACK。通过对于任何一条从根到叶子的路径上各个节点着色方式的限制，红黑树确保没有一条路径会比其他路径长出两倍，因而是接近平衡的。    

树中每个节点包含五个域：`color, key, parent, left, right`。如果某节点没有一个字节点或父节点，则节点对应指针为 `null`。我们把这个 `null` 视为二叉查找树的外节点的指针，而把带关键字的节点视为树的内结点。    

一颗二叉查找树如果满足下面的红黑形状，则为一颗红黑树：    

1. 每个节点或是红的，或是黑的。
2. 根节点是黑的。
3. 每个叶节点是黑的。（注：这里的叶节点指的是那些为 `null` 的空叶结点）
4. 如果一个结点是红的，则它的两个儿子都是黑的。
5. 对每个结点，从该结点到其子孙结点的所有路径上包含相同数目的黑节点。    

先略。     


## 15. 动态规划

和分治法一样，动态规划是通过组合子问题的解而解决整个问题的，分治法是将问题划分成一些独立的子问题，递归地求解各子问题，然后合并子问题的解而得到原问题的解。与此不同，动态规划适用于子问题不是独立的情况，也就是各子问题包含公共的子子问题。在这种情况下，分治法会做许多不必要的工作，即重复地求解公共的子子问题。动态规划对子子问题只求解一次，将其结果保存在一张表中，从而避免每次遇到子子问题都重新计算答案。   

动态规划通常应用于最优化问题。此类问题可能有多种可行解。每个解有一个值，而我们希望找出一个具有最优（最大或最小）值的解。称这样的解为该问题的“一个”最优解，因为可能存在多个取最优解的值。    

动态规划算法的设计可以分为如下4个步骤：   

1. 描述最优解的结构
2. 递归定义最优解的值
3. 按自底向上的方式计算出最优解的值
4. 由计算出的结果构造一个最优解    


### 15.1 装配线调度问题

一家汽车公司在有两条装配线的工厂内生成汽车。一个汽车底盘在进入每一条装配线后，在一些装配站中会在底盘上安装部件，然后，完成的汽车在装配线的末端离开。每一条装配线上有 n 个装配站，编号为 j=1,2, ..., n。装配线 i(i 为1 或2)的第 j 个装配站表示为 S<sub>i,j</sub>。装配线 1的第 j 个站与装配线 2 的第 j 个站执行相同的功能。然而，这些装配站是在不同的时间建造的，并且采用了不同的技术，因此，每个站上所需的时间是不同的，即使是在两条不同装配线上相同位置的装配站。我们把在装配站 S<sub>i,j</sub> 所需的装配时间记为 a<sub>i,j</sub>。底盘进入装配线 i 的进入时间为 e<sub>i</sub>，装配完从装配线 i 离开的时间为 x<sub>i</sub>。   

在正常情况下，一旦一个底盘进入一条装配线后，它只会经过该条装配线。在相同的装配线中，从一个装配站到下一个装配站的时间可以忽略。偶尔会来一个特别急的订单，要求尽快地制造汽车。这时，经理可能会将部分完成的汽车从任何装配站上从一条装配线上移到另一条装配线上。把已经经过装配站 S<sub>i,j</sub>的底盘从装配线 i 移走的时间为 t<sub>i,j</t>。**问题是要确定在装配线1内选择哪些站及在装配线2内选择哪些站，以使汽车通过工厂的总时间最小。**    


**步骤1：通过工厂最快路线的结构**    

对于装配线调度问题，可以如下执行。考虑底盘从起点到装配站 S<sub>1,j</sub> 的最快可能路线。如果 j=1,则底盘能走到只有一条线，所以很容易确定。对于 j=2,3,...,n，则有两种选择：这个底盘可能从装配站 S<sub>1, j-1</sub> 直接运到 S<sub>i,j</sub>。或者这个底盘从 S<sub>2,j-1</sub> 运到 S<sub>1,j</sub>，这时会花费额外的移动时间 t<sub>2,j-1</sub>。   

首先，假设通过装配站 S<sub>1,j</sub> 的最快路线通过了装配站 S<sub>1,j-1</sub>。关键的一点是这个底盘必定利用了最快的路线从开始点到装配站 S<sub>1,j-1</sub>。如果不是这样的话，就形成了矛盾，因为如果存在另一条最快的路线，我们就可以采用另一条路线。    

类似地，假设通过装配站 S<sub>1,j</sub> 的最快路线通过的是装配站 S<sub>2,j-1</sub>。则这个底盘必定利用了最快的路线从开始点到装配站 S<sub>2,j-1</sub>的。    

更一般地，对于装配线调度问题，一个问题的（找出通过装配站 S<sub>i,j</sub>的最快路线）的最优解包含了子问题（找出通过 S<sub>1,j-1</sub> 或 S<sub>2,j-1</sub>的一个最快路线）的一个最优解。我们称这个性质为最优子结构，也就说是一个问题拥有最优子结构。   

**步骤2：一个递归解**    

在动态规划方法中，第二个步骤是利用子问题的最优解来递归定义一个最优解的值。对于装配线的调度问题，我们选择在两条装配线上通过装配站 j的最快路线问题来作为子问题。令 f<sub>i</sub>[j] 表示一个底盘从起点到装配站 S<sub>i,j</sub>的最快可能时间。    

我们的最终目标是确定底盘通过工厂的所有路线的最快时间，记为 f*。    

f* = min(f<sub>1</sub>[n] + x<sub>1</sub>, f<sub>2</sub>[n] + x2);      

要对 f<sub>1</sub>[1] 和 f<sub>2</sub>[1] 进行推理也很容易：    

f<sub>1</sub>[1] = e<sub>1</sub> + a<sub>1,1</sub>   

f<sub>2</sub>[1] = e<sub>2</sub> + a<sub>2,1</sub>     

现在考虑如何计算 f<sub>i</sub>[j]。先来看f<sub>1</sub>[j]，前面说过，通过装配站 S<sub>1,j</sub> 的最快路线或是通过装配站 S<sub>1,j-1</sub> 的最快路线，然后移到站 S<sub>1,j</sub>，或是通过装配站 S<sub>2, j-1</sub> 的最快路线，再经由 t<sub>2,j-1</sub>的时间。    

在第一种情况中有 f<sub>1</sub>[j] = f<sub>1</sub>[j-1] + a<sub>1, j</sub>。在第二种情况中
有 f<sub>1</sub>[j] = f<sub>2</sub>[j-1] + a<sub>1, j</sub>。所以有：    

f<sub>1</sub>[j] = min(f<sub>1</sub>[j-1] + a<sub>1, j</sub>, f<sub>2</sub>[j-1] + a<sub>1, j</sub>)。    

再加上 j =1 的情形有：   

![dp2](DP2.png)    

f<sub>i</sub>[j] 的值就是子问题最优解的值。    


```js
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
```    

步骤3,4 已经包含在算法里了。    



### 15.3 动态规划基础

采用动态规划方法的最优化问题包含两个要素：最优子结构和重叠子问题。     

动态规划以自底向上的方式来利用最优子结构。也就是说，首先找到子问题的最优解，解决子问题，然后找到问题的一个最优解。寻找问题的一个最优解需要在子问题中做出选择，即选择将用哪一个来求解问题。问题解的代价通常是子问题的代价加上选择本身的开销。例如，在装配线调度问题中，首先要解决寻找通过装配站 S<sub>1, j-1</sub>，或 S<sub>2, j-1</sub> 的最快路线这一子问题，然后，选择其中的一个装配站作为装配站 S<sub>i, j</sub> 的前一站。选择本身带来的开销依赖与是否在装配站之间切换装配线。    

### 15.4 最长公共子序列

**步骤1：描述一个最长公共子序列**   

LCS 问题的最优子结构：设 X = [x<sub>1</sub>, x<sub>2</sub>,....., x<sub>m</sub>] 和 Y = [y<sub>1</sub>, y<sub>2</sub>,...., y<sub>n</sub>] 为两个序列，并设 Z = [ z<sub>1</sub>,
z<sub>2</sub>, ... , z<sub>k</sub>] 为 X 和 Y 的一个任意 LCS。   

1. 如果 x<sub>m</sub> = y<sub>n</sub>，则 z<sub>k</sub> = x<sub>m</sub> = y<sub>n</sub>，并且 Z-1 为 X<sub>m-1</sub> 和 Y<sub>n-1</sub> 的一个 LCS。
2. 如果 x<sub>m</sub> ≠ y<sub>n</sub>，则 z<sub>k</sub> ≠ x<sub>m</sub>，且 Z<sub>k</sub>
为 X<sub>m-1</sub> 和 Y<sub>n</sub> 的一个 LCS
3. 如果 x<sub>m</sub> ≠ y<sub>n</sub>，则 z<sub>k</sub> ≠ y<sub>n</sub>，且 Z<sub>k</sub>
为 X<sub>m</sub> 和 Y<sub>n-1</sub> 的一个 LCS    

**步骤2：一个递归解**    

定义 c[i,j] 为序列 X<sub>i</sub> 和 Y<sub>j</sub> 的一个 LCS 的长度。则可能递归式：      

![LCS](LCS.png)     

