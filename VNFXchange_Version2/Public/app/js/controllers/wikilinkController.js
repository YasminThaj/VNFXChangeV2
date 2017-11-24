routerApp.controller('wikilinkController',['$scope','$window',function(scope,window){


    scope.Redirect = function () {
             window.location.href = 'http://10.53.172.10/dokuwiki/doku.php?id=start';
    };
});