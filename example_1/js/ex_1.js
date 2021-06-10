$B.init({
  name: 'NewsFeed',
  load: 'template_engine',
  device: true,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOnRydWUsImFsaWFzIjoic2hfZ3ZQcUlkV1FoQUlJY21TRUliIiwiZGF0ZSI6IjIwMjEtMDItMjRUMDY6MDU6MjAuNjA1WiIsImlhdCI6MTYxNDE0NjcyMH0.S6FWVZTzwAqnqyy1-3GL3BuE5cMGRLmHT_ww0MlsOWY',
  pluginId: 'plugin-ifBuahnBtnJoQGZY60bdf43b56afbJshELupSVOeGfCpZ',
  framework: 'framework7'
})

.then(()=>{

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

    if(compiled.error) return app.alert(compiled.message);
    $B.append({$:'.app-content'}, compiled.template);
    console.log('compiled template ', compiled);

    app.sortableOpen('.sortable');

    /*
      NoSQL similar interface
    */

    let params = {
      query:[
        {
          // This statement insert new row if not exists:
          // 'INSERT | UPDATE'
          // This statement select data
          query: 'SELECT',
          table: 'myFirstPluginDb',
          // limit: 10 OR Object params
          limit: {
            start: 0,
            limit: 40
          },
          pluginId: bim.plugin.id.get()
        },
        {
          query: 'SELECT',
          table: 'myFirstPluginDb',
          where: {
            uid: 'uid-f3f34f34f'
          },
          pluginId: bim.plugin.id.get()
        },
        {
          query: 'SELECT FILTER',
          table: 'myFirstPluginDb',
          filter: {
            values: ['uid-324f523432','uid-3453425f3','uid-923b2k3732'],
            in: 'uid'
          },
          order: {
            sort: 'date'
          },
          pluginId: bim.plugin.id.get()
        },
      ],
      env: 'dev',
      crossPlugin: true
    }

    bim.db.query(params, function(res){

      console.log('response ', res);
    })

    $B.event({$:'.icon', on:'click'}, function(){
      // CREATE A NEW INTERNAL PAGE
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

  		bim.app.page(page, function(compiled){

        $B.event({$:'.back-previous', on:'click'}, function(){
        	mainView.router.back({animatePages:true});
        });
      });
    });
  });

  app.alert('Hello World!');
})
