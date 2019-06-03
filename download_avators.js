//Junaid Ahmad 
//Git Hub Avator downloader 
//application used to download the avators of github users based on in command line provided username and repository
//for example node download_avators.js nodejs node

//modules
var request = require("request");
var fs = require ("fs");
var gitInfrmation = require("./noncommit");
var http = require("http");


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

//downloads the pictures of the users and renames them to their username.extension 
function downloadImageByURL(url, filePath){

    request.get(url)
    .on('error', function(err){
        throw err;
    })
    .on('response', function(response){
        console.log(response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath + ".png"));

}

//make sure the user enter information for the repos 
if (process.argv.length < 4){
    throw ("Please enter repo owner as well as repo name after node command");
}


//run the function get the list we need for the username as well as user pictures from JSON API for github
getRepoContributors(process.argv.slice(2)[0], process.argv.slice(2)[1], function(err, result){

    //make sure there are no errors being thrown
    if (err){
        console.log(err);
    }
    //iterate through the object to get the URLS for images we want and assign the login of each user as the image name  
    for(var user of result){

        downloadImageByURL(user.avatar_url, "./Avatars/"+user.login )
    }
})
