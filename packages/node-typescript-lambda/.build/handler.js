"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bye = exports.hello = void 0;
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
    const n = Math.random() * 100 % 5 + 1;
    const s = n.toString();
    console.log(s);
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
//# sourceMappingURL=handler.js.map