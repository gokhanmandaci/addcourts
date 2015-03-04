var isMyCheckUpdate = false;
var whichImage = 0;
var yesNoArr = ["Evet", "Hayır"];
var openHoursArr = ["24 Saat Açık", "17.00", "18.00", "19.00", "20.00", "21.00", "22.00", "23.00", "24.00"];
var openHoursEnumArr = [0,1,2,3,4,5,6,7,8];
var isIndoorArr = ["Açık", "Kapalı"];
var floorType = ["Asfalt", "Parke", "Diğer"];
var floorEnumArr = [0,1,2];
var categoryArr = ["Park", "Site içi", "Lise", "Üniversite", "Spor Salonu", "Fitness Salonu"];
var categoryEnumArr = [0,1,2,3,4,5];
var qualityArr = ["1", "2", "3", "4", "5"];
var basketCountArr = ["1", "2", "3", "4", "4+"];

var courtID;
function Global_Events_OnStart(e) {
    changeLang(Device.language, true);
    SES.Configuration.useAnalytics = true;
    Device.setGPSStatus(true);
    include("services.js");
    isMyCheckUpdate = true;
    myCheckUpdate();
}
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
var myLat = 0;
var myLng = 0;
function Global_Events_OnLocationChanged(e) {
    myLat = e.lat;
    myLng = e.lng;
    //alert(myLat, myLng);
}
function openCameraAndCrop(_whichPhoto) {
    var format = SMF.ImageFormat.JPEG;
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
                                            imageIndex = 1;
                                            Pages.pgTakePhotos.cntMain.cntSub.cntFirstPhoto.imgBtnFirstPhoto.defaultImage = e.image;
                                        } else if (_whichPhoto == 1) {
                                            imageIndex = 2;
                                            Pages.pgTakePhotos.cntMain.cntSub.cntSecondPhoto.imgBtnSecondPhoto.defaultImage = e.image;
                                        } else {
                                            imageIndex = 3;
                                            Pages.pgTakePhotos.cntMain.cntSub.cntThirdPhoto.imgBtnThirdPhoto.defaultImage = e.image;
                                        }
                                        //TODO: Uncomment this for using upload service
                                        addImage.URL = "http://hooper.zone/hooper-rest/courts/" + courtID + "/images?isCover=false";
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
            //alert(ex);
        }
    },
        function () {},
        function () {});
}
function openCameraAndResize() {
    var format = SMF.ImageFormat.JPEG;
    var compRate = 0.7;
    var imWidth;
    var imHeight;
    SMF.Multimedia.startCamera(1, 0, 1,
        function () {},
        function (e) {
        try {
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
                                Dialogs.dgUploading.show();
                                imageIndex = 0;
                                Pages.pgTakePhotos.cntMain.cntHead.cntMainPhoto.imgBtnMainPhoto.defaultImage = e.image;
                                addImage.URL = "http://hooper.zone/hooper-rest/courts/" + courtID + "/images?isCover=true";
                                //TODO: Uncomment this for using upload service
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
        } catch (ex) {
            //alert(ex);
        }
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
function resetAllFields() {
    Pages.pgAddInformation.svCourtForm.cntCourtForm.cntBasketCount.edtBasketCount.text = "";
    Pages.pgAddInformation.svCourtForm.cntCourtForm.cntCategory.edtCategory.text = "";
    Pages.pgAddInformation.svCourtForm.cntCourtForm.cntDescription.edtDescription.text = "";
    Pages.pgAddInformation.svCourtForm.cntCourtForm.cntHasLighting.edtHasLighting.text = "";
    Pages.pgAddInformation.svCourtForm.cntCourtForm.cntIsIndoor.edtIsIndoor.text = "";
    Pages.pgAddInformation.svCourtForm.cntCourtForm.cntName.edtName.text = "";
    Pages.pgAddInformation.svCourtForm.cntCourtForm.cntOpenHours.edtOpenHours.text = "";
    Pages.pgAddInformation.svCourtForm.cntCourtForm.cntPublicAccessible.edtPublicAccessible.text = "";
    Pages.pgPotaZemin.cntCourtForm.cntBasketQuality.edtBasketQuality.text = "";
    Pages.pgPotaZemin.cntCourtForm.cntFloorQuality.edtFloorQuality.text = "";
    Pages.pgPotaZemin.cntCourtForm.cntSecurity.edtSecurity.text = "";
    Pages.pgPotaZemin.cntCourtForm.cntFloorType.edtFloorType.text = "";
    Pages.pgPotaZemin.cntCourtForm.cntLineQuality.edtLineQuality.text = "";
    Pages.pgPotaZemin.cntCourtForm.cntWireFence.edtWireFence.text = "";
    Pages.pgTakePhotos.cntMain.cntHead.cntMainPhoto.imgBtnMainPhoto.defaultImage = "placeholder_main_photo.png";
    Pages.pgTakePhotos.cntMain.cntSub.cntFirstPhoto.imgBtnFirstPhoto.defaultImage = "placeholder_sub_photos.png";
    Pages.pgTakePhotos.cntMain.cntSub.cntSecondPhoto.imgBtnSecondPhoto.defaultImage = "placeholder_sub_photos.png";
    Pages.pgTakePhotos.cntMain.cntSub.cntThirdPhoto.imgBtnThirdPhoto.defaultImage = "placeholder_sub_photos.png";
    alert({
        title : 'Bilgilendirme',
        message : "Saha ve fotoğraflar başarıyla eklendi.",
        firstButtonText : "Tamam",
        OnFirstButtonPressed : function () {
            Pages.pgAddInformation.show(SMF.UI.MotionEase.decelerating, SMF.UI.TransitionEffect.leftToRight, SMF.UI.TransitionEffectType.cover, false, false);
        }
    });
}
//checkUpdate
function myCheckUpdate() {
    SES.checkUpdate(function (e) {
        if (isMyCheckUpdate) {
            isMyCheckUpdate = false;
            if (e.latestVersion > Application.version && e.isMandatory == true) {
                alert({
                    title : 'Bilgilendirme',
                    message : 'Yeni bir sürüm eklendi. Uygulamaya devam etmek için, güncel versiyonu yüklemeniz gerekmektedir.',
                    firstButtonText : "İndir",
                    OnFirstButtonPressed : function () {
                        SMF.Net.browseOut("http://dl.smartface.io/102203");
                    }
                });
            } else if (e.latestVersion > Application.version) {
                alert({
                    title : 'Bilgilendirme',
                    message : 'Yeni bir sürüm eklendi. Yeni özellikleri kullanabilmeniz için, güncel versiyonu yüklemeniz önerilir.',
                    firstButtonText : "İndir",
                    secondButtonText : "Devam",
                    OnFirstButtonPressed : function () {
                        SMF.Net.browseOut("http://dl.smartface.io/102203");
                    },
                    OnSecondButtonPressed : function () {
                        //bos
                    }
                });
            }
        }
    }, function () {
        //bos
    });
}
function Global_Events_OnMaximize(e) {
    isMyCheckUpdate = true;
    myCheckUpdate();
}