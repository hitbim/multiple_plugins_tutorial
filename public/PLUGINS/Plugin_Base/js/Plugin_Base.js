// CALL PLUGIN INFORMATION FROM HITBIM SERVER
$B.init({
    name: 'Plugin_Base',
    load: 'template_engine',
    device: true,
    token: '//////// DATA FOR HITBIM_SERVER, NOT NESSARY FOR LOCAL ////////',
    pluginId: '//////// DATA FOR HITBIM_SERVER, NOT NESSARY FOR LOCAL ////////',
    framework: 'framework7'
})
.then(()=>{

// SET FIRST PAGE OF THIS PLUGIN
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

        // #########################################
        // #########################################
        // ##### MAKE YOUR OWN PLUGIN IN HERE! #####
        // #########################################
        // #########################################

    });
})
