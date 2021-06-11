# HITBIM Plugin sample

## 소개
이 문서는 HITBIM 앱을 실행하고, 플러그인을 수정하는 과정을 수행하는 것을 통해 HITBIM과 그 플러그인에 대해 이해하도록 하는 것을 목표로 합니다.

## 앱의 설치와 실행

### 요구사항

`Node.js` 가 설치되어 있어야 합니다.

### 앱 설치
`$ git clone https://github.com/hitbim/example_plugins.git `

### node 패키지 설치 및 앱 실행

`$ npm install`
`$ npm start`

## 플러그인을 브라우저에서 확인하는 방법

플러그인은 앱 실행 후 다음 url에서 확인할 수 있습니다.
"http://localhost:3000/plugins/example_1/ex_1.html"

## 플러그인 소스 경로

example_plugins/public/PLUGINS/example_1

## 플러그인 수정 가이드

이 가이드는 주어진 플러그인에 새로운 두 가지 기능을 추가하는 것을 목표로 합니다.

### 새 컬럼 생성 버튼 만들기

1. 먼저 새로운 버튼을 만듭니다.
example_plugins/public/PLUGINS/example_1/templates/sortable.html 
파일 내부에 다음 코드를 추가합니다.

``` 
<div class="align_center">
    <button class="new_col_btn col button button-large button-fill">
        Add New Column
    </button>
</div>
```

2. 위 버튼과 대응되는 이벤트 리스너를 생성합니다.
example_plugins/public/PLUGINS/example_1/js/ex_1.js
파일 내부에 다음 코드를 추가합니다.

```
// Event Listener For HITBIM APP
$B.event({$:'.new_col_btn', on:'click'}, function(){

  console.log('make new colomn button is working')

});

```

브라우저 상에서 버튼을 누를 때 마다 로그를 확인할 수 있습니다.

3. 이벤트 리스너의 콜백함수에 기능을 추가하기 위해 코드를 다음과 같이 수정합니다.

```
var list_num = 6;

$B.event({$:'.new_col_btn', on:'click'}, function(){

  let random_num = Math.floor(20 * Math.random());
  list_num = list_num + 1;

  let append_li = '<li>' +
    '  <div class="item-content">' +
    // ion-ionic can be used in hitbim
    '    <div class="item-media"><i class="icon ion-gear-a"></i></div>' +
    '    <div class="item-inner">' +
    `      <div class="item-title"> List item ${list_num} english</div>` +
    `      <div class="item-after"> $${random_num} </div>` +
    '    </div>' +
    '  </div>' +
    '  <div class="sortable-handler"></div>' +
    '</li>';

    // this is append function for HITBIM APP
  $B.append({$:'#list_ul'}, append_li);
});
```

새 컬럼을 생성하는 기능이 완성되었습니다.

### 플러그인 내부에 새 화면 만들기

1. 먼저 새로운 버튼을 만듭니다.
example_plugins/public/PLUGINS/example_1/templates/sortable.html 
파일 내부에 다음 코드를 추가합니다.

``` 
<div class="align_center">
<button class="new_page_btn col button button-large button-fill">
    Go To New Page
</button>
</div>
```

2. 위 버튼과 대응되는 이벤트 리스너를 생성합니다.
example_plugins/public/PLUGINS/example_1/js/ex_1.js
파일 내부에 다음 코드를 추가합니다.

```
// Event Listener For HITBIM APP

$B.event({$:'.new_page_btn', on:'click'}, function(){

  console.log('make new page button is working')

});
```

3. 이벤트 리스너의 콜백함수에 기능을 추가하기 위해 코드를 다음과 같이 수정합니다.

```
$B.event({$:'.new_page_btn', on:'click'}, function(){

    // SETTING FOR NEW INTERNAL PAGE
    var page = {
      page:{
        name: 'new',
        context: {
          lang: 'lang/newpage-en',
          detect: false
        },
        content: 'templates/new.html',
        animate: true
      },
    };

    // BIM.APP.PAGE make new page in this plugin and callback
    bim.app.page(page, function(){
      console.log('New page is poped')
    });
    
});
```











ㅁㄴㅇㄻㄴㅇㅎㅁㄴㅇㅎㅁㄴㅇㅎ하면 새화면 생김

many things, for example html which be poped in your browser create dynamically 
by ./js/ex_1.js



it called from ex_1.html

lets change something for example_1 plugin

* there is bim syntax. u dosent need to know bim syntax yet.
* just see how to change plugin

- in your aditor, open ex_1.js

* our gole is make a button in plugin
* to add new column in app page



* first make btn in main page.
* in ./templates/sortable.html
add this button tag

  <div class="align_center">
    <button class="new_col_btn col button button-large button-fill">
      Add New Column
    </button>
  </div>


* and then make eventlistener in js
go to ex_1.js
add this js function

$B.event({$:'.new_col_btn', on:'click'}, function(){

  console.log('this button is working')

});

and click button.
that button will be work


* we wanna make 
when i click this btn,
new column is poped in this page.

change eventlistener like this

var list_num = 6;

$B.event({$:'.new_col_btn', on:'click'}, function(){

  console.log('this button is working')

  let random_num = Math.floor(20 * Math.random());
  list_num = list_num + 1;

  let append_li = '<li>' +
    '  <div class="item-content">' +
    // ion-ionic can be used in hitbim
    '    <div class="item-media"><i class="icon ion-gear-a"></i></div>' +
    '    <div class="item-inner">' +
    `      <div class="item-title"> List item ${list_num} english</div>` +
    `      <div class="item-after"> $${random_num} </div>` +
    '    </div>' +
    '  </div>' +
    '  <div class="sortable-handler"></div>' +
    '</li>';

  $B.append({$:'#list_ul'}, append_li);

});

it will be work.



* and then lets make new page in plugin

* lets make new button and eventlistener for that btn









5. 

this whole node.js app can be real app for ios, android at once

you just work for 1 plugin. it is not hard to work.

actuary this plugin dosent have many features yet.

but if many useful plugins are combined as one app, this app will be GOOOOOOOD

hitbim appbuilder work like this.



