import { Handler, Context, Callback } from 'aws-lambda'

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
  const n: number = Math.random() * 100 % 5 + 1; 
  const s: string = n.toString();

  console.log(s);
  const response: ByeResponse = {
    statusCode: 404,
    whatever: JSON.stringify({message: "byebye"}),
    body: JSON.stringify({
      message: s     
    })
  };
  callback(undefined, response);
};

export { hello, bye }
