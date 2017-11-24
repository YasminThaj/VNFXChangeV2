routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
        
        .state('login', {
            url: '/login',
            templateUrl: '../views/login.html',
			controller:'logController'
        })
  		.state('dashboard', {
			url:'/dashboard',
            templateUrl: '../views/dashboard.html',
			controller:'dashboardController'
        })
		.state('vnfFunc', {
			url:'/vnfFunc',
            templateUrl: '../views/vnfFunc.html',
			controller:'vnffuncController'
        })
		.state('vnfPerformance', {
			url:'/vnfPerformance',
            templateUrl: '../views/vnfPerformance.html'
        })
		.state('vnfgonboard', {
			url:'/vnfgonboard',
            templateUrl: '../views/vnfonbrd.html',
			controller:'onbordingcontroller'
        })
		.state('vnfHelp', {
			url:'/vnfHelp',
            templateUrl: '../views/vnfHelp.html'
        })
		.state('vnfImage', {
			url:'/vnfImage',
            templateUrl: '../views/vnfImage.html',
			controller:'vnfimageController'
        })
		.state('vnfonboardInfo', {
			url:'/vnfonboardInfo',
            templateUrl: '../views/vnfonboardInfo.html',
			controller:'vnfonboardInfoController'
        })
		.state('vnfwikilink', {
			url:'/vnfwikilink',
			templateUrl: '../views/vnfwikilink.html',			
			controller:'wikilinkController'
		});
       
});