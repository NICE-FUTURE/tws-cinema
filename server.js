'use strict';
const HTTP = require('http');
const FS = require('fs');
const MONGO_CLIENT = require('mongodb').MongoClient;
const DB_URL = "mongodb://localhost:27017/movies";

let dbClient;

MONGO_CLIENT.connect(DB_URL, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    console.log("数据库已连接!");
    dbClient = db.db("movies");
});

function router(response, data) {
    let opt = data.opt;
    let movies = dbClient.collection("movies");

    if (opt === "latest") {
        // get latest movies
        movies.find({}, {'sort': {'year': -1}, 'limit': data.limit}).toArray((err, result)=>{
            response.write(JSON.stringify(result));
            response.end();
        });
    } else if (opt === "search") {
        movies.find({'title': {$regex: data.keyword}}, {'limit': data.limit}).toArray((err, result) => {
            response.write(JSON.stringify(result));
            response.end();
        });
    } else if (opt === "category") {
        movies.find({'genres': {$regex: data.tag}}, {'limit': data.limit}).toArray((err, result) => {
            response.write(JSON.stringify(result));
            response.end();
        });
    } else if (opt === "id") {
        movies.find({'id': +data.id}).toArray((err, result) => {  // typeof id is number!
            response.write(JSON.stringify(result));
            response.end();
        });
    } else if (opt === "recommend") {
        let i = 0;
        let results = [];
        movies.find({'genres': {$regex: data.tags[i]}}, {'limit': data.limit}).toArray((err, result) => {
            results = results.concat(result);
            if (i < data.tags.length) {
                i += 1;
                movies.find({'genres': {$regex: data.tags[i]}}, {'limit': data.limit}).toArray((err, result) => {
                    results = results.concat(result);
                    if (i < data.tags.length) {
                        i += 1;
                        movies.find({'genres': {$regex: data.tags[i]}}, {'limit': data.limit}).toArray((err, result) => {
                            results = results.concat(result);
                            response.write(JSON.stringify(results));
                            response.end();
                        });
                    }
                });
            }
        });
    }
}

let server = HTTP.createServer(function (request, response) {
    console.log(request.method + ': ' + request.url);
    if (request.url === '/' || request.url.startsWith("/index.html")) {
        FS.readFile('index.html', (err, info) => {
            response.write(info);
            response.end();
        });
    } else if (request.url.startsWith('/statics')) {
        FS.readFile(__dirname + request.url, (err, info) => {
            if (err) {
                console.log(__dirname+request.url);
                throw err;
            }
            response.write(info);
            response.end();
        });
    } else if (request.url.startsWith('/info.html')) {
        FS.readFile('info.html', (err, info) => {
            response.write(info);
            response.end();
        });
    } else if (request.url === '/api') {
        // Set CORS headers
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        switch (request.method) {
            case 'POST':
                let data = "";
                request.on("data", (chunk)=>{
                    data += chunk;
                });
                request.on("end", ()=>{
                    data = JSON.parse(data);
                    router(response, data);
                });
                break;
            case 'OPTIONS':
                response.writeHead(200);
                response.end();
                break;
        }
    }
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
