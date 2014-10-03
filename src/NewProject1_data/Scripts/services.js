var commonRequestHeaders = [
    'Accept:*/*',
    'Content-Type:application/json'
];
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
        "basketCount" : ""
    }
};
var addCourtData = {
    httpMethod : 'POST',
    timeout : 15
};
var addCourtResponseObj;
//ADD COURT Service Integration
var addCourtData = new SMF.Net.WebClient({
        URL : 'http://212.174.34.90:9998/hooper-rest/courts/',
        httpMethod : "POST",
        requestHeaders : commonRequestHeaders,
        contentType : "application/json",
        onSyndicationSuccess : function (e) {
            addCourtResponseObj = JSON.parse(this.responseText);
            courtID = addCourtResponseObj.id;
            Pages.pgTakePhotos.show(SMF.UI.MotionEase.decelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.cover, false, false);
            Dialogs.dgWait.close();
        },
        onServerError : function (e) {
            //TODO: Show server error
            alert("error" + this.status);
        },
        timeOutInterval : addCourtData.timeout
    });
//ADD Images Service Integration
//TODO: wait for change in content type of this service
var addImageRequestHeaders = [
    'Accept:*/*',
    'Content-Type: image/jpeg'
];
var addImage = new SMF.Net.WebClient({
        httpMethod : "PUT",
        requestHeaders : addImageRequestHeaders,
        contentType : "image/jpeg",
        onSyndicationSuccess : function (e) {
            Dialogs.dgUploading.close();
        },
        onServerError : function (e) {
            alert("error " + this.status);
        }
    });