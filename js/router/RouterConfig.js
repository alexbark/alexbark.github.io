App.routerConfig = [
		{
			route: "#home",
			templateId: "home",
			setView: function(){
				App.HomeViewCtrl();
			}
		},
		{
			route: "#about",
			templateId: "about",
			setView: function(){
				App.AboutViewCtrl();
			}
		},
		{
			route: "#topics",
			templateId: "topics",
			setView: function(){
				App.TopicsViewCtrl([]);
			}
		},
	];
