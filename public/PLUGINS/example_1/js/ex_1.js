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

// EVENT LISTENER BY BIM
// when user click ".icon", activate callback function
$B.event({$:'.icon', on:'click'}, function(){

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

// EVENT LISTENER BY BIM
$B.event({$:'.back-previous', on:'click'}, function(){

  // mainView is object from framework7
  mainView.router.back({animatePages:true});
  console.log('back')

});