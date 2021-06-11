# HITBIM Plugin sample

## Introduction  
The purpose of this document is make reader to understand HITBIM structure and HITBIM plugin by add 2 features in example plugin.

## Installation of Example app

### Requirements

`Node.js` should be installed on your system.

### Install file from git
`$ git clone https://github.com/hitbim/example_plugins.git `

### Install node package and run app

`$ npm install`  
`$ npm start`

## How to cheak Example plugin in your browser

after run node app, you can check Example plugin in below url  
"http://localhost:3000/plugins/example_1/ex_1.html"

## Plugun soruce path

example_plugins/public/PLUGINS/example_1  
there can be many plugins in PLUGINS folder.

## Guide to add two feature in Example plugin

The purpose of this guide is add two feature in example_1 plugin  
we will make new column button, and then see how to make new page in plugin.

### Make new column button

1. First of all, make a button  
In "example_plugins/public/PLUGINS/example_1/templates/sortable.html",  
add below code before </bim> to make button.

``` 
<div class="align_center">
    <button class="new_col_btn col button button-large button-fill">
        Add New Column
    </button>
</div>
```

2. Make EventListener matched with button  
In "example_plugins/public/PLUGINS/example_1/js/ex_1.js"
add below code.

```
// Event Listener For HITBIM APP
$B.event({$:'.new_col_btn', on:'click'}, function(){
  console.log('make new colomn button is working')
});
```

when you click button you made, you can see log in your browser.

3. Add feature in EventListener's callback.  
change code like this.
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

feature to make new column is done.

### Make new page in Plugin

1. First of all, make a button 
In "example_plugins/public/PLUGINS/example_1/templates/sortable.html",  
add below code before </bim> to make button.

``` 
<div class="align_center">
<button class="new_page_btn col button button-large button-fill">
    Go To New Page
</button>
</div>
```

2. Make EventListener matched with button  
In "example_plugins/public/PLUGINS/example_1/js/ex_1.js"
add below code.

```
// Event Listener For HITBIM APP
$B.event({$:'.new_page_btn', on:'click'}, function(){
  console.log('make new page button is working')
});
```



3. Add feature in EventListener's callback.  
change code like this to make new page feature.
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

feature to make new page is done.

4. Add feature to go to last page  
add below code in your JS file.
```
// EVENT LISTENER BY BIM
$B.event({$:'.back-previous', on:'click'}, function(){
  // mainView is object from framework7
  mainView.router.back({animatePages:true});
  console.log('back')
});
```

feature to send last page is added in our plugin.

### END

this whole node.js app can be real app for ios, android at once  
you just work for 1 plugin. it is not hard to work.  
actuary this plugin dosent have many features yet.  
but if many useful plugins are combined as one app, this app will be GOOOOOOOD  
hitbim appbuilder work like this.















# HITBIM Plugin sample

## Introduction
이 문서는 HITBIM 앱을 실행하고, 플러그인을 수정하는 과정을 수행하는 것을 통해 HITBIM과 그 플러그인에 대해 이해하도록 하는 것을 목표로 합니다.

## Install of this app

### Requirements

`Node.js` 가 설치되어 있어야 합니다.

### Install sample app from git
`$ git clone https://github.com/hitbim/example_plugins.git `

### Install package and start node.js app
`$ npm install`
`$ npm start`


## how to see activating plugin example

after start this node.js app, it will be working in your port:3000

in your browser go to "http://localhost:3000/plugins/example_1/ex_1.html"

3. where is plugin files

example_plugins\public\PLUGINS\ "plugin name"

4. how to change plugin

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












example_1 plugin is changed.



5. 

this whole node.js app can be real app for ios, android at once

you just work for 1 plugin. it is not hard to work.

actuary this plugin dosent have many features yet.

but if many useful plugins are combined as one app, this app will be GOOOOOOOD

hitbim appbuilder work like this.







이 node.js 앱을 설치 후, 실행한 뒤

http://localhost:3000/plugins/example_1/ex_1.html

경로로 들어가면 example_1 플러그인이 확인이 댐





this git repository contain
- example of plugin

- basic syntax of bim

- structor of hitbim app

- this one app will be work as app in IOS, Android