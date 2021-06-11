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




2. how to see activating plugin example

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