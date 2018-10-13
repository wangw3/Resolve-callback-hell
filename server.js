const http = require('http'),
		fs = require('fs'),
		url = require('url'),
		static = require('node-static');
const file = new static.Server('./public');
const items = {
	1:{id:1, name: "Taylor", gender: "Female", age: 27, nation: "HK"},
	2:{id:2, name: "Shirley", gender: "Female", age: 26, nation: "CN"},
	3:{id:3, name: "Marc", gender: "Male", age: 22, nation: "SP"},
};

const response = {status: 200, data: items};

http.createServer((req, res) => {

	const path = url.parse(req.url).pathname;
	
	if(path == "/get") {
		console.log("request received");

		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		res.write(JSON.stringify(response), function(err) { res.end(); });
	} else {

		fs.readFile('./index.html', function(err, file) {
			if(err) {
				return;
			}
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(file, "utf-8");
		});
	}

	file.serve(req, res);
}).listen(3600);

console.log('app listening on port 3600!');
