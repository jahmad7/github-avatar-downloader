//Junaid Ahmad 
//Git Hub Avator downloader 
//application used to download the avators of github users based on in command line provided username and repository
//for example node download_avators.js nodejs node


var request = require("request");
var fs = require ("fs");


//use the request module to GET the list of contrubtors for the given repo
function getRepoContributors(repoOwner, repoName, callback){

    //object to store the information needed for the get request 
    var options = {
        url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",

        //case sensative information passed into the request header
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token 854d9c9f72a050ef7838f09cebdc7c194064f057'
        }
    };

    request(options, function(error, response, body){
        callback(JSON.parse(body));
    });
}


//run the function get the list we need 
getRepoContributors("jquery", "jquery", function(err, result){
    if (err){
        console.log(err);
    }
    console.log(err, result);
})