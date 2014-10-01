function Global_Events_OnStart(e) {
    changeLang(Device.language, true);
    //      Uncomment following block for navigationbar/actionbar sample. Read the JS code file for usage.
    //        Also uncomment related block in Page1
    /*
    load("HeaderBar.js");
    header = new HeaderBar();
    /**/
    //      Uncomment following block for menu sample. Read the JS code file for usage.
    /*
    load("Menu.js");
    /**/
    Device.setGPSStatus(1);
}
//image selector
include('services.js');
var whichImage = 0;
var yesNoArr = ["Evet", "Hayır"];
var openHoursArr = ["24 Saat Açık", "17.00", "18.00", "19.00", "20.00", "21.00", "22.00", "23.00", "24.00"];
var isIndoorArr = ["Açık", "Kapalı"];
var categoryArr = ["Park", "Site içi", "Lise", "Üniversite", "Spor Salonu"];
var qualityArr = ["1", "2", "3", "4", "5"];
var basketCountArr = ["1", "2", "3", "4", "4+"];
var courtID;
function Global_Events_OnError(e) {
    switch (e.type) {
    case "Server Error":
    case "Size Overflow":
        alert(lang.networkError);
        break;
    default:
        SES.Analytics.eventLog("error", JSON.stringify(e));
        alert(lang.applicationError);
        break;
    }
}
var myLat = null;
var myLng = null;
function Global_Events_OnLocationChanged(e) {
    myLat = e.lat;
    myLng = e.lng;
}
function openCameraAndCrop(_whichPhoto) {
    var format = SMF.ImageFormat;
    var compRate = 0.5;
    SMF.Multimedia.startCamera(1, 0, 1,
        function () {},
        function (e) {
        try {
            var baseW = 400;
            var im = new SMF.Image({
                    imageUri : e.photoUri,
                    onSuccess : function () {
                        var newH = parseInt(im.height / im.width * baseW);
                        im.resize({
                            width : baseW,
                            height : newH,
                            format : format,
                            compressionRate : compRate,
                            onSuccess : function (e) {
                                var diff = (newH - baseW) / 2;
                                im = new SMF.Image(e.image);
                                im.crop({
                                    x1 : 0,
                                    y1 : diff,
                                    x2 : baseW,
                                    y2 : newH - diff,
                                    format : format,
                                    compressionRate : compRate,
                                    onSuccess : function (e) {
                                        Dialogs.dgUploading.show();
                                        if (_whichPhoto == 0) {
                                            Pages.pgTakePhotos.cntMain.cntSub.cntFirstPhoto.imgBtnFirstPhoto.defaultImage = e.image;
                                        } else if (_whichPhoto == 1) {
                                            Pages.pgTakePhotos.cntMain.cntSub.cntSecondPhoto.imgBtnSecondPhoto.defaultImage = e.image;
                                        } else {
                                            Pages.pgTakePhotos.cntMain.cntSub.cntThirdPhoto.imgBtnThirdPhoto.defaultImage = e.image;
                                        }
                                        addImage.URL = "http://212.174.34.90:9998/hooper-rest/courts/" + courtID + "/images?isCover=false";
                                        if (Device.deviceOS == "Android") {
                                            addImage.request = new SMF.IO.File(e.image);
                                        } else {
                                            addImage.request = new SMF.IO.File(SMF.IO.applicationDataDirectory, e.image);
                                        }
                                        addImage.run(true);
                                    },
                                    onError : function (e) {
                                        alert("Hata 1");
                                    }
                                });
                            },
                            onError : function (e) {
                                alert("Hata 2");
                            }
                        });
                    },
                    onError : function () {
                        alert("Hata 3");
                    }
                });
        } catch (ex) {
            alert(ex);
        }
    },
        function () {},
        function () {});
}
function openCameraAndResize() {
    var format = SMF.ImageFormat;
    var compRate = 0.7;
    var imWidth;
    var imHeight;
    SMF.Multimedia.startCamera(1, 0, 1,
        function () {},
        function (e) {
        var im = new SMF.Image({
                imageUri : e.photoUri,
                onSuccess : function (e) {
                    imWidth = im.width;
                    imHeight = im.height;
                    var pageImageWitdh = Pages.pgTakePhotos.cntMain.cntHead.cntMainPhoto.imgBtnMainPhoto.width;
                    var resizedHeight = (imHeight / imWidth) * pageImageWitdh;
                    var resizedHeightRounded = Math.floor(resizedHeight);
                    im.resize({
                        width : pageImageWitdh,
                        height : resizedHeightRounded,
                        format : format,
                        compressionRate : compRate,
                        onSuccess : function (e) {
                            Pages.pgTakePhotos.cntMain.cntHead.cntMainPhoto.imgBtnMainPhoto.defaultImage = e.image;
                            addImage.URL = "http://212.174.34.90:9998/hooper-rest/courts/" + courtID + "/images?isCover=false";
                            if (Device.deviceOS == "Android") {
                                addImage.request = new SMF.IO.File(e.image);
                            } else {
                                addImage.request = new SMF.IO.File(SMF.IO.applicationDataDirectory, e.image);
                            }
                            addImage.run(true);
                        },
                        onError : function (e) {
                            alert("Error: " + e.message);
                        }
                    });
                },
                onError : function (e) {
                    alert("Error: " + e.message);
                }
            });
    },
        function () {},
        function () {});
}
//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in meters)
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000;
}
// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}
function runValidationAddInformation() {
    var alertStr = "";
    if (Pages.pgAddInformation.cntCourtForm.cntName.edtName.text == "") {
        alertStr += "Lütfen saha ismi alanını doldurunuz. \n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntDescription.edtDescription.text == "") {
        alertStr += "Lütfen saha açıklaması yapınız. \n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntPublicAccessible.edtPublicAccessible.text == "") {
        alertStr += "Lütfen halka açık mı alanını seçiniz. \n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntOpenHours.edtOpenHours.text == "") {
        alertStr += "Lütfen kapanış saatini seçiniz. \n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntIsIndoor.edtIsIndoor.text == "") {
        alertStr += "Lütfen saha tipini seçiniz. \n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntHasLighting.edtHasLighting.text == "") {
        alertStr += "Lütfen ışıklandırma alanını seçiniz. \n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntCategory.edtCategory.text == "") {
        alertStr += "Lütfen mekan alanını seçiniz. \n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntBasketCount.edtBasketCount.text == "") {
        alertStr += "Lütfen pota sayısını seçiniz. \n";
    }
    if (alertStr != "") {
        alert(alertStr);
    } else {
        alert(JSON.stringify(addCourtJSON));
        Pages.pgPotaZemin.show(SMF.UI.MotionEase.decelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.cover, false, false);
    }
}