var express = require('express')
var app = express();
var cors = require('cors');
var fs = require('fs');
var multer  =   require('multer');
var Papa = require('papaparse');
var cron = require('node-schedule');
var dateFormat = require('dateformat');
var autoIncrement = require("mongodb-autoincrement");
app.use(cors())

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
/*var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongodb.connect(secrets.db, options);*/
var conn="";
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  conn=db;
  console.log("Connected correctly to server"+ db);
 

 
 //insertDocuments(db, function() {
   //db.close();
 //});
  
 //var id=3;
 //getFlavours(id,db,function(){	 
   //db.close();  
 //});
  
});

 /*
 var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost:27017/datamongo';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server"+ db);
 

 
  insertDocuments(db, function() {
    db.close();
  });
});
 var insertDocuments = function(db, callback) {
  // Get the documents collection 
  var collection = db.collection('documents');
  // Insert some documents 
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection"+ collection);
    callback(result);
  });
}     */
app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});


/* app.get('/vnfexecute', function (req, res) {
	var exec = require('child_process').exec;
   // var cmd = 'C:\\Python27\\Scripts\\pybot.bat  --argumentfile D:\\verizon\\argfile.txt --listener C:\\Python27\\Lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:52607:False D:\\Automation_demo\\back_tar\\scripts';
	var cmd = 'C:\\Python27\\Scripts\\pybot.bat --argumentfile C:\\xampp\\htdocs\\VNFXchange\\argfile.txt --listener C:\\Python27\\Lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:49545:False D:\\automation_verizon\\Automation_demo\\back_tar\\scripts';
	
	exec(cmd, function(error, stdout, stderr) {
        var result = {};
		result.response = stdout;
		//var str ="unable to open socket to \"localhost:52607\" error: [Errno 10061] No connection could be made because the target machine actively refused it\r\n===========================================================================================================\r\nScripts \r\n===========================================================================================================\r\nScripts.Demo \r\n===========================================================================================================\r\ndemo1 | PASS |\r\n-----------------------------------------------------------------------------------------------------------\r\nScripts.Demo | PASS |\r\n1 critical test, 1 passed, 0 failed\r\n1 test total, 1 passed, 0 failed\r\n===========================================================================================================\r\nScripts | PASS |\r\n1 critical test, 1 passed, 0 failed\r\n1 test total, 1 passed, 0 failed\r\n===========================================================================================================\r\nOutput: D:\\VNF\\output.xml\r\nLog: D:\\VNF\\log.html\r\nReport: D:\\VNF\\report.html\r\n";
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
		console.log('result data'+  JSON.stringify(result));		
		res.send(JSON.stringify(result));
	})
}) */  
app.get('/vnfexecute', function (req, res) {
	var exec = require('child_process').exec;
	//var cmd = 'C:\\Python27\\Scripts\\pybot.bat --argumentfile D:\\verizon\\argfile.txt --listener C:\\Python27\\Lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:52607:False D:\\Automation_demo\\back_tar\\scripts';
	var cmd = 'C:\\Python27\\Scripts\\pybot.bat --argumentfile C:\\xampp\\htdocs\\VNFXchange\\argfile.txt --listener C:\\Python27\\Lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:49545:False D:\\automation_verizon\\Automation_demo\\back_tar\\scripts';
	exec(cmd, function(error, stdout, stderr) {
        var result = {};
		result.response = stdout;
		//var str ="unable to open socket to \"localhost:52607\" error: [Errno 10061] No connection could be made because the target machine actively refused it\r\n===========================================================================================================\r\nScripts \r\n===========================================================================================================\r\nScripts.Demo \r\n===========================================================================================================\r\ndemo1 | PASS |\r\n-----------------------------------------------------------------------------------------------------------\r\nScripts.Demo | PASS |\r\n1 critical test, 1 passed, 0 failed\r\n1 test total, 1 passed, 0 failed\r\n===========================================================================================================\r\nScripts | PASS |\r\n1 critical test, 1 passed, 0 failed\r\n1 test total, 1 passed, 0 failed\r\n===========================================================================================================\r\nOutput: D:\\VNF\\output.xml\r\nLog: D:\\VNF\\log.html\r\nReport: D:\\VNF\\report.html\r\n";
		var len = stdout.length;
		var createstr = stdout.lastIndexOf('Report:');
		var finalstr =createstr+8;
		var reporturl = stdout.substring(finalstr,len);
		var urlreport = reporturl.replace('\r\n', "");
		console.log('New String..'+  urlreport)
		result.report =urlreport;		
    res.send(JSON.stringify(result))
	})
}) 
app.get('/vnfreport', function (req, res) {
	
//fs.readFile('D:\\automation_verizon\\back_tar\\scripts\\command_vnf_functional.txt', 'utf8', function(err, data) {  
//fs.readFile('D:\\xampp\\htdocs\\new-reformated-vnf\\command_vnf_functional.txt', 'utf8', function(err, data) { 
    if (err) {
    return console.log(err);
    }
 //  console.log(data);
//	var str = data;
//	console.log('after split'+ str);
//	var spstr = str.split(",");
//	console.log('after split'+ spstr.length);
	var resultObj = {};
//	 resultObj.vnf_name = spstr[0];
//	 resultObj.vnf_type = spstr[1];
	  resultObj.vnf_name = "vyos1";
	  resultObj.vnf_type = "vRouter";
	 //resultObj.status = spstr[2];
//	 resultObj.status = "";
//	 resultObj.start_time = spstr[2];
//	 resultObj.end_time = spstr[3];
//	 resultObj.report = spstr[4];
//	 resultObj.barchart_comp = spstr[6];
	var someObjStr = JSON.stringify(resultObj);
	res.send(someObjStr)
   console.log( someObjStr  );
//})
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
/*
app.get('/vnfupload', function (req, res) {
	var exec = require('child_process').exec;
	var cmd ='python imageTransfer.py uiuploadimage.txt';
	exec(cmd, function(error, stdout, stderr) {
		console.log('upload.images '+  stdout)
		var str = stdout;
		console.log('String upload.images '+  str)
		var strString = str.split("\r\n").join(",");
		var someObjStr = JSON.stringify(strString);
	    res.send(someObjStr)
	})
})  */ 
app.post('/vnfupload',function(req,res){
     
    upload(req,res,function(err) {

        if(err) {
			console.log(err);
		    return res.end("Error uploading file.");
        }
		
		
		var exec = require('child_process').exec;
		//var cmd=  "python uploads\\imageTransfer.py D:\\xampp\\htdocs\\new-reformated-vnf\\uploads\\"+req.file.originalname;
		var cmd=  "python imageTransfer.py "+req.file.originalname;
		console.log(cmd)

        exec(cmd, function(error, stdout, stderr) {
		console.log('upload.images '+  stdout + req.file.originalname)
		var str = stdout;
		console.log('String upload.images '+  str)
		var strString = str.split("\r\n").join(",");
		var someObjStr = JSON.stringify(strString);
	    res.send(someObjStr)
	})		
        //res.end("File is uploaded");
        
//execute the image move script
    });
});
app.get('/vnflist', function (req, res) {
	
	var exec = require('child_process').exec;
	var cmd ='python vmList.py';
	exec(cmd, function(error, stdout, stderr) {

		//var str = stdout.replace("\r\n");
		var newstr = stdout.split("\r\n");
		newstr.shift();
		//console.log(newstr);
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
	console.log("Here");
	var dashCollection= conn.collection('VnfOnboard');
	dashCollection.find({}).toArray(function(err,docs){
    console.log("Get DashboardDetails--->"+docs);
	res.send(docs);
	
});
});
/*app.get('/vnfdashboard', function (req, res) {
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
		
	})
   
});*/
/*
app.get('/vnftestcaseone', function (req, res) {
var exec = require('child_process').exec;
var cmd ='python dashboard_list.py';
var exec = require('child_process').exec;
    
	var cmd_first = 'C:\\Python27\\Scripts\\pybot.bat --argumentfile D:\\verizon\\argfile_first.txt --listener C:\\Python27\\Lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:52607:False D:\\Automation_demo\\back_tar\\scripts';
	
	
	exec(cmd_first, function(error, stdout, stderr) {
        var result = {};
		result.response = stdout;
		console.log('First test case...'+  result.response)
		var len = stdout.length;
		var createstr = stdout.lastIndexOf('Report:');
		var finalstr =createstr+8;
		var reporturl = stdout.substring(finalstr,len);
		var urlreport = reporturl.replace('\r\n', "");
		console.log('New String..'+  urlreport)
		result.report =urlreport;		
    res.send(JSON.stringify(result))
	})
   
}); */
/* app.post('/vnftestcaseone', function (req, res) {
	var test_id = req.param('test_id');
	console.log(test_id);
	
var exec = require('child_process').exec;
var cmd ='python dashboard_list.py';
var exec = require('child_process').exec;
    
	var cmd_first = 'C:\\Python27\\Scripts\\pybot.bat --argumentfile D:\\verizon\\argfile_first.txt --listener C:\\Python27\\Lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:52607:False D:\\Automation_demo\\back_tar\\scripts';
	//pybot.bat -d D:\robot_output --timestamp --reportbackground white:white:white -C off -W 107 --suite Scripts.Demo --test Scripts.Demo.configuration_setup --listener C:\Python27\lib\site-packages\robotide\contrib\testrunner\TestRunnerAgent.py:62207:False D:\Automation_demo\back_tar\scripts
	
	exec(cmd_first, function(error, stdout, stderr) {
        var result = {};
		result.response = stdout;
		var len = stdout.length;
		var createstr = stdout.lastIndexOf('Report:');
		var finalstr =createstr+8;
		var reporturl = stdout.substring(finalstr,len);
		var urlreport = reporturl.replace('\r\n', "");
		var aryMatches = stdout.match(/\|(.*)/);
		console.log('Status in script..'+aryMatches[1].replace("|",""));
		var test_status = aryMatches[1].replace("|","");
		
		
		var dateTime = require('node-datetime');
        var dt = dateTime.create();
		var formatted = dt.format('d/m/Y H:M:S');
		result.curr_date =formatted;
		result.testcase_status =test_status;
		result.report =urlreport;		
    res.send(JSON.stringify(result))
	})
   
}); */
/* app.get('/vnftestcasesecond', function (req, res) {
var exec = require('child_process').exec;
var cmd ='python dashboard_list.py';
var exec = require('child_process').exec;
    
	var cmd_second = 'C:\\Python27\\Scripts\\pybot.bat --argumentfile D:\\verizon\\argfile_two.txt --listener C:\\Python27\\Lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:52607:False D:\\Automation_demo\\back_tar\\scripts';
	
	exec(cmd_second, function(error, stdout, stderr) {
        var result = {};
		result.response = stdout;
		console.log('First test case...'+  result.response)
		var len = stdout.length;
		var createstr = stdout.lastIndexOf('Report:');
		var finalstr =createstr+8;
		var reporturl = stdout.substring(finalstr,len);
		var urlreport = reporturl.replace('\r\n', "");
		console.log('New String..'+  urlreport)
		var aryMatches = stdout.match(/\|(.*)/);
		var test_status = aryMatches[1].replace("|","");
		result.testcase_status =test_status;
		result.report =urlreport;		
    res.send(JSON.stringify(result))
	})
   
}); */


app.post('/vnfreporthistory',function(req,res){
var test_name = req.param('test_name');	
fs.readdir('C:\\xampp\\htdocs\\VNFXchange\\Public\\app\\views\\robot_output\\'+test_name, 'utf8', function(err, data) { 
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
		console.log('actualdate..'+  crdates)
		results.actualtimee=crrtime.reverse();
		console.log('actualtimee'+  crtime)
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
	var cmd = 'C:\\Python27\\Scripts\\pybot.bat -d D:\\xampp\\htdocs\\new-reformated-vnf\\robot_output\\'+testcase_name+' --timestamp --reportbackground white:white:white -C off -W 107 --suite Scripts.Demo --test Scripts.Demo.'+testcase_name+' --listener C:\\Python27\\lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:62207:False D:\\Automation_demo\\back_tar\\scripts';
	exec(cmd, function(error, stdout, stderr) {
		console.log('script running'+ stdout );
		//res.send(stdout)
		j.cancel();
	})	
	}
	else{
	for(var s=0;s<testcase_name.length;s++){
	var cmd = 'C:\\Python27\\Scripts\\pybot.bat -d D:\\xampp\\htdocs\\new-reformated-vnf\\robot_output\\'+testcase_name[s]+' --timestamp --reportbackground white:white:white -C off -W 107 --suite Scripts.Demo --test Scripts.Demo.'+testcase_name[s]+' --listener C:\\Python27\\lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:62207:False D:\\Automation_demo\\back_tar\\scripts';
	exec(cmd, function(error, stdout, stderr) {
		console.log('script running'+ stdout );
		//res.send(stdout)
		j.cancel();
	})
	}}
});


}) 


app.get('/vnfgetvnfname',function(req,res){
	var VnfTypeName = req.param('vnffuntypeid');
	console.log("VnffunTypeId----------"+ VnfTypeName);
	var vnfnameCollection= conn.collection('VnfOnboard');
	console.log("vnfnameCollection----------"+ vnfnameCollection);
	vnfnameCollection.find({VnfTypeId:VnfTypeName}).toArray(function(err,docs){
		if(err){
			console.log("Get Onborad Images----------");
		}else{
    console.log("Get Onborad Images gfdfgdf"+docs);
		}
	res.send(JSON.stringify(docs));  
	})
});

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
		var cmd = 'C:\\Python27\\Scripts\\pybot.bat -d D:\\xampp\\htdocs\\new-reformated-vnf\\robot_output\\'+test_id+' --timestamp --reportbackground white:white:white -C off -W 107 --suite Scripts.Demo --test Scripts.Demo.'+test_id+' --listener C:\\Python27\\lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:62207:False D:\\Automation_demo\\back_tar\\scripts';
        //--reporttitle '+test_id+'
		exec(cmd, function(error, stdout, stderr) {
			if (stderr) {
				return console.log(stderr);
			}   
		//res.send(stdout)
	 
	 })
	}
	else{

		for(var i=0;i<test_id.length;i++){
			var exec = require('child_process').exec;
			var cmd = 'C:\\Python27\\Scripts\\pybot.bat -d D:\\xampp\\htdocs\\new-reformated-vnf\\robot_output\\'+test_id[i]+' --timestamp --reportbackground white:white:white -C off -W 107 --suite Scripts.Demo --test Scripts.Demo.'+test_id[i]+' --listener C:\\Python27\\lib\\site-packages\\robotide\\contrib\\testrunner\\TestRunnerAgent.py:62207:False D:\\Automation_demo\\back_tar\\scripts';

			exec(cmd, function(error, stdout, stderr) {
				if (stderr) {
					return console.log(stderr);
				}  
	 //res.send(stdout)	 
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

app.post('/vnfonboardimagea',function(req,res){
	var onboard_image = req.param('onboard_image');
	var onboard_flavour = req.param('onboard_flavour');
	var onboard_vnfname = req.param('onboard_vnfname');
		var exec = require('child_process').exec;
		var cmd = 'C:\\Python27\\Scripts\\pybot.bat '+onboard_image+' '+onboard_flavour+' '+onboard_vnfname+'';
		exec(cmd, function(error, stdout, stderr) {
			if (stderr) {
				return console.log(stderr);
			}   
		//res.send(stdout)
	 
	 })

})

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
	var VnfTypeId= req.param('vnftype');
	var VnfOpenStack= req.param('vnfopenStackId');	
	console.log("---VnfTypeId"+VnfTypeId);
	console.log("---Vnfopenstack"+VnfOpenStack);
	var ImageCollection=conn.collection("VnfImages");
	ImageCollection.find({VnfTypeId:VnfTypeId,VnfOpenStack:VnfOpenStack}).toArray(function(err,docs){
		console.log("Get Onborad Images"+ docs);
		res.send(docs);
	});
});

app.get('/getOnboardFlv',function(req,res){
	console.log("hello");
	//var flavourId = parseInt(req.param('flavourId'));
	var ImageId= req.param('ImageId');
	var flavourCollection= conn.collection('VnfFlavours');
	flavourCollection.find({ImageId:ImageId}).toArray(function(err,docs){
    console.log("Get Onborad Flavours"+docs);
	res.send(docs);
	  })	
});

/*app.post('/vnfonboardimage',function(req,resp){
	console.log(req.param('vnftypeid'));
	var str='';
	var VnfTypeId=req.param('vnftypeid');
	var VnfTypeName=req.param('vnftypename');
	var vnfopenStack = req.param('OpenStack');
	console.log("yasmin ======="+ vnfopenStack);
	var imageId=req.param('onboard_image');
	var flavourId=req.param('onboard_flavour');
	var cflvid=flavourId.split('.');
	var onboard_vnfname = req.param('onboard_vnfname');
	var VnfOnboardCollection=conn.collection("VnfOnboard");
	var resultValue = ""; 
 	var exec = require('child_process').exec;
	var cmd ='python launch_instances.py '+imageId+" "+cflvid[0]+" "+onboard_vnfname;
	console.log("cmd"+cmd)
	exec(cmd, function(error, stdout, stderr) {	
    if (error) {
    return console.log(error);
	resultValue ="Fail";
    }
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	if(dd<10){
    dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	var today = dd+'/'+mm+'/'+yyyy;
	resultValue ="Pass";
	console.log("scucess"); 
	VnfOnboardCollection.insert({VnfTypeId:VnfTypeId,
	VnfTypeName:VnfTypeName,VnfOpenStack:vnfopenStack,
								 ImageId:imageId,
								 ImageName:imageId,
								 flavourId:flavourId,
								 flavourName:flavourId,
								 VnfName:onboard_vnfname,
								 result: resultValue,
								 VnfDate:today
								 },function(err,result){
									 if(err){
										 console.log(err);
									 }
									 console.log("Enetered into the insert collection");
									  console.log("result-------->"+result);
									 assert.equal(err, null);
									
										if(result){
											
										str="successfully Onboarded "+onboard_vnfname;}
										else{
											str="Failed to Onboard "+onboard_vnfname;
										}
										
										resp.send(str);	
									 
									 conn.close();
								 });
								 
								
	});
	
		
		
	 
	

})*/

app.post('/vnfonboardimage',function(req,resp){
	console.log(req.param('vnftypeid'));
	var VnfTypeId=req.param('vnftypeid');
	var VnfTypeName=req.param('vnftypename');
	var VnfOpenStack = req.param('OpenStack');
	console.log("yasmin ======="+ VnfOpenStack );
	var OpenStackName=req.param('OpenStackname');
	var imageId=req.param('onboard_image');
	var flavourId=req.param('onboard_flavour');
	var cflvid=flavourId.split('.');
	var onboard_vnfname = req.param('onboard_vnfname');
	var str='';
	var resultValue = ""; 
	
	
 	
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	if(dd<10){
   dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	var today = dd+'/'+mm+'/'+yyyy;
	 
	var VnfOnboardCollection=conn.collection("VnfOnboard");
	if(VnfTypeId!=""&&VnfOpenStack!=""&&imageId!=""){
	resultValue = "Pass";
	console.log("scucess");
	var exec = require('child_process').exec;
	
	VnfOnboardCollection.insert({VnfTypeId:VnfTypeId,
	VnfTypeName:VnfTypeName,VnfOpenStack:VnfOpenStack,
	                      OpenStackName:OpenStackName,
	                             ImageId:imageId,
								 ImageName:imageId,
								 flavourId:flavourId,
								 flavourName:flavourId,
								 VnfName:onboard_vnfname,
								 Result:resultValue,
								 VnfDate:today
								 },function(err,result){
									 if(err){
										 console.log(eror);
									 }
									 console.log("Enetered into the insert collection");
									  console.log("result-------->"+result);
									 assert.equal(err, null);
									
										if(result){
											
										//str="successfully Onboarded "+onboard_vnfname;
										}
										else{
										//	str="Failed to Onboard "+onboard_vnfname;
										}
										
										resp.send(str);	
										
										
										
									 
								//	 conn.close();
								 });
								 
								
	}

})




app.get('/vnfOnboardView',function(req,res){
	var  vnfTypeId=req.param('vnftypeid');
	var  ImageId= req.param('ImageId');
	var VnfOpenStack = req.param('OpenStack');
	console.log(vnfTypeId+".."+ImageId+"---"+VnfOpenStack);
	var jsonArr = [];
	var onBoardCollection= conn.collection('VnfOnboard');

	onBoardCollection.find({vnfTypeId:vnfTypeId,VnfOpenStack:VnfOpenStack}).toArray(function(err,docs){
		var length= docs.length;
		for (var i = 0; i < length; i++) {
			jsonArr.push({
				vnfType: VnfTypeName,
				openstacktype:OpenStackName,
				ImageName: ImageId,
				Flavour:docs[i].flavourName,
				VnfName:docs[i].VnfName
			});
		}
		
    console.log("Formatted List-->"+jsonArr);
	res.send(jsonArr);
	
});
});

app.get('/vnfOffboardNames',function(req,res){
	var  VnfTypeId=req.param('VnfTypeId');	
	var  VnfOpenStack=req.param('Vopenstackid');
	console.log("Formatted List-->"+VnfOpenStack + VnfTypeId);
	var onBoardCollection= conn.collection('VnfOnboard');
	onBoardCollection.find({VnfTypeId:VnfTypeId,VnfOpenStack:VnfOpenStack}).toArray(function(err,docs){
    console.log("Get Offboard Names--->VnfOpenstack"+docs);	
	res.send(docs);
	  })	
});

app.get('/vnffunctionVnfNames',function(req,res){
	var  VnfTypeName=req.param('VnfTypeName');	
	//var  Vopenstackid=req.param('Vopenstackid');
	console.log("Formatted List-->"+ VnfTypeId);
	var onBoardCollection= conn.collection('VnfOnboard');
	//onBoardCollection.find({VnfTypeId:VnfTypeId,VnfOpenStack:Vopenstackid}).toArray(function(err,docs){
		onBoardCollection.find({VnfTypeName:VnfTypeName}).toArray(function(err,docs){
    console.log("Get Offboard Names--->VnfOpenStack"+docs);
	
	res.send(docs);
	  })	
});



/*app.get('/vnfOffboardView',function(req,res){
	var  VnfTypeIds=req.param('VnfTypeId');
	var  VnfName=req.param('VnfName');
	var  VNFopenstackid=req.param('VnfOstack');
	var VnfTypeId=VnfTypeIds.slice(0, 1);
	console.log(VnfTypeIds+".."+VnfName+"..."+VNFopenstackid);
		//console.log(VnfTypeIds);
	
	var ImageId='';
	var FlavourId='';
	
	//var  VnfTypeId="1";
	//var  VnfName="vyosvm-2"
	
	console.log("Entered into OffboardView");
	 var exec = require('child_process').exec;
	var cmd ='python offboarding.py '+ VnfName ;
	console.log("cmd"+cmd)
	exec(cmd, function(error, stdout, stderr) {	
		if (error) {
	return console.log(error);	
		}
		
		var onBoardCollection= conn.collection('VnfOnboard');
		//res.send("Successfully OffBoarded VnfName");
		console.log("VnfTypeId-->"+VnfTypeId);
		console.log("VnfName-->"+VnfName);
		console.log("VnfOSId-->"+VNFopenstackid);
		debugger;
		onBoardCollection.find({VnfName:VnfName,VnfOpenStack:VNFopenstackid}).toArray(function(err,docs){

			if(err){
				console.log("OKKKK");	
					//return console.log(err);
					//res.send(err);
				}
				var length= docs.length;
				for (var i = 0; i < length; i++) {
					
  					ImageId= docs[i].ImageId,
					FlavourId = docs[i].flavourId
					}
					
				console.log("ImageId-->"+ImageId);
				console.log("FlavourId-->"+FlavourId);
								
				
				
				var vnfImagesCollection= conn.collection('VnfImages');
			    vnfImagesCollection.findAndRemove({ImageId:ImageId}, function(err, object) {
				console.log("IN"+ImageId);
				if(err){
					 return console.log(err);
				}
				console.log("Removed from VnfImages")
				//conn.close();
			   });
			
			    var vnfFlavourCollection= conn.collection('VnfFlavours');
			    vnfFlavourCollection.findAndRemove({FlavourName:FlavourId},function(err,result){
				if(err){
					 return console.log(err);
				}
				console.log("Removed from VnfImages")
				//conn.close();
			     });
			})
			/*------------------------------------------------------*/
			//onBoardCollection.findAndRemove({VnfName:VnfName,VnfOpenStack:VNFopenstackid}, function(err, object) {
				
						/*if(err)
							throw err;
						console.log("document deleted");
						conn.close();*/
						//if(err){
					//		return console.log(err);
				//}
				//console.log("document deleted")
				/*conn.close();*/
			//});
		//	res.send("Successfully OffBoarded VnfName");
	//})
	
	//	conn.close();
//})
	

	
	
app.get('/vnfOffboardView',function(req,res){
	var  VnfTypeIds=req.param('VnfTypeId');
	var  VnfName=req.param('VnfName');
	var  VnfOpenStack=req.param('VnfOstack');
	var VnfTypeId=VnfTypeIds.slice(0, 1);
	console.log(VnfTypeIds+".."+VnfName+"..."+VnfOpenStack);
		//console.log(VnfTypeIds);
	
	var ImageId='';
	var FlavourId='';
	
	//var  VnfTypeId="1";
	//var  VnfName="vyosvm-2"
	
	console.log("Entered into OffboardView");
	 var exec = require('child_process').exec;
	
		
		var onBoardCollection= conn.collection('VnfOnboard');
		//res.send("Successfully OffBoarded VnfName");
		console.log("VnfTypeId-->"+VnfTypeId);
		console.log("VnfName-->"+VnfName);
		console.log("VnfOSId-->"+VnfOpenStack);
		debugger;
		onBoardCollection.find({VnfName:VnfName,VnfOpenStack:VnfOpenStack}).toArray(function(err,docs){

			if(err){
				console.log("OKKKK");	
					//return console.log(err);
					//res.send(err);
				}
				var length= docs.length;
				for (var i = 0; i < length; i++) {
					
  					ImageId= docs[i].ImageId,
					FlavourId = docs[i].flavourId
					}
					
				console.log("ImageId-->"+ImageId);
				console.log("FlavourId-->"+FlavourId);
								
				
				
				var vnfImagesCollection= conn.collection('VnfImages');
			    vnfImagesCollection.findAndRemove({ImageId:ImageId}, function(err, object) {
				console.log("IN"+ImageId);
				if(err){
					 return console.log(err);
				}
				console.log("Removed from VnfImages")
				//conn.close();
			   });
			
			    var vnfFlavourCollection= conn.collection('VnfFlavours');
			    vnfFlavourCollection.findAndRemove({FlavourName:FlavourId},function(err,result){
				if(err){
					 return console.log(err);
				}
				console.log("Removed from VnfImages")
				//conn.close();
			     });
			})
			/*------------------------------------------------------*/
			onBoardCollection.findAndRemove({VnfName:VnfName,VnfOpenStack:VnfOpenStack}, function(err, object) {
				
						/*if(err)
							throw err;
						console.log("document deleted");
						//conn.close();*/
						if(err){
							return console.log(err);
				}
				console.log("document deleted")
				//conn.close();
			});
			res.send("Successfully OffBoarded VnfName");
	
	
	//	conn.close();
})



function getNextSequenceValue(sequenceName){
  console.log("sequenceName---->"+sequenceName)
  /* var sequenceDocument = conn.collection("ICounters").findAndModify({
      query:{_id: "ImageId" },
      update: {$inc:{seq:1}},
      new:true
   });
   console.log("sequence");
	console.log(sequenceDocument);
   return sequenceDocument.seq;*/
   var seqNumber=0;
   var seqq=conn.collection("ICounters").find({}).toArray(function(error, documents) {
      seqNumber=parseInt(documents[0].seq)
    console.log(documents[0].seq)
    //res.send(documents);
});;
   console.log("seqq------------>>>>>>>>>>"+seqq);
 
   var seqno=  parseInt(seqNumber);
   console.log("seqno--->"+seqno);
   //conn.collection("ICounters").findOneAndUpdate({_id: "ImageId"},{seq:seqno});
    conn.collection("ICounters").update({_id: "ImageId"},{ $set: {seq: parseInt(seqno)}},function(err,res){
		 if (err)
		 {
			 console.log(err);
		 }
		 console.log("res:::::::::"+res);
	});
	
   return seqno;
   
}

function getNextSequence(name) {
	 var Imagecounters = conn.collection('Imagecounters');
	 
	// Imagecounters.find().toArray(function(err,docs){
    //console.log("Get sequence-->"+JSON.stringify(docs.seq));
	// });
	// console.log("sequence====================");
	 
   var ret = Imagecounters.findAndModify(
          {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
          }
   );
   console.log("sequence-->"+JSON.stringify(ret))
   return ret.seq;
   
   /*Imagecounters.findAndModify(
			{
			query: { _id: name },
            update: { $inc: { seq: 1 } },
			new: true
			},
	   function(err,doc) {
		   console.log("doc--------------------------->>>>>>"+doc)
		 return doc.seq;

	   }
	);*/
   
}

app.get('/vnfgetuploadimage1',function(req,res){
	var VnfTypeId = req.param('vnfid');
	var VnfOpenStack = req.param('vnfopensatckid');
	console.log("Vnf--------------"+ req.param('vnfid'));
	console.log("VnfTypeId---------"+ req.param('vnfopensatckid'));
	var imageCollection= conn.collection('VnfImages');
	imageCollection.find({VnfTypeId:VnfTypeId,VnfOpenStack:VnfOpenStack}).toArray(function(err,docs){
    console.log("Get Onborad Images------"+docs);
	res.send(JSON.stringify(docs));
	})
});

app.get('/vnfUploadView',function(req,res){
	var  vnfTypeId=req.param('vnftypeid');
	var vnfType="";
	if(vnfTypeId==1){vnfType="VRouter"}else{vnfType="Firewall"}
	var  ImageId= req.param('ImageId');
	console.log(vnfTypeId+".."+ImageId);
	var jsonArr = [];
	var flavourCollection= conn.collection('VnfFlavours');

	flavourCollection.find({ImageId:ImageId}).toArray(function(err,docs){
		var length= docs.length;
		for (var i = 0; i < length; i++) {
			jsonArr.push({
				vnfType: vnfType,
				Image: ImageId,
				Flavour:docs[i].FlavourName
			});
		}
		
    console.log("Formatted List-->"+jsonArr);
	res.send(jsonArr);
	
});
});

app.post('/vnfUploadAll',function(req,resp){
	console.log("entered the service");
	var ImageId=req.param('imageName');
	var vnfTypeId=req.param('vnftypename');
	var uploadImageId= req.param('imageName');
	var uploadImageName= req.param('imageName');
	var uploadflvname=req.param('flavfilename');
	var uploadImagePath="C:\\xampp\\htdocs\\VNFXchange";
	var flavourList={"F1": "C:\\xampp\\htdocs\\VNFXchange\\"+uploadflvname};
	
	var vnfOpenStack = req.param('openStack'); 
	
	
	//flavourList = flavourList.replace(/"F1":/g, '+uploadflvname+:');
	// flavourList[0]=uploadflvname;	 
	 
	
	 
	 
	/*var flavourList = {};
	flavourList.push(uploadflvname)
		flavourList.push("C:\\xampp\\htdocs\\VNFXchange\\"+uploadflvname)*/
	var rlsid=req.param('rlsname');
	var str='';
	var ImageCollection=conn.collection("VnfImages");
	var FlavourCollection=conn.collection("VnfFlavours");
	if(vnfTypeId!=""&&uploadImageId!=null){
		
       //For Pythone
	   var exec = require('child_process').exec;
	var cmd ='python upload_image_flavour.py '+ ' C:\\xampp\\htdocs\\VNFXchange\\'+uploadImageName +' C:\\xampp\\htdocs\\VNFXchange\\'+uploadflvname ;
	//var cmd ='start "" "c:\\images'
	exec(cmd, function(error, stdout, stderr) {	
    if (error) {
    return console.log(error);
	console.log("fail");
    }
	if(stdout.includes("Incorrect"))
	{
		return console.log(JSON.stringify(stdout))
	}
	else
	{
		var Pythonout=JSON.stringify(stdout);
	//console.log("Python Output---->"+JSON.stringify(stdout));
		ImageCollection.insert({VnfTypeId:vnfTypeId,ImageId:ImageId,VnfOpenstack:vnfOpenStack,ImageName:uploadImageName,ImagePath:uploadImagePath,RlsID:rlsid},function(err,res){
	//	ImageCollection.insert({VnfTypeId:vnfTypeId,ImageId:ImageId,ImageName:uploadImageName,ImagePath:uploadImagePath,RlsID:rlsid},//function(err,res){
				if(err){
					return console.log(error);
				}
				
				//if(res.status==200)
				//{	
					//console.log("Entered flavourCollection")
					//console.log(flavourList);
					if( Object.keys(flavourList).length != 0 ){
						console.log("Srikanth");
						//autoIncrement.getNextSequence(conn, FlavourCollection, function (err, autoIndex) {
							//flavourList.forEach(function(item){
								 for (var item in flavourList){
								if(item)
								{
								//	for (key in item) { 
								//		
								//	}
								  //alert("Key is " + item + ", value is " + flavourList[item]);
								  
									FlavourCollection.insertMany([
									{ImageId : ImageId,
									FlavourId : item, 
									FlavourName : uploadflvname,
									FlavourPath : flavourList[item]}
									  ],function(err, result) {
										assert.equal(err, null);
									
										if(result){
											//console.log("Enetered into result condition");
										str="successfully uploaded "+Pythonout;}
										else{
											str="Failed to upload "+Pythonout;
										}
										resp.send(str);	
										console.log("Hello");
										process.exit(0);	
										// process.kill();
										
										
										
										

										
										
										var exec = require('child_process').exec;
										console.log('node serverexpress.js');
										exec('nodemon serverexpress.js', function callback(error, stdout, stderr){
											 //result
										});
										
										 
										
								  });
								}
							}
					    //})
					}
					
				//}
				//conn.close();
	
			})
		}
	//	})
		//var ex= require('child_process').exec('nodemon').unref();
		 })
	}
	//console.log("str->"+str);
	//res.send(str);	
	
	
	
})



app.post('/vnfUploadAll1',function(req,resp){
	console.log("entered the service-----------------");
	var ImageId=req.param('imageName');
	var vnfTypeId=req.param('vnftypename');
	console.log("getting"+vnfTypeId);
	var uploadImageId= req.param('imageName');
	var uploadImageName= req.param('imageName');
	var uploadflvname=req.param('flavfilename');
	var uploadImagePath="C:\\xampp\\htdocs\\VNFXchange";
	var flavourList={"F1": "C:\\xampp\\htdocs\\VNFXchange\\"+uploadflvname};
	
	var VnfOpenStack = req.param('openStack'); 
	var rlsid=req.param('rlsname');
	var str='';
	var ImageCollection=conn.collection("VnfImages");
	var FlavourCollection=conn.collection("VnfFlavours");
	if(vnfTypeId!=""&&uploadImageId!=null){
		
       //For Pythone
	   var exec = require('child_process').exec;
		ImageCollection.insert({VnfTypeId:vnfTypeId,ImageId:ImageId,VnfOpenStack:VnfOpenStack,ImageName:uploadImageName,ImagePath:uploadImagePath,RlsID:rlsid},function(err,res){
	//	ImageCollection.insert({VnfTypeId:vnfTypeId,ImageId:ImageId,ImageName:uploadImageName,ImagePath:uploadImagePath,RlsID:rlsid},//function(err,res){
				if(err){
					return console.log(error);
				}
					if( Object.keys(flavourList).length != 0 ){
						console.log("Srikanth");
								 for (var item in flavourList){
								if(item)
								{
									FlavourCollection.insertMany([
									{ImageId : ImageId,
									FlavourId : item, 
									FlavourName : uploadflvname,
									FlavourPath : flavourList[item]}
									  ],function(err, result) {
										assert.equal(err, null);
									
										if(result){
											//console.log("Enetered into result condition");
										//str="successfully uploaded "+Pythonout;
										}
										else{
									//		str="Failed to upload "+Pythonout;
										}
										resp.send(str);	
										console.log("Hello");
										//process.exit(0);	
										// process.kill();
										
										
										
										

										
										
										var exec = require('child_process').exec;
										console.log('node serverexpress.js');
										exec('node serverexpress.js', function callback(error, stdout, stderr){
											 //result
										});
										
										 
										
								  });
								}
							}
					    //})
					}
					
				//}
				//conn.close();
	
			})
	}
})

app.listen(8080, function () {
  console.log('Server running at http://localhost:8080/!')
})

