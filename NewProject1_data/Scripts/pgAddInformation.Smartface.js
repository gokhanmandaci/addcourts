function runValidationAddInformation() {
    var alertStr = "";
    if (Pages.pgAddInformation.cntCourtForm.cntName.edtName.text == "") {
        alertStr += "Lütfen saha ismi alanını doldurunuz. \n\n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntDescription.edtDescription.text == "") {
        alertStr += "Lütfen saha açıklaması yapınız. \n\n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntPublicAccessible.edtPublicAccessible.text == "") {
        alertStr += "Lütfen halka açık mı alanını seçiniz. \n\n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntOpenHours.edtOpenHours.text == "") {
        alertStr += "Lütfen kapanış saatini seçiniz. \n\n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntIsIndoor.edtIsIndoor.text == "") {
        alertStr += "Lütfen saha tipini seçiniz. \n\n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntHasLighting.edtHasLighting.text == "") {
        alertStr += "Lütfen ışıklandırma alanını seçiniz. \n\n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntCategory.edtCategory.text == "") {
        alertStr += "Lütfen mekan alanını seçiniz. \n\n";
    }
    if (Pages.pgAddInformation.cntCourtForm.cntBasketCount.edtBasketCount.text == "") {
        alertStr += "Lütfen pota sayısını seçiniz. \n\n";
    }
    if (alertStr != "") {
        alert({
            title : 'Uyarı',
            message : alertStr,
            firstButtonText : "Tamam",
            OnFirstButtonPressed : function () {
                //bos
            }
        });
    } else {
        Pages.pgPotaZemin.show(SMF.UI.MotionEase.decelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.cover, false, false);
    }
}
function pgAddInformation_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Application.exit();
    }
}
function pgAddInformation_Self_OnShow() {
    Device.setGPSStatus(true);
    if (Device.deviceOS == "Android") {
        this.actionBar.visible = true;
        this.actionBar.backgroundColor = '#F2F2F2';
        this.actionBar.displayShowTitleEnabled = true;
        this.actionBar.title = 'Sahalar';
        this.actionBar.subtitle = 'Saha Özellikleri';
        this.actionBar.displayShowHomeEnabled = true;
        this.actionBar.icon = 'icon.png';
        var item1 = new SMF.UI.Android.MenuItem({
                id : '1',
                title : 'İleri',
                showAsAction : SMF.UI.Android.ShowAsAction.ifRoom,
                onSelected : function (e) {
                    runValidationAddInformation();
                }
            });
        this.actionBar.menuItems = [item1];
    } else {
        this.navigationItem.title = "Saha Özellikleri";
        var item1 = new SMF.UI.iOS.BarButtonItem({
                title : "İleri",
                onSelected : function () {
                    runValidationAddInformation();
                }
            });
        this.navigationItem.rightBarButtonItems = [item1];
    }
}
function pgAddInformation_txtPublicSelector_OnPressed(e) {
    var isPublicText = Pages.pgAddInformation.cntCourtForm.cntPublicAccessible.edtPublicAccessible.text.split(": ");
    var isPublicIndex;
    isPublicIndex = yesNoArr.indexOf(isPublicText[1]);
    pick(
        yesNoArr, isPublicIndex,
        function (e) {
        Pages.pgAddInformation.cntCourtForm.cntPublicAccessible.edtPublicAccessible.text = "Halka açık mı: " + yesNoArr[e.index];
        addCourtJSON.properties.isPublicAccessible = yesNoArr[e.index];
    },
        function () {},
        function () {});
}
function pgAddInformation_txtOpenHoursSelector_OnPressed(e) {
    var openHoursText = Pages.pgAddInformation.cntCourtForm.cntOpenHours.edtOpenHours.text.split(": ");
    var openHoursIndex;
    openHoursIndex = openHoursArr.indexOf(openHoursText[1]);
    pick(
        openHoursArr, openHoursIndex,
        function (e) {
        Pages.pgAddInformation.cntCourtForm.cntOpenHours.edtOpenHours.text = "Kapanış saati: " + openHoursArr[e.index];
        addCourtJSON.properties.openHours = openHoursArr[e.index];
    },
        function () {},
        function () {});
}
function pgAddInformation_txtIsIndoorSelector_OnPressed(e) {
    var indoorText = Pages.pgAddInformation.cntCourtForm.cntIsIndoor.edtIsIndoor.text.split(": ");
    var indoorIndex;
    indoorIndex = isIndoorArr.indexOf(indoorText[1]);
    pick(
        isIndoorArr, indoorIndex,
        function (e) {
        Pages.pgAddInformation.cntCourtForm.cntIsIndoor.edtIsIndoor.text = "Saha tipi: " + isIndoorArr[e.index];
        addCourtJSON.properties.isIndoor = isIndoorArr[e.index];
    },
        function () {},
        function () {});
}
function pgAddInformation_txtHasLightingSelector_OnPressed(e) {
    var hasLightingText = Pages.pgAddInformation.cntCourtForm.cntHasLighting.edtHasLighting.text.split(": ");
    var hasLightingIndex;
    hasLightingIndex = yesNoArr.indexOf(hasLightingText[1]);
    pick(
        yesNoArr, hasLightingIndex,
        function (e) {
        Pages.pgAddInformation.cntCourtForm.cntHasLighting.edtHasLighting.text = "Işıklandırması var mı: " + yesNoArr[e.index];
        addCourtJSON.properties.hasLighting = yesNoArr[e.index];
    },
        function () {},
        function () {});
}
function pgAddInformation_txtCategorySelector_OnPressed(e) {
    var categoryText = Pages.pgAddInformation.cntCourtForm.cntCategory.edtCategory.text.split(": ");
    var categoryIndex;
    categoryIndex = categoryArr.indexOf(categoryText[1]);
    pick(
        categoryArr, categoryIndex,
        function (e) {
        Pages.pgAddInformation.cntCourtForm.cntCategory.edtCategory.text = "Mekan: " + categoryArr[e.index];
        addCourtJSON.properties.category = categoryArr[e.index];
    },
        function () {},
        function () {});
}
function pgAddInformation_txtBasketCount_OnPressed(e) {
    var basketCountText = Pages.pgAddInformation.cntCourtForm.cntBasketCount.edtBasketCount.text.split(": ");
    var basketCountIndex;
    basketCountIndex = basketCountArr.indexOf(basketCountText[1]);
    pick(
        basketCountArr, basketCountIndex,
        function (e) {
        Pages.pgAddInformation.cntCourtForm.cntBasketCount.edtBasketCount.text = "Işıklandırması var mı: " + basketCountArr[e.index];
        addCourtJSON.properties.basketCount = basketCountArr[e.index];
    },
        function () {},
        function () {});
}
function pgAddInformation_edtName_OnExit(e) {
    if (Pages.pgAddInformation.cntCourtForm.cntName.edtName.text != "") {
        addCourtJSON.name = Pages.pgAddInformation.cntCourtForm.cntName.edtName.text;
    }
}
function pgAddInformation_edtDescription_OnExit(e){
    if (Pages.pgAddInformation.cntCourtForm.cntDescription.edtDescription.text != "") {
        addCourtJSON.properties.description = Pages.pgAddInformation.cntCourtForm.cntDescription.edtDescription.text;
    }
}