//Junaid Ahmad 
//Git Hub Avator downloader 
//application used to download the avators of github users based on in command line provided username and repository
//for example node download_avators.js nodejs node


var request = require("request");
var fs = require ("fs");
var gitInfrmation = require("./noncommit");


//use the request module to GET the list of contrubtors for the given repo
function getRepoContributors(repoOwner, repoName, callback){

    //object to store the information needed for the get request 
    var options = {
        url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",

        //case sensative information passed into the request header
        headers: {
            'User-Agent': 'request',
            'Authorization': gitInfrmation.GITHUB_TOKEN
        }
    };

    request(options, function(error, response, body){
        if (error){
            console.log(error)
        }
        else if (response.statusCode === 200){
            callback(error, JSON.parse(body));
        }
    });
}


//run the function get the list we need 
getRepoContributors("jquery", "jquery", function(err, result){
    //make sure there are no errors being thrown
    if (err){
        console.log(err);
    }
    //iterate through the object to get the values we want 
    for(var user of result){
        console.log(user.avatar_url);
    }
})