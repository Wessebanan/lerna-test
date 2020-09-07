const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const http = XMLHttpRequest();
const url = 'localhost:8080';

function submitCompany(info) {
    http.open('POST', url+'/store', false);
    
    const json_string = JSON.stringify({
        name: info.name,
        location: info.country,
        license: info.license
    });

    http.send(json_string);
    
}

