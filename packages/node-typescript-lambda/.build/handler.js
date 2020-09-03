"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bye = exports.hello = void 0;
const hello = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "hello"
        })
    };
    callback(undefined, response);
};
exports.hello = hello;
const bye = (event, context, callback) => {
    const response = {
        statusCode: 404,
        whatever: JSON.stringify({ message: "byebye" }),
        body: JSON.stringify({
            message: "bye"
        })
    };
    callback(undefined, response);
};
exports.bye = bye;
//# sourceMappingURL=handler.js.map