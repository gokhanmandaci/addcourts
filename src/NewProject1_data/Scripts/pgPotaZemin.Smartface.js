function runValidationBasketFloorSecurity() {
    var alertStr = "";
    if (Pages.pgPotaZemin.cntCourtForm.cntBasketQuality.edtBasketQuality.text == "") {
        alertStr += "Lütfen pota kalitesini derecelendiriniz. \n\n";
    }
    if (Pages.pgPotaZemin.cntCourtForm.cntFloorQuality.edtFloorQuality.text == "") {
        alertStr += "Lütfen zemin kalitesini derecelendiriniz. \n\n";
    }
    if (Pages.pgPotaZemin.cntCourtForm.cntSecurity.edtSecurity.text == "") {
        alertStr += "Lütfen güvenlik kalitesini derecelendiriniz. \n\n";
    }
    if (Pages.pgPotaZemin.cntCourtForm.cntFloorType.edtFloorType.text == "") {
        alertStr += "Lütfen zemin tipini giriniz. \n\n";
    }
    if (Pages.pgPotaZemin.cntCourtForm.cntLineQuality.edtLineQuality.text == "") {
        alertStr += "Lütfen çizgi kalitesini derecelendiriniz. \n\n";
    }
    if (Pages.pgPotaZemin.cntCourtForm.cntWireFence.edtWireFence.text == "") {
        alertStr += "Lütfen sahayı çevreleyen çit bulunuyor mu alanını doldurunuz. \n\n";
    }
    if (alertStr != "") {
        alert({
            title : 'Uyarı',
            message : alertStr,
            firstButtonText : "Tamam",
            OnFirstButtonPressed : function () {
                //empty
            }
        });
    } else {
        Dialogs.dgWait.show();
        addCourtData.requestString = JSON.stringify(addCourtJSON);
        addCourtData.run(true);
    }
}
function pgPotaZemin_Self_OnKeyPress(e) {
    if (e.keyCode == 4) {
        Pages.back();
    }
}
function pgPotaZemin_Self_OnShow(e) {
    if (Device.deviceOS == "Android") {
        this.actionBar.visible = true;
        this.actionBar.backgroundColor = '#F2F2F2';
        this.actionBar.displayShowTitleEnabled = true;
        this.actionBar.title = 'Sahalar v' + Application.version;
        this.actionBar.subtitle = 'Zemin-Pota-Çevre';
        this.actionBar.displayShowHomeEnabled = true;
        this.actionBar.icon = 'icon.png';
        this.actionBar.displayHomeAsUpEnabled = true;
        this.actionBar.onHomeIconItemSelected = function () {
            Pages.back();
        }
        var item1 = new SMF.UI.Android.MenuItem({
                id : '1',
                title : 'İLERİ',
                showAsAction : SMF.UI.Android.ShowAsAction.ifRoom,
                onSelected : function (e) {
                    //TODO: change this with service usage and validations
                    runValidationBasketFloorSecurity();
                    //Pages.pgTakePhotos.show(SMF.UI.MotionEase.decelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.cover, false, false);
                }
            });
        this.actionBar.menuItems = [item1];
    } else {
        this.navigationItem.title = "Zemin-Pota-Çevre";
        var item1 = new SMF.UI.iOS.BarButtonItem({
                title : "İleri",
                onSelected : function () {
                    //TODO: change this with service usage and validations
                    runValidationBasketFloorSecurity();
                    //Pages.pgTakePhotos.show(SMF.UI.MotionEase.decelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.cover, false, false);
                }
            });
        this.navigationItem.rightBarButtonItems = [item1];
        var item2 = new SMF.UI.iOS.BarButtonItem({
                title : "Geri",
                onSelected : function () {
                    Pages.back();
                }
            });
        this.navigationItem.leftBarButtonItems = [item2];
    }
    addCourtJSON.latitude = myLat;
    addCourtJSON.longitude = myLng;
    if (isMyCheckUpdate) {
        myCheckUpdate();
    }
}
function pgPotaZemin_txtBasketQuality_OnPressed(e) {
    var basketQualityText = Pages.pgPotaZemin.cntCourtForm.cntBasketQuality.edtBasketQuality.text.split(": ");
    var basketQualityIndex;
    basketQualityIndex = qualityArr.indexOf(basketQualityText[1]);
    pick(
        qualityArr, basketQualityIndex,
        function (e) {
        Pages.pgPotaZemin.cntCourtForm.cntBasketQuality.edtBasketQuality.text = "Pota kalitesi: " + qualityArr[e.index];
        addCourtJSON.properties.basketQuality = qualityArr[e.index];
    },
        function () {},
        function () {});
}
function pgPotaZemin_txtFloorQuality_OnPressed(e) {
    var floorQualityText = Pages.pgPotaZemin.cntCourtForm.cntFloorQuality.edtFloorQuality.text.split(": ");
    var floorQualityIndex;
    floorQualityIndex = qualityArr.indexOf(floorQualityText[1]);
    pick(
        qualityArr, floorQualityIndex,
        function (e) {
        Pages.pgPotaZemin.cntCourtForm.cntFloorQuality.edtFloorQuality.text = "Zemin kalitesi: " + qualityArr[e.index];
        addCourtJSON.properties.floorQuality = qualityArr[e.index];
    },
        function () {},
        function () {});
}
function pgPotaZemin_txtSecurity_OnPressed(e) {
    var securityText = Pages.pgPotaZemin.cntCourtForm.cntSecurity.edtSecurity.text.split(": ");
    var securityIndex;
    securityIndex = qualityArr.indexOf(securityText[1]);
    pick(
        qualityArr, securityIndex,
        function (e) {
        Pages.pgPotaZemin.cntCourtForm.cntSecurity.edtSecurity.text = "Güvenlik: " + qualityArr[e.index];
        addCourtJSON.properties.security = qualityArr[e.index];
    },
        function () {},
        function () {});
}
function pgPotaZemin_txtFloorType_OnPressed(e){
    var floorTypeText = Pages.pgPotaZemin.cntCourtForm.cntFloorType.edtFloorType.text.split(": ");
    var floorTypeIndex;
    floorTypeIndex = floorType.indexOf(floorTypeText[1]);
    pick(
        floorType, floorTypeIndex,
        function (e) {
        Pages.pgPotaZemin.cntCourtForm.cntFloorType.edtFloorType.text = "Zemin Tipi: " + floorType[e.index];
        addCourtJSON.properties.floorType = floorType[e.index];
    },
        function () {},
        function () {});
}
function pgPotaZemin_txtLineQuality_OnPressed(e){
    var lineQualityText = Pages.pgPotaZemin.cntCourtForm.cntLineQuality.edtLineQuality.text.split(": ");
    var lineQualityIndex;
    lineQualityIndex = qualityArr.indexOf(lineQualityText[1]);
    pick(
        qualityArr, lineQualityIndex,
        function (e) {
        Pages.pgPotaZemin.cntCourtForm.cntLineQuality.edtLineQuality.text = "Saha Çizgi Kalitesi: " + qualityArr[e.index];
        addCourtJSON.properties.lineQuality = qualityArr[e.index];
    },
        function () {},
        function () {});
}
function pgPotaZemin_txtWireFence_OnPressed(e){
    var wireFenceText = Pages.pgPotaZemin.cntCourtForm.cntWireFence.edtWireFence.text.split(": ");
    var wireFenceIndex;
    wireFenceIndex = yesNoArr.indexOf(wireFenceText[1]);
    pick(
        yesNoArr, wireFenceIndex,
        function (e) {
        Pages.pgPotaZemin.cntCourtForm.cntWireFence.edtWireFence.text = "Tel Örgü: " + yesNoArr[e.index];
        addCourtJSON.properties.wireFence = yesNoArr[e.index];
    },
        function () {},
        function () {});
}