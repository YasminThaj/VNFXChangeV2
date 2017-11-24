routerApp.controller('vnffuncController',['$scope','$location','$http',function(scope,loc,http){
	
	scope.fpath ='testcases.html';
	scope.nval=true;	
	scope.funvnftype='';
	scope.funvnfname='';
	scope.funtesttype='';
	scope.BasicVMChangetype ='';
	scope.httpChangetype ='';
//	var checkExecute  = $("#tstbutn");
//	checkExecute.prop('disabled', true);
	scope.isDis = true;
	
	scope.gotofun1=function(fpath){
	scope.nval=true;
	scope.isDisabled = false;
		scope.fpath=fpath;

		
	}
	scope.isDisabled = false;
	scope.gotoexecute =function()
	{   
	    console.log("gotoexecute");
		scope.isDisabled = true;
		scope.searchButtonText="Searching";
		document.getElementById('tstbutn').value="Executing ...";
		document.getElementById('tstbutn').style.margin="-7px 0 0 0";
		
		http.get("http://localhost:8080/vnfexecute")
		.then(function (response) {
		console.log("executedata"+response.data);
		scope.nval=false;
	//			http.get("http://localhost:8080/vnfreport")
	//			.then(function (response) {
	//			console.log("reportdata"+response.data);	
			
				setTimeout(function () {
		  scope.$apply(function(){
			  scope.searchButtonText="false";
			scope.names = response.data;
			scope.report = response.report;
			
		document.getElementById('rep').className='active';
		document.getElementById('test').className='';
		scope.fpath='reports.html';
		  });
		}, 2000);
		
				
		
  //  });
					

			
		});
		
		
		
    }

	
	scope.ontypeChange =function(svtype){

	
		scope.showdrdwn=true;
		scope.funvnftype=svtype;
		console.log("------jjhgjhgjhg" + scope.funvnftype);
	
		http({
			url: "http://localhost:8080/vnfgetvnfname",
			params: {vnffuntypeid: svtype}
			
			}).then(function (response) {
				
			var sdata=JSON.stringify(response.data);
			
			var cdata=JSON.parse(sdata);
			
			scope.vimfunnames = cdata;
			
			
	}); 
	
}

scope.onnameChange =function(sname){

	
		scope.showsanrdwn=true;
		scope.funvnfname=sname;
		console.log("------name" + sname);
}
scope.ontestChange =function(testtype){

	
		scope.showcheckbox=true;
		scope.showbtn=true;
		scope.funtesttype=testtype;
		console.log("------testtype" + testtype);
		/*var checker = document.getElementById('chckbtn');
		var exebtn = document.getElementById('tstbutn');
		checker.onchange = function(){
if(this.checked){
    exebtn.disabled = false;
} else {
    exebtn.disabled = true;
}
		}*/
		
}	

scope.BasicVMChange =function(checktype){
	
	scope.BasicVMChangetype = checktype;
	if(scope.BasicVMChangetype == true){
		console.log("checktype-------if"+ checktype)
		scope.isDis = false;
	}else{
		scope.isDis = true;
	}  
}
scope.HTTPTrafficChange =function(checktype){
	console.log("checktype-------"+ checktype)
	scope.httpChangetype = checktype;
	if(scope.httpChangetype == true){
		scope.isDis = false;
	}
}

	
	}]);
		
	