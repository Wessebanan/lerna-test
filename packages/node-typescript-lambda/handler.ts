import { Handler, Context, Callback } from 'aws-lambda';

interface HelloResponse {
  statusCode: number;
  body: string;
}

const hello: Handler = (event: any, context: Context, callback: Callback) => {
  const response: HelloResponse = {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello"
      
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
  const response: ByeResponse = {
    statusCode: 404,
    whatever: JSON.stringify({message: "byebye"}),
    body: JSON.stringify({
      message: "bye"
      
    })
  };
  callback(undefined, response);
};

export { hello, bye }
