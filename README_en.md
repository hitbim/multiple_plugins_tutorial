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

`example_plugins/public/PLUGINS/example_1`  
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

## Make new Plugin

There is Plugin Development Kit in  
`example_plugins/public/PLUGINS/Plugin_Base`  
Any JS developer can make their own Plugin by this  
  
Path to cheak developing plugin in your browser  
"http://localhost:3000/plugins/Plugin_Base/Plugin_Base.html"

### END

This Plugins can be IOS, APK APP automatically by Hitbim composer later
