routerApp.controller('onbordingcontroller',['$scope', '$sce','$http',function(scope,sce,http)
{
	/* $scope.url = $sce.trustAsResourceUrl('http://10.168.255.252:8080/VNF_AUTO_KVM/displayVm.action');
    $scope.changeIt = function () 
	{
        $scope.url = $sce.trustAsResourceUrl('https://www.google.co.in/');
	} */
	scope.imagename='';
	scope.flvname='';
	scope.vtype='';
	scope.offboardvtype='';
	scope.oppathname='VNF Onboard Upload';
	scope.onpath='vnfgonboard.html';
	scope.vnfNames='';
	scope.offboardMessage='';
	scope.offboardostype='';
	scope.VnfOpenSTack='';
	scope.vtypeName ='';
	scope.gotoonbrd=function(valoh){
		scope.onpath=valoh;		
		if(valoh=='vnfgonboard.html'){scope.oppathname="VNF OnBoard"}else{scope.oppathname="VNF OffBoard"}
		
	}
	scope.onvnftypechange=function(vtype){

		//console.log("dasdsadasdasdasd---" +vtype);
		scope.vtype=vtype;
		console.log("#@###"+scope.vtype)
	/*	var cvtype=vtype.split(',');
		console.log("dasdsadasdasdasd---" + cvtype[0]);
		scope.vtype = cvtype[0];
		scope.vtypeName = cvtype[1];  */
	/*http({
			url: "http://localhost:8080/getOnboardImg",
			params:{vnftype:scope.vtype}
			
			}).then(function (response) {
				
				console.log(JSON.stringify(response));
				var odata=JSON.stringify(response.data);
				var ojdata=JSON.parse(odata);
			scope.onimages = ojdata;
			
	}); */
	}

	/*scope.inOpenstackChange=function(openStack){
		//console.log("-------------fdsfsdfsdf"+ openStack)
	var openTy=openStack.split(',');
	console.log("-------------fdsfsdfsdf"+ openTy[0]);
	scope.vnfopenStack = openTy[0];
	http({
			url: "http://localhost:8080/getOnboardImg",
			params:{vnftype:scope.vtype,
			vnfopenStackId:openTy[0]}
			
			}).then(function (response) {
				
				console.log(JSON.stringify(response));
				var odata=JSON.stringify(response.data);
				var ojdata=JSON.parse(odata);
			scope.onimages = ojdata;
			
	}); 
	
	}*/
	
	scope.inOpenstackChange=function(openStack){
		scope.VnfOpenSTack=openStack;
	var openTy=scope.VnfOpenSTack.split(',');
	scope.vnfopenStack = openTy[0];
	scope.vnfopenStackName = openTy[1];
	console.log("----osvalueid"+ scope.vnfopenStack);
	console.log("----osvaluename"+ scope.vnfopenStackName);
	//console.log("----osvaluegfdgfdg"+ scope.vtype);
	var cvtype=scope.vtype.split(',');
		console.log("dasdsadasdasdasd---" + cvtype[0]);
		scope.vtype1 = cvtype[0];
		scope.vtypeName = cvtype[1];  
	http({
			url: "http://localhost:8080/getOnboardImg",
			params:{vnftype:scope.vtype1,
			vnfopenStackId:scope.vnfopenStack}
			
			}).then(function (response) {
				
				console.log(JSON.stringify(response));
				var odata=JSON.stringify(response.data);
				var ojdata=JSON.parse(odata);
			scope.onimages = ojdata;
			
	});
}
	scope.onimageChange=function(oflvid){
		console.log(oflvid);
		scope.imagename=oflvid;
		console.log("imgname"+scope.imagename)
		//var cimid=oflvid.split(',');
		http({
			url: "http://localhost:8080/getOnboardFlv",
			params:{ImageId:oflvid}
			
			}).then(function (response) {
				
				console.log(JSON.stringify(response));
				var odata=JSON.stringify(response.data);
				var ojdata=JSON.parse(odata);
			scope.onflvs = ojdata;
			
	}); 
	}
	scope.onbrdflvChange=function(flavour){
		
		scope.flvname=flavour;
	}
	scope.onovimgChange=function(vnfxname){
		scope.vnfxchngname=vnfxname;
	}
	
	scope.onboardfile=function(inname){
		console.log("-------------"+ inname);
		var flvr=scope.flvname;		
		var imgn=scope.imagename;		
		var vnfname=inname;
		var vnftype=scope.vtype;
		var openStack=scope.VnfOpenSTack;
		console.log("-----print"+scope.VnfOpenSTack);
		var ostype=openStack.split(",");
		console.log("-----aftersplit"+ostype[1]);
		var cdvnftype=vnftype.split(",");
		console.log("-----aftersplitvnf"+cdvnftype[1]);
		//var ostype=scope.vnfopenStack;
		scope.searchButton ='seraching';
		
		http({
			url: "http://localhost:8080/vnfonboardimage",
			method:"POST",
			params:{onboard_image:imgn,
			onboard_flavour:flvr,
			onboard_vnfname:vnfname,
			OpenStack:ostype[0],
			OpenStackname:ostype[1],
			vnftypename:cdvnftype[1],
			vnftypeid:cdvnftype[0]}
			
			}).then(function (response) {
			var odata=JSON.stringify(response.data);
			if(odata.indexOf('Failed')>=0){
				
				scope.onboardFileFailure = true;
				
			}
			else{ 
				scope.onboardFileSuccess = true;
			} 
			scope.searchButton ='stop';
			scope.osuccessmessage=response.data;				
				//scope.onbrdimgdt = odata;
			
	}); 
	scope.onimages = [{
                "ImageName": ".img"        
            }];
	scope.onflvs = [{
                "FlavourName": ".txt"        
            }];
	if(scope.vtype != "" && scope.vtype != undefined){
		console.log("selectedvalue"+scope.vtype);
	}
	else{
		scope.msg = 'Please Select VNF Type';
	}
	if(scope.VnfOpenSTack != "" && scope.VnfOpenSTack != undefined){
		console.log("selectedvalue"+scope.VnfOpenSTack);
	}
	else{
		scope.msg1 = 'Please Select Open Stack';
	}
	if(scope.imagename != "" && scope.VnfOpenSTack != undefined){
		console.log("selectedvalue"+scope.VnfOpenSTack);
	}
	else{
		scope.msg2 = 'Please Select Images';
	}
	if(scope.flvname != "" && scope.flvname != undefined){
		console.log("selectedvalue"+scope.flvname);
	}
	else{
		scope.msg3 = 'Please Select Flavour';
	}
	
	if(document.getElementById('vnfnameid').value == ""){
		scope.ername = 'Please Enter the VNF Name';
		//document.getElementById('rlsnm').style.bordercolor = "red";
		return false;
	}
	else{
		console.log("Value enterred");
	}
	
	}
	
	scope.offboardVnftypeChange=function(selectedovnftype){		
		
		//var vnftype=scope.selectedovnftype;
		//var cdvnftype=vnftype.split(",");
		//console.log(flvr+imgn+cdvnftype[0]+cdvnftype[1]+inname);
		
			scope.offboardvtype=selectedovnftype;
			//var vtype=selectedovnftype.split(',');
		console.log("ofbty---" + scope.offboardvtype);
		//scope.offboardvtype = vtype[0];
				//console.log("aftersplit---" + vtype[0]);
	/*	http({
			url: "http://localhost:8080/vnfOffboardNames",
			method:"GET",		
			params:{VnfTypeId:VnfTypeId,
			        Vopenstackid:Vopenstackid}
			
			}).then(function (response) {
				
				console.log(JSON.stringify(response.data));	
				var data=JSON.stringify(response.data);					
				var ojdata=JSON.parse(data);				
				scope.vnfNames = ojdata;
				
			
	});   */
	}
	scope.offboardostackChange=function(selectedoffboardstack){
        
		//scope.offboardostype=selectedoffboardstack;
		//console.log("----offstacktype"+scope.offboardostype);
		var openS=selectedoffboardstack.split(',');
		console.log("bfrsplt---" + openS);
		scope.offboardostype = openS[0];
		console.log("aftrsplt---" +openS[0]);
		var vtype=scope.offboardvtype.split(',');
		console.log("dasdsadasdasdasd---" + vtype[0]);
		scope.vtype11 = vtype[0];
		scope.vtypeName1 = vtype[1]; 
		http({
			url: "http://localhost:8080/vnfOffboardNames",
			method:"GET",		
			params:{VnfTypeId:scope.vtype11,
			        Vopenstackid:scope.offboardostype}
			
			}).then(function (response) {
				
				console.log(JSON.stringify(response.data));	
				var data=JSON.stringify(response.data);					
				var ojdata=JSON.parse(data);				
				scope.vnfNames = ojdata;
				
			
	});
	}
	scope.offboardfile=function(selectedoVNFName){		
		var VnfName=selectedoVNFName;
		//console.log(JSON.stringify(VnfName));	
		var vnfOstack=scope.offboardostype;
		 var vnftype=scope.offboardvtype;
		var VnfTypeId=vnftype.split(",");
		console.log(VnfName+VnfTypeId[0]+VnfTypeId[1]);
		//var VnfTypeId=1;
		//var VnfName="Demo1";
		console.log("controller");
		
		http({
			url: "http://localhost:8080/vnfOffboardView",
			method:"GET",
			//params:{vnfname,vnftypename:cdvnftype[1],vnftypeid:cdvnftype[0]}
			params:{VnfName:VnfName,
			VnfTypeId:VnfTypeId[0],
			vnftypename:VnfTypeId[1],
			VnfOstack:vnfOstack
			
			}
			
			}).then(function (response) {
				
				console.log(JSON.stringify(response.data));	
				var data=JSON.stringify(response.data);	
				var ojdata=JSON.parse(data);
				if(data.indexOf('Failed')>=0){
				
				scope.offboardFileFailure = true;
				
			}
			else{ 
				scope.offboardFileSuccess = true;
			} 				
				scope.offboardMessage = ojdata;
			
	}); 
	
	scope.vnfNames = [{
                "VnfName": "txt"        
            }];
	
	if(scope.offboardvtype != "" && scope.offboardvtype != undefined){
		console.log("selectedvalue"+scope.offboardvtype);
	}
	else{
		scope.errmsg = 'Please Select VNF Type';
	}
	if(scope.offboardostype != "" && scope.offboardostype != undefined){
		console.log("selectedvalue"+scope.offboardostype);
	}
	else{
		scope.oserrmsg = 'Please Select Open Stack';
	}
	if(scope.vnfxchngname != "" && scope.vnfxchngname != undefined){
		console.log("selectedvalue"+scope.vnfxchngname);
	}
	else{
		scope.vnferrmsg = 'Please Select VNF Name';
	}
	
	
	}
	
}]);