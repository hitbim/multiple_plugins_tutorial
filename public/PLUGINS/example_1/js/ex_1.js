// CALL PLUGIN INFORMATION FROM HITBIM SERVER
$B.init({
  name: 'NewsFeed',
  load: 'template_engine',
  device: true,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOnRydWUsImFsaWFzIjoic2hfZ3ZQcUlkV1FoQUlJY21TRUliIiwiZGF0ZSI6IjIwMjEtMDItMjRUMDY6MDU6MjAuNjA1WiIsImlhdCI6MTYxNDE0NjcyMH0.S6FWVZTzwAqnqyy1-3GL3BuE5cMGRLmHT_ww0MlsOWY',
  pluginId: 'plugin-ifBuahnBtnJoQGZY60bdf43b56afbJshELupSVOeGfCpZ',
  framework: 'framework7'
})

.then(()=>{
  
  // SET FIRST PAGE OF THIS PLUGIN
  bim.app.template({
	  id: bim.plugin.id.get(),
		html: 'templates/sortable.html',
	  context: {
			lang: 'lang/en',
			detect: false
		},
	  name: bim.plugin.name.get()
	})
	.then(function(compiled){

    // ERROR HANDLER
    if(compiled.error) return app.alert(compiled.message);
    // APPEND HTML CONTENTS TO PAGE
    $B.append({$:'.app-content'}, compiled.template);

    // app is object from framework7
    app.sortableOpen('.sortable');

  });

  app.alert('Hello World!');

})