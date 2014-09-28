//ADD COURT Params
var addCourtJSON = {
    "name" : "",
    "latitude" : "",
    "longitude" : "",
    "properties" : {
        "description" : "",
        "isPublicAccessible" : "",
        "openHours" : "",
        "isIndoor" : "",
        "hasLighting" : "",
        "category" : "",
        "basketQuality" : "",
        "floorQuality" : "",
        "security" : "",
        "basketCount":""
    },
    "images" : {
        "imageCover" : "",
        "image1" : "",
        "image2" : "",
        "image3" : ""
    }
};
var addCourt = {
    //TODO: Complete the parameters after service is opened.
    httpMethod : 'POST',
    timeout : 15
};
//ADD COURT Service Integration
var addCourtService = new SMF.Net.WebClient({
        URL : '',
        httpMethod : addCourt.httpMethod,
        requestHeaders : '',
        contentType : '',
        onSyndicationSuccess : function (e) {
            //TODO: Show user that the adding process completed successfully.
        },
        onServerError : function (e) {
            //TODO: Show server error
        },
        timeOutInterval : addCourt.timeout
    });