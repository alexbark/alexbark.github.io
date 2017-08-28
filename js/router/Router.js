(function(routerconfg){
	var Router = (function(){
    var config = null,
		    currentRoute = null,
			  processConfig = function(config){
  				for(var i = 0;i < config.length;++i){
             if(config[i]["route"] == currentRoute){
                 return config[i];
             }
  				}
			  }

		return {
			init: function(routerconfg){
        //default view on load page
        location.hash = "home";
        App.HomeViewCtrl();
				//check if home page reloads and invoke HighlightRoute function
				if (performance.navigation.type == 1) {
					App.HighlightRoute(".top-navigation", location.hash);
				}
        //handle hash changes
				window.onhashchange = function(){
           	currentRoute = location.hash;
           	config = routerconfg;
           	var configObject = processConfig(config, currentRoute);
           	configObject.setView();
						App.HighlightRoute(".top-navigation", location.hash);
				}
			}
		}

	}());

	Router.init(routerconfg);

})(App.routerConfig)
