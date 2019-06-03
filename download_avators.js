//Junaid Ahmad 
//Git Hub Avator downloader 
//application used to download the avators of github users based on in command line provided username and repository
//for example node download_avators.js nodejs node


var request = require("request");
var fs = require ("fs");


//use the request module to GET the list of contrubtors for the given repo
function getRepoContributors(repoOwner, repoName, callback){
    
}


//run the function get the list we need 
getRepoContributors("jquery", "jquery", function(err, result){
    if (err){
        console.log(err);
    }
    console.log(result);
})