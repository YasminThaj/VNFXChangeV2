routerApp.controller('vnfimageController',['$scope','$location','$http',function(scope,loc,http){

	 scope.ipath ='upload.html'; 
	 scope.showtable=false;
	
	scope.imagename='';
	scope.filename=''; 
	scope.vnftype='';
	scope.vnftypeid='';
	scope.vnfOpenStack='';
	scope.viewVnfType='';
	scope.cancelupload='';
	
	
scope.onvimgtypeChange=function(vnftype){
	
	scope.vnftype=vnftype;
}

scope.getvnftypeChange=function(vnftype){
	
	scope.viewVnfType=vnftype;
	console.log("vnfid---"+scope.viewVnfType);
	
}

scope.onOpenstackChange=function(openstack){
	scope.vnfOpenStack=openstack;
	console.log("------------dsdsds"+ scope.vnfOpenStack)
}

 scope.uploadImage = function(){ 

scope.imagename = event.target.files[0].name;
		
}

scope.cancel=function(){
	
	
	scope.finalsubmit = {};
	scope.cancelupload=scope.finalsubmit.abort();
	$http.post('http://localhost:8080/vnfUploadAll1')
	
	//scope.cancelupload.dismiss('cancel');
 	//scope.cancelupload=scope.finalsubmit.abort();
	
}

	
scope.uploadfile=function(){
	
	scope.filename = event.target.files[0].name;
}
scope.finalsubmit=function(rlsnms){
	var imgnm=scope.imagename;
	var filename=scope.filename;
	var vntp=scope.vnftype;
	console.log("------------vnftype"+ vntp)
	var rlsname=rlsnms;
	var openstack = scope.vnfOpenStack;
	console.log("------------ostty"+ openstack)
	scope.searchButtonText ='Searching';
	
	http({
            method: 'POST',
            url: 'http://localhost:8080/vnfUploadAll',
            headers: {
               'Content-Type': undefined
            },
            params: {
               
                imageName:  imgnm,
				flavfilename:filename,
				vnftypename:vntp,
				rlsname:rlsname,
				openStack:openstack
            }
        })
        .then(function (data) {
		
			var edata=JSON.stringify(data.data);
			if(edata.indexOf('Failed')>=0){
				
				scope.uploadedFilefailure = true;
				
			}
			else{ 
				scope.uploadedFileSuccess = true;
			}
			scope.searchButtonText ='stop';			
			scope.successmessage=data.data;
		
			
			
		
		});
		
	if(scope.vnftype != "" && scope.vnftype != undefined){
		console.log("selectedvalue"+scope.vnftype);
	}
	else{
		scope.msg = 'Please Select VNF Type';
	}
	
	if(scope.vnfOpenStack != "" && scope.vnfOpenStack != undefined){
		console.log("selectedvalue"+scope.vnfOpenStack);
	}
	else{
		scope.msg1 = 'Please Select Open Stack';
	}
	
	if(document.getElementById('rlsnam').value == ""){
		scope.ermsg1 = 'Requried';
				return false;
	}
	else{
		console.log("Value enterred");
	}
	
	
	var index = imgnm.lastIndexOf(".")+1;
                        var strsubstring = imgnm.substring(index, imgnm.length);
	
                        if (strsubstring == "")
                        {
                          scope.errimg = 'Please Select Image'; 
                        }
                        else {
                            console.log('File Uploaded sucessfully');
                        }
						
	var index1 = filename.lastIndexOf(".")+1;
                        var strsubstring1 = filename.substring(index, filename.length);
	
                        if (strsubstring1 == "")
                        {
                          scope.errflv = 'Please Select Flavour'; 
                        }
                        else {
                            console.log('File Uploaded sucessfully');
                        }
	/*var relesename=rlsname;
	console.log("rrrrrname"+relesename);
	if(relesename == ""){
		
		alert('Please Enter Release');
		 document.getElementById('rlsnm').style.borderColor = "red";
		 return false;
	}
	else{
		console.log("valid");
	}*/
	
}



scope.gotoimg1=function(valh){
	
	scope.ipath=valh;
	scope.showtable=false;
}
scope.onvvnftypeChange=function(vvnftype){
	scope.vnftypeid=vvnftype;
	http({
			url: "http://localhost:8080/vnfgetuploadimage",
			params: {vnfid: vvnftype}
			
			}).then(function (response) {
			var sdata=JSON.stringify(response.data);
			var cdata=JSON.parse(sdata);
			scope.vimfnames = cdata;
			
	}); 
	
}

scope.getOpenstackChange=function(vnfOpenStack){
	scope.vnfOpenSatckId=vnfOpenStack;
	console.log("odid---"+scope.vnfOpenSatckId);
	
	http({
			url: "http://localhost:8080/vnfgetuploadimage1",
			params: {vnfid: scope.viewVnfType,
			         vnfopensatckid: scope.vnfOpenSatckId}
			
			}).then(function (response) {
			var sdata=JSON.stringify(response.data);
			var cdata=JSON.parse(sdata);
			scope.vimfnames = cdata;
			
	}); 
	
}




scope.onvvimgChange=function(vimgnm){
	
	http({
			url: "http://localhost:8080/vnfUploadView",
			params: {ImageId: vimgnm,
					 vnftypeid:scope.vnftypeid
					 }
			
			}).then(function (response) {
			var sdata=JSON.stringify(response.data);
			var cdata=JSON.parse(sdata);
			scope.vfnames = cdata;
			scope.showtable=true;
			scope.vnfTy = scope.viewVnfType;
			if(scope.vnfTy==1){
				scope.vnfTypeDesc = "VRouter";
			}else{
				scope.vnfTypeDesc = "Firewall";
			}
			
			console.log("vnfOpenStack-------------"+ scope.vnfOpenSatckId)
			scope.viewopen = scope.vnfOpenSatckId;
		    if(scope.viewopen==1){
				scope.openStackDesc = "Vmware";
			}else{
				scope.openStackDesc = "Redhat";
			}
			
	}); 
}
scope.onvfavChange=function(flv){
	
}
}]);
