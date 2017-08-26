# CSS

包含块。margin 折叠。

flex
```css
main {
  display: flex | inline-flex;
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  flex-flow: flex-direction || flex-wrap;
  justify-content: flex-start | flex-end | space-between | space-evenly | space-around | center;
  align-items: flex-start | flex-end | baseline | center | stretch;
  order: 1;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 1;
  flex: flex-grow || flex-shrink || flex-basis;
  align-self: auto;
}
```    

grid    

```css
main {
  display: grid | inline-grid | subgrid;
  grid-template-rows: 100px 1fr repeat(3, 40px [main-start]);
  grid-template-columns: 100px 1fr minmax(40px, auto);
  grid-template-areas: 
  "hr hr hr hr hr"
  "lr lr lr lr lr";
  grid-auto-columns: 100px;
  grid-auto-rows: 100px;
  grid-auto-flow: row | column || dense;
  grid-template: grid-template-areas grid-template-rows / grid-template-columns;
  grid: 100px;
  align-items: start;
  align-self:center;
  justify-items: stretch;
  justify-self: center;
  order: 1;
  grid-colum-start: 1;
  grid-column-end: 2;
  grid-column: 1/ 2;
  grid-row: 2 / span 2 main-start;
  grid-column-gap:4px;
  grid-row-gap:4px;
  grid-gap: 4px 5px;
  grid-area: 1/2/3/4;
  grid-area: hr;  /* 注意不加引号 */
  justify-content: center;
  align-content: center;
}
```  

media-query    

`<link rel="stylesheet" media="screen and (max-width: 600px)" href="style.css">`    

```css
@media all and (min-width) {

}
```   

```css
@import url(style.css) supports (display:flex) screen;
```    

`width, height, aspect-ratio, device-width, device-height, device-aspect-ration, color, color-index, grid`;

```css
resolution: 109dpi;
orientation: landscape | portrait;
```   

shape-modules    

```css

main {
  float: left;
  shape-outside: basic-shape || shape-box;
  shape-outside: inset(4px round 2px) | circle(5px at center) | ellipse(4px 4px at center) | polygon(10px 10px,20px 20px, 30px 30px);
  shape-margin: 3em;
}
```   

注意 `@import` 应该是除 `@charset` 外的第一个规则。    

```css
main {
  animation: 3s;
  animation-name: haha;
  animation-duration: 3s;
  animation-timing-function: ease;
  animation-delay: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-play-state: running | paused;
  animation-fill-mode: none | forwards | backwards | both;
}
```   

transform

```css
h1 {
  transform: translate() translate3d() translateX() translateY() translateZ()
  rotate() rotate3d() rotateX() rotateY() rotateZ() skew() skewX() skewY()
  perspective(800px) scale() scale3d() scaleX() scaleY() scaleZ();
  transform-origin: center;
  backface-visibility: visible | hidden;
  perspective: 800px;
  perspective-origin: center;
  transform-style: flat | perserve-3d;
}
```    

# Manifest

```json
{
  "name":"123",
  "short_name":"haha",
  "start_url" : "./index.html",
  "icons" : [
    {
      "src" : "index.png",
      "type" : "image/png",
      "sizes": "48*48"
    }
  ],
  "theme_color" : "red",
  "background_color" : "black",
  "display" : "browser, standalone"
}
```    

# Notification

```js

var not = new Notification('haha' {});
not.close();
not.onclick = function() {};
not.onerror = function() {};

var not1= reg.showNotification().then();
reg.getNotifications().then(list)

options = {
  dir: '',
  lang: '',
  icon: '',
  body: '',
  image: '',
  badge: '',
  tag: '',
  data: null,
  viberate,
  actions
}

Notification.requestPermission().then(pe)

Notification.permission= "default, granted, denies"

onnotificationclick = function(e) {
  e.notification,
  e.actions
}
```


内核

chrome webkit blink v8
ff: gecko spiderMonkey
safari: webkit squirrelFish
ie: Trident/EdgeHTML, Chakra

```js

function deepClone(obj) {
  if(!(obj instanceof Object) || obj instanceof Function) {
    return obj;
  }

  var copy ;
  var Constructor = obj.constructor;

  switch(Constructor) {
    case RegExp:
      copy = new Constructor(obj);
      break;
    case Date:
      copy = new Constructor(obj.getTime);
      break;
    default: 
      copy = new Constructor();
  }

  for(var prop in obj) {
    copy[prop] = deepClone(prop);
  }
  return copy;
}
```



```js
function extend(deep=true, target, ...objs) {

  var len = objs.length;
  var clone, copy, src;
  if(!(target instanceof Object)) {
    target = {};
  }

  for(var i=0; i <len; i++) {
    if(objs[i] instanceof Object)) {
      for(var prop in objs[i]) {
        copy = objs[i][prop];
        src = target[prop];

        if(copy === target) {
          continue;
        }

        if(deep && cpoy instanceof Object && typeof copy !== 'function') {
          if(Array.isArray(copy)) {
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && src instanceof Object ? src : {};
          }

          target[prop] = extend(deep, src, copy);
        } else {
          target[prop] = copy;
        }
      }
    }
  }

  return target;
}
```     

ES6 modules

```js
import export xx as xxx default
export * from 'xxx';
require es6 import cjs
```    

decorator

```js

function xxx(target) {
  target.haha = '123'
}

@xxx

class {

}

@funcs

funcs(target, name, descriptor) {
  
} 
```   

Generator * yield next throw return yield*

Promise function(resolve, reject) then() catch() Promise.all() Promise.race() Promise.resolve() Promise.reject()   

Class extends super

Number isNaN isFinite EPSILON isInteger isSafeInteger  parseInt parseFloat 

number -> string toFixed toExponential toPrcision

new Proxy()

set(target, name, value, receiver)
get(target, name, receiver)
apply(target, ctx, ...args)
deleteProperty(target, name)
defineProperty(target, name, descriptor)
has(target, prop)
ownKeys(target)
getOwnProperDescriptor(target, name)
preventExtensions(target)
getPrototypeOf(target)
setPrototypeOf(target, proto)
isExtensible(target)
constructor(target,...args)

set,get,has,apply,constructor,deleteProperty, defineProperty ownKeys
getPrototypeOf setPrototypeOf isExtensible preventExtensions, getOwnPropertyDescriptor

async await 

charCodeAt codePointAt at includes() stratsWith endsWith()
repeat() padStart padEnd() 

Array.from() Array.of() copyWithin() fill() find() findIndex()
includes()

Object.is() Object.assign()

in  hasOwnProperty propertyIsEnumerable

keys getOwnPropertyNames getOwnPropertySymbols

getOwnProperytyDescriptor defineProperty


Node Interface

childNodes firseChild lastChild nextSibiling previousSibling
nodeName nodeType nodeValue parentNode ownerDocument parentElement
textContent
appendChild insertBefore cloneNode removeChild contains isSameNode isEqualNode getRootNode hasChildNodes replaceChild children firstElementChild, lastElementChild nextElementSibling previousElementSibling  childElementCount

title domain cookie location URL designMode compatMode
scripts styleSheets images, links embeds plugins forms doctype head
body documentElement characterSet defaultView dir **lastModified**
reayState loading interactive complete

stopPropagation stopImmediatePropagation preventDefault

isTrusted eventPhase target currentTarget timeStamp defaultPrevented
cancelable bubbles type

timer I/O cb idle/prepare poll check close cb

```js
function currying(fn) {
  var args = [];
  return function() {
    if(arguments.length === 0) {
      return fn.apply(this, args)
    } else {
      args.push(...arguments);
      return arguments.callee
    }
  }
}

Function.prototype.uncurry = function() {
  var self = this;
  return function() {
    var ctx = Array.prototype.shift.call(arguments);
    return self.apply(ctx, arguments);
  }
}
```

```js

el.onclick = throttle(listener);

function throttle(fn, interval) {
  var first = true;
  var timer = null;

  return function() {
    var _this = this;
    var args = arguments;
    if(first) {
      first = false;
      fn.apply(_this, arguments);
      return;
    }

    if(timer) {
      return;
    }

    timer = setTimeout(function() {
      clearTimeout(timer);
      fn.apply(_this,args);
    }, interval);
  }
}
```    

protocol + host = origin
host = hostname + port
auth = username + password
path = pathname + search
search = ? + query
hash

Accept Accept-Encoding Accept-Language Accept-Charset
Content-Type Content-Encoding Content-Language
Accept-Ranges Content-Range Range

Origin Access-Control-Request-Method Access-Control-Request-Headers
Access-Control-Max-Age Access-Control-Allow-Origin Access-Control-Allow-Credentials Access-Control-Allow-Methods
Access-Control-Expose-Headers Access-Control-Allow-Headers


fetch(input, init).then((res) => {});

new Request(input, init)

init = {
  body,
  headers,
  method,
  referrer,
  credentials include, omit,same-origin,
  mode,
  cache, redirect, 
}

new Headers()

append() get() set()  has delete

body arrayBuffer() blob() json() text(), formData();

new Response(body, init)

ok, status, statusText

bodyUsed

no-store no-cache min-fresh max-age max-stale only-if-cached no-transform
no-store no-cache public private max-age s-max-age no-transform must-revalidate

X-Frame-Options DENY SAMEORIGIN ALLOW url

multipart/form-data
multipart/byteranges

Content-Type: multipart/form-data; boundary= --sfsfsfsfsfs

Content-Disposition: form-data; name= ; filename= 

Content-Disposition: attachment, inline

Content-Type: multipart/byteranges; boundary=

Content-Type:

100 Continue 101 switching protocols
200 ok 201 created 202 accepted 203 non-authoritative information
204 No content 205 reset content 206 partial content
300 multiple choice
301 move permanently
302 Found 303 see other 304 not modified 307 temporary redirect 308 permanent Redirect

400 bad request 401 Unauthorized 402 payment required 403 forbidden 404 not found
405 method not allowed 406 not accepteable
407 proxy authorization required 408 request timeout 409 conflcit 
410 gone 411 length required

500 internal server error 501 not implemented 502 bad gateway
503 service unavaliable 504 gateway timeout

new WebSocket(url, protocols)

onopen onmessage onclose close send
binarytype arraybuffer blob bufferedAmount url protocol
readyState