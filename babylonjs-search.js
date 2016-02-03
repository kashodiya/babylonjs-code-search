var rp = require('request-promise');

function search(searchTerm){

    var options = {
        method: 'POST',
        uri: 'http://babylonjs-api.azurewebsites.net/api/search',
        body: {
            search: searchTerm,
            page: 0,
            pageSize: 10,
            includePayload: true
        },
        headers: {
            'content-type': 'application/json'
        },
        json: true 
    };
     
    return rp(options)

}

module.exports.search = search
