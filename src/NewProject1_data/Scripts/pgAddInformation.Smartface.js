function runValidationAddInformation() {
    var alertStr = "";
    if (Pages.pgAddInformation.svCourtForm.cntCourtForm.cntName.edtName.text == "") {
        alertStr += "Lütfen saha ismi alanını doldurunuz. \n\n";
    }
    if (Pages.pgAddInformation.svCourtForm.cntCourtForm.cntDescription.edtDescription.text == "") {
        alertStr += "Lütfen saha açıklaması yapınız. \n\n";
    }
    if (Pages.pgAddInformation.svCourtForm.cntCourtForm.cntPublicAccessible.edtPublicAccessible.text == "") {
        alertStr += "Lütfen halka açık mı alanını seçiniz. \n\n";
    }
    if (Pages.pgAddInformation.svCourtForm.cntCourtForm.cntOpenHours.edtOpenHours.text == "") {
        alertStr += "Lütfen kapanış saatini seçiniz. \n\n";
    }
    if (Pages.pgAddInformation.svCourtForm.cntCourtForm.cntIsIndoor.edtIsIndoor.text == "") {
        alertStr += "Lütfen saha tipini seçiniz. \n\n";
    }
    if (Pages.pgAddInformation.svCourtForm.cntCourtForm.cntHasLighting.edtHasLighting.text == "") {
        alertStr += "Lütfen ışıklandırma alanını seçiniz. \n\n";
    }
    if (Pages.pgAddInformation.svCourtForm.cntCourtForm.cntCategory.edtCategory.text == "") {
        alertStr += "Lütfen mekan alanını seçiniz. \n\n";
    }
    if (Pages.pgAddInformation.svCourtForm.cntCourtForm.cntBasketCount.edtBasketCount.text == "") {
        alertStr += "Lütfen pota sayısını seçiniz. \n\n";
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
        Pages.pgPotaZemin.show(SMF.UI.MotionEase.decelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.cover, false, false);
    }
}
function pgAddInformation_Self_OnKeyPress(e) {
    if (e.keyCode === 4) {
        Application.exit();
    }
}
function pgAddInformation_Self_OnShow() {
    if (Device.deviceOS == "Android") {
        this.actionBar.visible = true;
        this.actionBar.backgroundColor = '#F2F2F2';
        this.actionBar.displayShowTitleEnabled = true;
        this.actionBar.title = 'Sahalar v' + Application.version;
        this.actionBar.subtitle = 'Saha Özellikleri';
        this.actionBar.displayShowHomeEnabled = true;
        this.actionBar.icon = 'icon.png';
        var item1 = new SMF.UI.Android.MenuItem({
                id : '1',
                title : 'İLERİ',
                showAsAction : SMF.UI.Android.ShowAsAction.ifRoom,
                onSelected : function (e) {
                    //TODO: change this with service usage and validations
                    runValidationAddInformation();
                    //Pages.pgPotaZemin.show(SMF.UI.MotionEase.decelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.cover, false, false);
                }
            });
        this.actionBar.menuItems = [item1];
    } else {
        this.navigationItem.title = "Saha Özellikleri";
        var item1 = new SMF.UI.iOS.BarButtonItem({
                title : "İleri",
                onSelected : function () {
                    //TODO: change this with service usage and validations
                    runValidationAddInformation();
                    //Pages.pgPotaZemin.show(SMF.UI.MotionEase.decelerating, SMF.UI.TransitionEffect.rightToLeft, SMF.UI.TransitionEffectType.cover, false, false);
                }
            });
        this.navigationItem.rightBarButtonItems = [item1];
    }
    if (isMyCheckUpdate) {
        myCheckUpdate();
    }
}
function pgAddInformation_txtPublicSelector_OnPressed(e) {
    var isPublicText = Pages.pgAddInformation.svCourtForm.cntCourtForm.cntPublicAccessible.edtPublicAccessible.text.split(": ");
    var isPublicIndex;
    isPublicIndex = yesNoArr.indexOf(isPublicText[1]);
    pick(
        yesNoArr, isPublicIndex,
        function (e) {
        Pages.pgAddInformation.svCourtForm.cntCourtForm.cntPublicAccessible.edtPublicAccessible.text = "Halka açık mı: " + yesNoArr[e.index];
        addCourtJSON.properties.isPublicAccessible = yesNoArr[e.index];
    },
        function () {},
        function () {});
}
function pgAddInformation_txtOpenHoursSelector_OnPressed(e) {
    var openHoursText = Pages.pgAddInformation.svCourtForm.cntCourtForm.cntOpenHours.edtOpenHours.text.split(": ");
    var openHoursIndex;
    openHoursIndex = openHoursArr.indexOf(openHoursText[1]);
    pick(
        openHoursArr, openHoursIndex,
        function (e) {
        Pages.pgAddInformation.svCourtForm.cntCourtForm.cntOpenHours.edtOpenHours.text = "Kapanış saati: " + openHoursArr[e.index];
        addCourtJSON.properties.openHours = openHoursArr[e.index];
    },
        function () {},
        function () {});
}
function pgAddInformation_txtIsIndoorSelector_OnPressed(e) {
    var indoorText = Pages.pgAddInformation.svCourtForm.cntCourtForm.cntIsIndoor.edtIsIndoor.text.split(": ");
    var indoorIndex;
    indoorIndex = isIndoorArr.indexOf(indoorText[1]);
    pick(
        isIndoorArr, indoorIndex,
        function (e) {
        Pages.pgAddInformation.svCourtForm.cntCourtForm.cntIsIndoor.edtIsIndoor.text = "Saha tipi: " + isIndoorArr[e.index];
        addCourtJSON.properties.isIndoor = isIndoorArr[e.index];
    },
        function () {},
        function () {});
}
function pgAddInformation_txtHasLightingSelector_OnPressed(e) {
    var hasLightingText = Pages.pgAddInformation.svCourtForm.cntCourtForm.cntHasLighting.edtHasLighting.text.split(": ");
    var hasLightingIndex;
    hasLightingIndex = yesNoArr.indexOf(hasLightingText[1]);
    pick(
        yesNoArr, hasLightingIndex,
        function (e) {
        Pages.pgAddInformation.svCourtForm.cntCourtForm.cntHasLighting.edtHasLighting.text = "Işıklandırması var mı: " + yesNoArr[e.index];
        addCourtJSON.properties.hasLighting = yesNoArr[e.index];
    },
        function () {},
        function () {});
}
function pgAddInformation_txtCategorySelector_OnPressed(e) {
    var categoryText = Pages.pgAddInformation.svCourtForm.cntCourtForm.cntCategory.edtCategory.text.split(": ");
    var categoryIndex;
    categoryIndex = categoryArr.indexOf(categoryText[1]);
    pick(
        categoryArr, categoryIndex,
        function (e) {
        Pages.pgAddInformation.svCourtForm.cntCourtForm.cntCategory.edtCategory.text = "Mekan: " + categoryArr[e.index];
        addCourtJSON.properties.category = categoryArr[e.index];
    },
        function () {},
        function () {});
}
function pgAddInformation_txtBasketCount_OnPressed(e) {
    var basketCountText = Pages.pgAddInformation.svCourtForm.cntCourtForm.cntBasketCount.edtBasketCount.text.split(": ");
    var basketCountIndex;
    basketCountIndex = basketCountArr.indexOf(basketCountText[1]);
    pick(
        basketCountArr, basketCountIndex,
        function (e) {
        Pages.pgAddInformation.svCourtForm.cntCourtForm.cntBasketCount.edtBasketCount.text = "Pota Sayısı: " + basketCountArr[e.index];
        addCourtJSON.properties.basketCount = basketCountArr[e.index];
    },
        function () {},
        function () {});
}
function pgAddInformation_edtName_OnExit(e) {
    try {
        if (Pages.pgAddInformation.svCourtForm.cntCourtForm.cntName.edtName.text != "") {
            addCourtJSON.name = Pages.pgAddInformation.svCourtForm.cntCourtForm.cntName.edtName.text;
        }
    } catch (ex) {
        alert(ex);
    }
}
function pgAddInformation_edtDescription_OnExit(e) {
    if (Pages.pgAddInformation.svCourtForm.cntCourtForm.cntDescription.edtDescription.text != "") {
        addCourtJSON.properties.description = Pages.pgAddInformation.svCourtForm.cntCourtForm.cntDescription.edtDescription.text;
    }
}