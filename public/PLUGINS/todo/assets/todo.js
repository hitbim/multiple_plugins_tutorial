// CALL PLUGIN INFORMATION FROM HITBIM SERVER
$B.init({
  name: "ToDo",
  load: "template_engine",
  device: true,
  token: "token",
  pluginId: "plugin_id",
  framework: "framework7",
}).then(() => {
  // (SPECIAL TABBAR)
  var shtml = `
	<bim-component data-id="component-2n52rfaA" data-type="my_tabbar">
		<div id="component-2n52rfaA" class="toolbar tabbar tabbar-labels tabbar-pos">
			<div class="toolbar-inner">
				<a href="#tab0" class="tab-link active tab-home" bim-item-iid="bim-replace-byId" style="min-width: 100.5px;"> <img bim-type="icon/image" src="assets/list.svg" class="inactive icon-size" style="width: 30px; height: 30px;"> </a>
				<a href="#tab1" class="tab-link  tab-search" bim-item-iid="bim-replace-byId" style="min-width: 100.5px;"> <img bim-type="icon/image" src="assets/search.svg" class="inactive icon-size" style="width: 30px; height: 30px;"> </a>
				<a href="#tab2" class="tab-link tab-upload" bim-item-iid="bim-replace-byId" style="min-width: 100.5px;"> <img bim-type="icon/image" src="assets/upload.svg" class="inactive icon-size" style="width: 30px; height: 30px;"> </a>
				<a href="#tab3" class="tab-link  tab-profile" bim-item-iid="bim-replace-byId" style="min-width: 100.5px;"> <img bim-type="icon/image" src="assets/profile.svg" class="inactive icon-size" style="width: 30px; height: 30px;"> </a>
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
      // DO SOMETHING WITH THE COMPONENT
      $(".app-content").append(component);
    }
  );

  // SET FIRST PAGE OF THIS PLUGIN
  bim.app
    .template({
      id: bim.plugin.id.get(),
      html: "templates/template.html",
      context: {
        lang: "lang/en",
        detect: false,
      },
      name: bim.plugin.name.get(),
    })
    .then(function (compiled) {
      // ERROR HANDLER
      if (compiled.error) return app.alert(compiled.message);
      // APPEND HTML CONTENTS TO PAGE
      $B.append({ $: ".app-content" }, compiled.template);

      // #########################################
      // #########################################
      // ##### MAKE YOUR OWN PLUGIN IN HERE! #####
      // #########################################
      // #########################################

      $(document).ready(function () {
        const $input = $("input[type='text']");
        const $ul = $("ul.todos");
        const addBtn = $("button.add");
        const clearBtn = $("button.clear");

        function createTodo() {
          if ($input.val()) {
            const $li = $("<li></li>").appendTo($ul);
            const $textSpan = $("<span></span>")
              .addClass("todo-text")
              .appendTo($li);
            $textSpan.append($input.val());
            $input.val("");
          }
        }

        function onClickTodo(e) {
          if ($(e.target).prop("tagName") === "LI") {
            $(e.target).toggleClass("checked");
            localStorage.setItem("todos", $ul.html());
          }
        }

        function loadTodos() {
          const data = localStorage.getItem("todos");
          if (data) {
            $ul.html(data);
          }
        }

        $ul.on("click", onClickTodo);

        addBtn.on("click", () => {
          createTodo();
          localStorage.setItem("todos", $ul.html());
        });

        clearBtn.on("click", () => {
          $ul.html("");
          localStorage.removeItem("todos");
        });

        loadTodos();

        // $(document).on(
        //   "click",
        //   ".open-follow-plugin[data-type='following'], #following",
        //   function () {
        //     bim.app.storyboard.moveTo({
        //       page: "follow",
        //       plugin: "follow",
        //       data: {
        //         uid: user_uid,
        //         tab: 1,
        //       },
        //     });
        //   }
        // );
      });
    });
});
