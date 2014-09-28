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
        this.actionBar.title = 'Sahalar';
        this.actionBar.subtitle = 'Zemin-Pota-Çevre';
        this.actionBar.displayShowHomeEnabled = true;
        this.actionBar.icon = 'icon.png';
        this.actionBar.displayHomeAsUpEnabled = true;
        this.actionBar.onHomeIconItemSelected = function () {
            Pages.back();
        }
        var item1 = new SMF.UI.Android.MenuItem({
                id : '1',
                title : 'İleri',
                showAsAction : SMF.UI.Android.ShowAsAction.ifRoom,
                onSelected : function (e) {
                    //TODO: Add these 3 properties to the JSON data 
                    Pages.pgTakePhotos.show(SMF.UI.MotionEase.decelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.cover, false, false);
                }
            });
        this.actionBar.menuItems = [item1];
    } else {
        this.navigationItem.title = "Zemin-Pota-Çevre";
        var item1 = new SMF.UI.iOS.BarButtonItem({
                title : "İleri",
                onSelected : function () {
                    //TODO: Add these 3 properties to the JSON data
                    Pages.pgTakePhotos.show(SMF.UI.MotionEase.decelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.cover, false, false);
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