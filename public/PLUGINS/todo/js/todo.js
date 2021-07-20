// CALL PLUGIN INFORMATION FROM HITBIM SERVER
$B.init({
  name: "ToDo",
  load: "template_engine",
  device: true,
  token: "token",
  pluginId: "plugin_id",
  framework: "framework7",
}).then(() => {
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

      $(document).ready(function () {
        const $input = $("input[type='text']");
        const $ul = $("ul.todos");
        const addBtn = $("button.add");
        const clearBtn = $("button.clear");

        // CREATE A TASK
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

        // LOAD TASKS FROM LOCAL STORAGE
        function loadTodos() {
          const data = localStorage.getItem("todos");
          if (data) {
            $ul.html(data);
          }
        }

        // CHECK DONE TASK
        $ul.on("click", (e) => {
          if ($(e.target).prop("tagName") === "LI") {
            $(e.target).toggleClass("checked");
            localStorage.setItem("todos", $ul.html());
          }
        });

        // 'ADD' BUTTON
        addBtn.on("click", () => {
          createTodo();
          localStorage.setItem("todos", $ul.html());
        });

        // 'CLEAR' BUTTON
        clearBtn.on("click", () => {
          $ul.html("");
          localStorage.removeItem("todos");
        });

        loadTodos();
      });
    });
});
