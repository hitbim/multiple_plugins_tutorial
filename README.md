

### Contents:
1. [Introduction](https://github.com/hitbim/multiple_plugins_tutorial/blob/main/README.md#introduction)
2. [Get started](https://github.com/hitbim/multiple_plugins_tutorial#get-started)
3. [Add a new plugin](https://github.com/hitbim/multiple_plugins_tutorial#add-a-new-plugin)
4. [Connect plugins together](https://github.com/hitbim/multiple_plugins_tutorial#connect-plugins-together)
5. [Test your app](https://github.com/hitbim/multiple_plugins_tutorial#test-your-app)



### Introduction

This tutorial will walk through the basic steps for adding plugins to the existing app! 

Every app built by our platform is made by creating components and linking them together. This makes it easier for you to create different apps by re-using the same plugins!

We'll create the simple plugin which shows the current time and connect it to our existing app. So let's start! 😄

### Get started

Before starting, you should have NodeJS installed on your system.

Let's start by cloning this repository to your local folder:

`$ git clone https://github.com/hitbim/multiple_plugins_tutorial.git`

Then, install the required libraries:

`$ npm install`

Now, you can start the app:

`$ npm start`

### Add a new plugin
First of all, there is a folder called "Plugin-Base". 

You can access the "plugin_base.js" which will initialize the plugin by sending the information to the HitBim server. 
```javascript=
$B.init({
    name: 'Plugin_Base',
    load: 'template_engine',
    device: true,
    token: '//////// DATA FOR HITBIM_SERVER, NOT NESSARY FOR LOCAL ////////',
    pluginId: '//////// DATA FOR HITBIM_SERVER, NOT NESSARY FOR LOCAL ////////',
    framework: 'framework7'
})
```
In addition, there is a code to set the template HTML of the plugin.
```javascript=
bim.app.template({
    id: bim.plugin.id.get(),
    html: 'templates/template.html',
    context: {
            lang: 'lang/en',
            detect: false
        },
    name: bim.plugin.name.get()
    }).then(function(compiled){

        // ERROR HANDLER
        if(compiled.error) return app.alert(compiled.message);
        // APPEND HTML CONTENTS TO PAGE
        $B.append({$:'.app-content'}, compiled.template);

    });
})
```

Let's make the template code now. Go to `/templates/template.html` and change its contents to this:
```htmlembedded=
<bim>
    <html>

    <head>
        <title>Time</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="../css/time.css">
        <link rel="shortcut icon" href="assets/favicon.ico">
    </head>

    <body>
        <div>
            <h1>Current time</h1>
            <h2 id="current-time"></h2>
        </div>
    </body>

    </html>
</bim>

```

After we set our template, let's add functionality to our new plugin:
```javascript=
$(document).ready(function () {
        function checkTime() {
          const time = new Date();

          $("#current-time").html(time);
          setTimeout(() => {
            checkTime();
          }, 500);
        }
        checkTime();
```

### Connect plugins together

We've added the new plugin, but how do we navigate from our existing plugin to the newly created one?

It's easier to switch between the multiple plugins if we create some tabbar.
So, head to our older plugin and add this to the js file (`/todo/js/todo.js`) after plugin initialization code:
 
```javascript=
...
}).then(() => {

    var shtml = `
        <bim-component data-id="component-2n52rfaA" data-type="my_tabbar">
            <div id="component-2n52rfaA" class="toolbar tabbar tabbar-labels tabbar-pos">
                <div class="toolbar-inner">
                    <a href="#tab0" class="tab-link  tab-todo" bim-item-iid="bim-replace-byId" style="min-width: 100.5px;"> <img bim-type="icon/image" src="assets/list.svg" class="inactive icon-size" style="width: 30px; height: 30px;"> </a>
                    <a href="#tab1" class="tab-link  tab-time" bim-item-iid="bim-replace-byId" style="min-width: 100.5px;"> <img bim-type="icon/image" src="assets/clock-circular-outline.svg" class="inactive icon-size" style="width: 30px; height: 30px;"> </a>
                </div>
            </div>
        </bim-component>
        `;

```
You can see that we are adding `<a>` tag links, which we'll use to navigate between plugins.

Then you can add this code to set and build your components (just right after the above code).
```javascript=
bim.component.set({
    id: "component-2n52rfaA",
    type: "my_tabbar",
    css: "tabbar.css",
    js: "tabbar.js",
    assets: "component/assets",
    level: "top",
    body: shtml,
  });
 
bim.component.build({
    id: "component-2n52rfaA",
    type: "my_tabbar",
    },
    function (component) {
      $(".app-content").append(component);
    }
);
```

We now need to associate previously added `<a>` tags with functions. Add this to your `todo.js` (after the call to `loadTodos()`):
```javascript=
$(document).on("click", ".tab-time", function () {
          bim.app.storyboard.moveTo({
            page: "time",
            plugin: "time",
          });
        });
```

Similarly, add the tabbar code to the newly created "time" plugin (in `time/js/time.js`):
```javascript=
var shtml = `
	<bim-component data-id="component-2n52rfaA" data-type="my_tabbar">
		<div id="component-2n52rfaA" class="toolbar tabbar tabbar-labels tabbar-pos">
			<div class="toolbar-inner">
				<a href="#tab0" class="tab-link  tab-todo" bim-item-iid="bim-replace-byId" style="min-width: 100.5px;"> <img bim-type="icon/image" src="assets/list.svg" class="inactive icon-size" style="width: 30px; height: 30px;"> </a>
				<a href="#tab1" class="tab-link  tab-time" bim-item-iid="bim-replace-byId" style="min-width: 100.5px;"> <img bim-type="icon/image" src="assets/clock-circular-outline.svg" class="inactive icon-size" style="width: 30px; height: 30px;"> </a>
			</div>
		</div>
	</bim-component>
	`;

  bim.component.set({
    id: "component-2n52rfaA",
    type: "my_tabbar",
    css: "tabbar.css",
    js: "tabbar.js",
    assets: "component/assets",
    level: "top",
    body: shtml,
  });

  bim.component.build(
    {
      id: "component-2n52rfaA",
      type: "my_tabbar",
    },
    function (component) {
      $(".app-content").append(component);
    }
  );

```

Lastly, add link to "todo" plugin with your `time.js`:
```javascript=
$(document).on("click", ".tab-todo", function () {
          bim.app.storyboard.moveTo({
            page: "todo",
            plugin: "todo",
          });
        });
```

### Test your app
After finishing all the steps, you can test your app by starting the server:
`$ npm start`

Head to `http://localhost:3000/PLUGINS/todo/todo.html`

You can see how this works. Good luck! 😄
