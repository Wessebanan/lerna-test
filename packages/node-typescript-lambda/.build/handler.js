"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieve = exports.store = exports.echo = exports.bye = exports.hello = void 0;
const fs = require("fs");
const hello = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "helloo"
        })
    };
    callback(undefined, response);
};
exports.hello = hello;
const bye = (event, context, callback) => {
    const n = event.queryStringParameters.i;
    const n2 = event.queryStringParameters.j;
    const sum = n + n2;
    const s = sum.toString();
    console.log(event);
    const response = {
        statusCode: 404,
        whatever: JSON.stringify({ message: "byebye" }),
        body: JSON.stringify({
            message: s
        })
    };
    callback(undefined, response);
};
exports.bye = bye;
const echo = (event, context, callback) => {
    callback(undefined, event.body);
};
exports.echo = echo;
const store = (event, context, callback) => {
    const json_string = JSON.parse(event.body);
    if (json_string.name == undefined || json_string.location == undefined || json_string.license == undefined) {
        callback('error');
        return;
    }
    const contents = fs.readFileSync('db.txt', 'utf8');
    const count = contents.split('\n').length - 1;
    var writeStream = fs.createWriteStream('db.txt', { flags: 'a+' });
    writeStream.write(count.toString() + '\t' + json_string.name + '\t' + json_string.location + '\t' + json_string.license);
    writeStream.write('\n');
    writeStream.close();
    callback(undefined, 'success');
};
exports.store = store;
const retrieve = (event, context, callback) => {
    const index = event.queryStringParameters.id;
    var contents = fs.readFileSync('db.txt', 'utf8');
    if (contents.split('\n').length - 1 < index || index == 0) {
        callback(undefined, 'Invalid ID');
    }
    callback(undefined, contents.split('\n')[index]);
};
exports.retrieve = retrieve;
//# sourceMappingURL=handler.js.map