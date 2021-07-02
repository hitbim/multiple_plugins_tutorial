# HITBIM Plugin sample

## 소개
이 문서는 HITBIM 앱을 실행하고, 플러그인을 수정해 보는 것을 통해 HITBIM과 그 플러그인에 대해 이해하도록 하는 것을 목표로 합니다.

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
파일 내 </bim> 위에 다음 코드를 추가하여 버튼이 출력되게 합니다.

``` 
<div class="align_center">
    <button class="new_col_btn col button button-large button-fill">
        Add New Column
    </button>
</div>
```

2. 위 버튼과 대응되는 이벤트 리스너를 생성합니다.  
example_plugins/public/PLUGINS/example_1/js/ex_1.js  
파일 내 맨 아래에 다음 코드를 추가합니다.

```
// Event Listener For HITBIM APP
$B.event({$:'.new_col_btn', on:'click'}, function(){
  console.log('make new colomn button is working')
});
```

브라우저 상에서 버튼을 누를 때 마다 로그를 확인할 수 있습니다.

3. 이벤트 리스너 콜백함수에 기능 추가  
방금 추가한 이벤트 리스너를 다음과 같이 수정합니다.
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
파일 내 </bim> 위에 다음 코드를 추가하여 버튼이 출력되게 합니다.

``` 
<div class="align_center">
<button class="new_page_btn col button button-large button-fill">
    Go To New Page
</button>
</div>
```

2. 위 버튼과 대응되는 이벤트 리스너를 생성합니다.  
example_plugins/public/PLUGINS/example_1/js/ex_1.js  
파일 내 맨 아래에 다음 코드를 추가합니다.

```
// Event Listener For HITBIM APP
$B.event({$:'.new_page_btn', on:'click'}, function(){
  console.log('make new page button is working')
});
```

3. 이벤트 리스너 콜백함수에 기능 추가  
이벤트 리스너를 다음과 같이 수정하여 새 화면 생성 기능을 추가합니다.
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

새 화면을 생성하는 기능이 완성되었습니다.

4. 이전 화면으로 돌아가는 기능 만들기  
다음 코드를 JS파일 맨 아래에 추가합니다.
```
// EVENT LISTENER BY BIM
$B.event({$:'.back-previous', on:'click'}, function(){
  // mainView is object from framework7
  mainView.router.back({animatePages:true});
  console.log('back')
});
```

새 페이지 안의 이미지를 클릭하면 이전 화면으로 돌아가는 기능이 추가되었습니다.

## 새 플러그인 생성

1. 다음 경로에 개발자용 플러그인 베이스가 존재합니다.  
example_plugins/public/PLUGINS/Plugin_Base  
이를 이용해 원하는 플러그인을 개발할 수 있습니다.  

2. 개발중인 플러그인을 브라우저에서 확인하는 경로  
"http://localhost:3000/plugins/Plugin_Base/Plugin_Base.html"

## 마침

이렇게 개발된 플러그인들은 추후 제공될 Hitbim 컴포저를 통해 자동으로 안드로이드, IOS 앱으로 전환될 수 있습니다.  
