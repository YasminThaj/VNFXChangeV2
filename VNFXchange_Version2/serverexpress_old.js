var express = require('express')
var app = express();
var cors = require('cors');
var fs = require('fs');
var multer  =   require('multer');
var Papa = require('papaparse');
var cron = require('node-schedule');
var dateFormat = require('dateformat');
app.use(cors())
app.use(express.static('VNFXchange'+'/Public'));
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage}).single('imageUpload');
 var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
var url = 'mongodb://localhost:27017/datamongo';
var conn="";
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  conn=db;
  console.log("Connected correctly to server"+ db);
 

 
  //insertDocuments(db, function() {
  //  db.close();
  //});
  
  //var id=3;
  //getFlavours(id,db,function(){	 
  //  db.close();  
  //});
  
});
 var insertDocuments = function(db, callback) {
  var collection = db.collection('documents');
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection"+ collection);
	
    callback(result);
  });
}

function getFlavours(id,conn, callback) {
  var collection1 = conn.collection('VnfFlavours');
  
  collection1.find({Vid:id}).toArray(function(err,docs){
	//  assert.equal(err, null);
    //assert.equal(2, docs.length);
    console.log("Found the following records");
    //console.dir(docs);
    callback(docs);
	console.log(docs.length);
	  })
}
	  
app.get('/vnfgetFlav',function(req,res){
	 var collection1 = conn.collection('VnfFlavours');
	 console.log("hello");
	var id=req.param('id');
	var ids=parseInt(id)
	collection1.find({Vid:ids}).toArray(function(err,docs){
    console.log("Found the following records");
	console.log(docs);
	res.send(docs);
	  })
	
	
	
});

app.get('/vnfgetfImg',function(req,res){
	var collection1 = conn.collection('VnfImages');
	var id=req.param('VNF_flav');
	var ids=parseInt(id);
	collection1.find({FlavourId:ids}).toArray(function(err,docs){
    console.log("Found the following records"+docs);
	res.send(docs);
	  })	
});

app.get('/getOnboardImg',function(req,res){
	var ImageCollection=conn.collection("VnfImages");
	ImageCollection.find({}).toArray(function(err,docs){
		console.log("Get Onborad Images"+ docs);
		res.send(docs);
	});
});

app.get('/getOnboardFlv',function(req,res){
	var flavourId = parseInt(req.param('flvid'));
	var flavourCollection= conn.collection('VnfFlavours');
	flavourCollection.find({FlavourId:flavourId}).toArray(function(err,docs){
    console.log("Get Onborad Flavours"+docs);
	res.send(docs);
	  })	
});

app.post('/vnfonboardimage',function(req,res){
	var onboard_image = req.param('onboard_image')+".img";
	var onboard_flavour = req.param('onboard_flavour');
	var onboard_vnfname =  req.param('onboard_vnfname');
	console.log("Entering into pythoin");
		var exec = require('child_process').exec;
		var cmd = 'C:\\Python27\\Scripts\\pybot.bat '+onboard_image+' '+onboard_flavour+' '+onboard_vnfname+'';
		exec(cmd, function(error, stdout, stderr) {
			if(error){
				return console.log(error);
			}
			if (stderr) {
				return console.log(stderr);
			}   
			var str = stdout;
		console.log('VNF Onboraded Succesfully'+  str)
		var strString = str.split("\r\n").join(",");
		var someObjStr = JSON.stringify(req.param('onboard_image')+ "with Flavour" + onboard_flavour + +" Onboraded Successfully "+"@"+" Server:10.53.173.7");
		res.send(stdout)
	 
	 })

});

/* app.post('/vnfUploadAll',function(req,res){
	var vnfTypeId=req.param('vnfTypeId');
	var uploadImageName= req.param('uploadImageName');
	var uploadImageId= req.param('uploadImageId');
	var flavourList=req.param('flavourList');
	var ImageCollection=conn.collection("VnfImages");
	var FlavourCollection=conn.collection("VnfFlavours");
	if(vnfTypeId!=""&&uploadImageId!=null)
	{
		
		ImageCollection.save({VnfTypeId:vnfTypeId,ImageId : uploadImageId,ImageName:uploadImageName},function(err,res)
			{
				if(err){
					return console.log(error);
				}
				
	
	if(flavourList.length>0){
		flavourList.forEach(function(item){
			if(item)
			{
				FlavourCollection.insertMany([
				{ImageId : uploadImageId},
				{FlavourId : FlavourId}, 
				{FlavourName : FlavourName}
				  ],function(err, result) {
					assert.equal(err, null);					
					console.log("Inserted  documents into UploadAllCollection");					
					callback(result);
			  });
			}
		}
	}
	
	
			}
	}
	
	
	
}); */

//var getFlavours= function(id,db,callback){
	//var flavours= db.collection('Vnfflovours');
//		var flavours= db.collection('documents');
//	flavours.find({id:id},callback)
//}	  



/* app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
}); */
app.get('/vnfexecute', function (req, res) {
	var exec = require('child_process').exec;
    var cmd = 'C:\\Python27\\Scripts\\pybot.bat  --argumentfile D:\\verizon\\argfile.txt --listener C:\\Python27\\Lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:52607:False D:\\Automation_demo\\back_tar\\scripts';
	
	exec(cmd, function(error, stdout, stderr) {
        var result = {};
		result.response = stdout;
		var len = stdout.length;
		var createstr = stdout.lastIndexOf('Report:');
		var finalstr =createstr+8;
		var reporturl = stdout.substring(finalstr,len);
		var urlreport = reporturl.replace('\r\n', "");
		console.log('New String..'+  urlreport);
		var aryMatches = stdout.match(/\|(.*)/);
		var test_status = aryMatches[1].replace("|","");
		result.testcase_status =test_status;
		result.report =urlreport;		
    res.send(JSON.stringify(result))
	})
})  
app.get('/vnfreport', function (req, res) {	 
fs.readFile('D:\\xampp\\htdocs\\new-reformated-vnf\\command_vnf_functional.txt', 'utf8', function(err, data) { 
    if (err) {
    return console.log(err);
    }
	var str = data;
	var spstr = str.split(",");
	var resultObj = {};
	 resultObj.vnf_name = spstr[0];
	 resultObj.vnf_type = spstr[1];
	 resultObj.status = "";
	 resultObj.start_time = spstr[2];
	 resultObj.end_time = spstr[3];
	 resultObj.report = spstr[4];
	 resultObj.barchart_comp = spstr[6];
	var someObjStr = JSON.stringify(resultObj);
	res.send(someObjStr)
   console.log( someObjStr  );
})
})
app.get('/vnfview', function (req, res) {
	var exec = require('child_process').exec;
	var cmd ='python imageList.py';
	exec(cmd, function(error, stdout, stderr) {
		var strString = stdout.split("\r\n").join(",");
		var str = strString.split(",");
		var imageObj = {};
		imageObj.imagesList = str; 
		console.log('New String..images '+  imageObj.imagesList)
		var someObjStr = JSON.stringify(imageObj);
	    res.send(someObjStr)
	})
}) 
app.post('/vnfupload',function(req,res){
     
    console.log(req.param('imageName')+req.param('flavfilename')+req.param('vnftypename')+req.param('rlsname'))
	upload(req,res,function(err) {

        if(err) {
			console.log(err);
		    return res.end("Error uploading file.");
        }
		
		var exec = require('child_process').exec;
		var cmd=  "python imageTransfer.py "+req.param('imageName');

        exec(cmd, function(error, stdout, stderr) {	
		var str = stdout;
		var strString = str.split("\r\n").join(",");
		var stde=stderr;
		console.log("error---------------------"+error);
		console.log("stderr---------------------"+stderr)
		if(stde.length>0){
			var somefailObjStr = JSON.stringify(req.param('imageName')+" Upload failed "+"@"+" Server:10.53.173.7");
			res.send(somefailObjStr);
		}
		else{
		var someObjStr = JSON.stringify(req.param('imageName')+" Uploaded Successfully "+"@"+" Server:10.53.173.7");	    
		res.send(someObjStr);	
		}
		
	})		
    });
});
app.get('/vnflist', function (req, res) {
	
	var exec = require('child_process').exec;
	var cmd ='python vmList.py';
	exec(cmd, function(error, stdout, stderr) {

		var newstr = stdout.split("\r\n");
		newstr.shift();
		var endResult = [];
		newstr.forEach(function(item){
			if(item)
				endResult.push(item);			
		});
		console.log(endResult);
		var someObjStr = JSON.stringify(endResult);
	    res.send(someObjStr)
	})
});
app.get('/vnfdashboard', function (req, res) {
var exec = require('child_process').exec;
var cmd ='python dashboard_list.py';
exec(cmd, function(error, stdout, stderr) {
fs.readFile('trdashboard.csv', 'utf8', function(err, data) {  
    if (err) {
    return console.log(err);
    }
	var str = data;
	var results = Papa.parse(data).data;
	var finalOutput = {};
	results.forEach(function(propertyArray){
			var propertyName = propertyArray.shift();
			var pp1 = propertyName.trim();
			finalOutput[pp1] = [];
			var i=0;
			propertyArray.forEach(function(itemArray){
				finalOutput[pp1][i] = itemArray.trim()
				i++
			});
			
			var prop = "";
            delete finalOutput[prop];
	});
	res.send(JSON.stringify(finalOutput))
}) 
		
	})
   
});
app.post('/vnfreporthistory',function(req,res){
var test_name = req.param('test_name');	
fs.readdir('D:\\xampp\\htdocs\\VNFXchange\\public\\app\\views\\robot_output\\'+test_name, 'utf8', function(err, data) { 
   if (err) {
    return console.log(err);
    }		
	var rpnm=[];
	data.forEach(function(item){
			if(item.indexOf('report') >= 0)
				rpnm.push(item);
		}); 	
	var actyaldata=data;
	var actdate=[];
	var acttime=[];
	var crtime=[];
	var crdates=[];
	var results={};
	var crrtime=[];
	String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};


	actyaldata.forEach(function(item){
		if(item.indexOf('report') >= 0){
			var rtime=item.split('-');
				acttime.push(rtime[2]);
				actdate.push(rtime[1]);
				
		}
		}); 
		
	acttime.forEach(function(item){
		
			var ctime=item.split('.');
				crtime.push(ctime[0]);
				
				
		
		}); 
		actdate.forEach(function(item){				
				var crd=item.splice(4, 0, "/").splice(7,0,"/");		
				crdates.push(crd);
				
		
		}); 
		crtime.forEach(function(item){				
				var crd1=item.splice(2, 0, ":").splice(5,0,":");			
				crrtime.push(crd1);
				
		
		}); 
		results.testcase = test_name;
		results.rpname=rpnm.reverse();
		results.actualdate=crdates.reverse();
		results.actualtimee=crrtime.reverse();
		results.reportdata = data;
		
	res.send(results)
})
})

app.post('/vnfschedule',function(req,res){
	 
 var testcase_name = req.param('test_name');
 var scheduleTime  = req.param('schedule_time');
 
	var dt = new Date(scheduleTime);
	dt.setMonth(dt.getMonth() - 1);
	var day =dateFormat(dt, "yyyy-mm-dd hh:MM:ss"); 

var exec = require('child_process').exec;

var newStr = day.split("-").join(",");
var spiltStr = newStr.split(":").join(",");
var finalstr = spiltStr.replace(/\s/g, ",")
var arraystr = finalstr.split(",");

var j=cron.scheduleJob(arraystr, function(){
	
	if(typeof testcase_name=="string"){
	var cmd = 'C:\\Python27\\Scripts\\pybot.bat -d D:\\xampp\\htdocs\\VNFXchange\\public\\app\\views\\robot_output\\'+testcase_name+' --timestamp --reportbackground white:white:white -C off -W 107 --suite Scripts.Demo --test Scripts.Demo.'+testcase_name+' --listener C:\\Python27\\lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:62207:False D:\\Automation_demo\\back_tar\\scripts';
	exec(cmd, function(error, stdout, stderr) {
		console.log('script running'+ stdout );
		j.cancel();
	})	
	}
	else{
	for(var s=0;s<testcase_name.length;s++){
	var cmd = 'C:\\Python27\\Scripts\\pybot.bat -d D:\\xampp\\htdocs\\VNFXchange\\public\\app\\views\\robot_output\\'+testcase_name[s]+' --timestamp --reportbackground white:white:white -C off -W 107 --suite Scripts.Demo --test Scripts.Demo.'+testcase_name[s]+' --listener C:\\Python27\\lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:62207:False D:\\Automation_demo\\back_tar\\scripts';
	exec(cmd, function(error, stdout, stderr) {
		console.log('script running'+ stdout );
		j.cancel();
	})
	}}
});


}) 



app.get('/vnfalltestcase',function(req,res){
	var exec = require('child_process').exec;
	var cmd ='python demo.py';
	exec(cmd, function(error, stdout, stderr) {

		fs.readFile('testcases.txt', 'utf8', function(err, data) {  
    if (err) {
    return console.log(err);
    }
	var str = data;
	var results = Papa.parse(data).data;
	var finalOutput = [];
	var endResult=[];
	results.forEach(function(propertyArray){
			var propertyName = propertyArray.shift();
			var pp1 = propertyName.trim();
			finalOutput.push(pp1);
	});
	finalOutput.forEach(function(item){
			if(item)
				endResult.push(item);			
		});
	
	res.send(JSON.stringify(endResult))
})
	})
})


app.post('/vnfindtestcases',function(req,res){
	var test_id = req.param('test_id');	
	if(typeof test_id=="string")
	{
		var exec = require('child_process').exec;
		var cmd = 'C:\\Python27\\Scripts\\pybot.bat -d D:\\xampp\\htdocs\\VNFXchange\\public\\app\\views\\robot_output\\'+test_id+' --timestamp YYYY-MM-DD-hh:mm:ss --reportbackground white:white:white -C off -W 107 --suite Scripts.Demo --test Scripts.Demo.'+test_id+' --listener C:\\Python27\\lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:62207:False D:\\Automation_demo\\back_tar\\scripts';
		exec(cmd, function(error, stdout, stderr) {
			if (stderr) {
				return console.log(stderr);
			}   
	 
	 })
	}
	else{

		for(var i=0;i<test_id.length;i++){
			var exec = require('child_process').exec;
			var cmd = 'C:\\Python27\\Scripts\\pybot.bat -d D:\\xampp\\htdocs\\VNFXchange\\public\\app\\views\\robot_output\\'+test_id[i]+' --timestamp --reportbackground white:white:white -C off -W 107 --suite Scripts.Demo --test Scripts.Demo.'+test_id[i]+' --listener C:\\Python27\\lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:62207:False D:\\Automation_demo\\back_tar\\scripts';
			exec(cmd, function(error, stdout, stderr) {
				if (stderr) {
					return console.log(stderr);
				}  
	 })
		}
		}
})



app.get('/vnfonboarddata', function (req, res) {
//var exec = require('child_process').exec;
//var cmd ='python dashboard_list.py';
//exec(cmd, function(error, stdout, stderr) {
fs.readFile('onboarddata.csv', 'utf8', function(err, data) {  
    if (err) {
    return console.log(err);
    }
	var str = data;
	var results = Papa.parse(data).data;
	var finalOutput = {};
	results.forEach(function(propertyArray){
			//propertyArray.pop();
			var propertyName = propertyArray.shift();
			//console.log('property name'+   propertyName.trim()+ "fgfdgdfgd")
			var pp1 = propertyName.trim();
			finalOutput[pp1] = [];
			var i=0;
			propertyArray.forEach(function(itemArray){
				finalOutput[pp1][i] = itemArray.trim()
				i++
			});
			
			var prop = "";
            delete finalOutput[prop];
	});
	console.log(JSON.stringify(finalOutput))
	res.send(JSON.stringify(finalOutput))
}) 
		
//	})
   
});
app.use(express.static('VNFXchange'+'/Public'));
app.get('/',function (req,res) {
  res.sendFile('./app/views/index.html')
})
app.listen(8080, function () {
  console.log('Server running at http://localhost:8080/!')
})