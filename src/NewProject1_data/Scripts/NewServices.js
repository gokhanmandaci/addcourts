//image index
var imageIndex = 0;
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
        "basketCount" : "",
        "floorType" : "",
        "lineQuality" : "",
        "wireFence" : ""
    }
};
var addCourtData = {
    httpMethod : 'POST',
    timeout : 15
};
var addCourtResponseObj;
//ADD COURT Service Integration
var addCourtData = new SMF.Net.WebClient({
        URL : 'http://hooper.zone/hooper-rest/courts/',
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
            alert("Saha kaydı sırasında bir hata ile karşılaşıldı lütfen tekrar deneyiniz.");
        },
        timeOutInterval : addCourtData.timeout
    });
//ADD Images Service Integration
//TODO: wait for change in content type of this service
var myPhotosAdded = {
    "coverPhoto" : false,
    "firstPhoto" : false,
    "secondPhoto" : false,
    "thirdPhoto" : false
};
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
            switch (imageIndex) {
            case 0:
                myPhotosAdded.coverPhoto = true;
                break;
            case 1:
                myPhotosAdded.firstPhoto = true;
                break;
            case 2:
                myPhotosAdded.secondPhoto = true;
                break;
            case 3:
                myPhotosAdded.thirdPhoto = true;
                break;
            default:
                break;
            }
            if (myPhotosAdded.coverPhoto && myPhotosAdded.firstPhoto && myPhotosAdded.secondPhoto && myPhotosAdded.thirdPhoto) {
                if (Device.deviceOS == "Android") {
                    //bitti

                } else {
                    var item1 = new SMF.UI.iOS.BarButtonItem({
                            title : "Bitti",
                            onSelected : function () {
                                resetAllFields();
                                Pages.back(Pages.pgAddInformation);
                            }
                        });
                    Pages.pgTakePhotos.navigationItem.rightBarButtonItems = [item1];
                }
            }
        },
        onServerError : function (e) {
            alert("Resmi yüklerken bir hata oluştu lütfen tekrar deneyiniz.");
            switch (imageIndex) {
            case 0:
                myPhotosAdded.coverPhoto = false;
                Pages.pgTakePhotos.cntMain.cntHead.cntMainPhoto.imgBtnMainPhoto.defaultImage = 'placeholder_main_photo.png';
                break;
            case 1:
                myPhotosAdded.firstPhoto = true;
                Pages.pgTakePhotos.cntMain.cntSub.cntFirstPhoto.imgBtnFirstPhoto.defaultImage = 'placeholder_sub_photos.png';
                break;
            case 2:
                myPhotosAdded.secondPhoto = true;
                Pages.pgTakePhotos.cntMain.cntSub.cntSecondPhoto.imgBtnSecondPhoto.defaultImage = 'placeholder_sub_photos.png';
                break;
            case 3:
                myPhotosAdded.thirdPhoto = true;
                Pages.pgTakePhotos.cntMain.cntSub.cntThirdPhoto.imgBtnThirdPhoto.defaultImage = 'placeholder_sub_photos.png';
                break;
            default:
                Pages.pgTakePhotos.cntMain.cntSub.cntFirstPhoto.imgBtnFirstPhoto.defaultImage = 'placeholder_sub_photos.png';
                break;
            }
        }
    });