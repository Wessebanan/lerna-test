import { Handler, Context, Callback } from 'aws-lambda'

import * as fs from 'fs'

interface HelloResponse {
  statusCode: number;
  body: string;
}

const hello: Handler = (event: any, context: Context, callback: Callback) => {
  const response: HelloResponse = {
    statusCode: 200,
    body: JSON.stringify({
      message: "helloo"
      
    })
  };

  callback(undefined, response);
};

interface ByeResponse {
  statusCode: number;
  whatever: string;
  body: string;
}

const bye: Handler = (event: any, context: Context, callback: Callback) => {
  const n: number = event.queryStringParameters.i;
  const n2: number = event.queryStringParameters.j;
  const sum: number = n+n2;
  const s: string = sum.toString();
  console.log(event);
  const response: ByeResponse = {
    statusCode: 404,
    whatever: JSON.stringify({message: "byebye"}),
    body: JSON.stringify({
      message: s   
    })
  };
  callback(undefined, response);
};

const echo: Handler = (event: any, context: Context, callback: Callback) => {
  callback(undefined, event.body);
}

const store: Handler = (event: any, context: Context, callback: Callback) => {
  const json_string: any = JSON.parse(event.body);
 
  if (json_string.name == undefined || json_string.location == undefined || json_string.license == undefined) {
    callback('error');
    return;
  }

  const contents: string = fs.readFileSync('db.txt', 'utf8');
  const count: number = contents.split('\n').length-1;
  
  var writeStream: fs.WriteStream = fs.createWriteStream('db.txt', {flags:'a+'});
  writeStream.write(count.toString() + '\t' + json_string.name + '\t' + json_string.location + '\t' + json_string.license);  
  writeStream.write('\n');
  writeStream.close();

  callback(undefined, 'success');
}


const retrieve: Handler = (event: any, context: Context, callback: Callback) => {
  const index: number = event.queryStringParameters.id;

  var contents: string = fs.readFileSync('db.txt','utf8');
  
  if (contents.split('\n').length-1 < index || index == 0) {
    callback(undefined, 'Invalid ID');
  }

  callback(undefined, contents.split('\n')[index]);
}

export { hello, bye, echo, store, retrieve }
