/**
* Creates action(s) that are run when the user press the key of the devices.
* @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
* @this SMF.UI.Page
*/
function pgTakePhotos_Self_OnKeyPress(e) {
    if (e.keyCode == 4) {
        resetAllFields();
        Pages.back(Pages.pgAddInformation);
    }
}
/**
* Creates action(s) that are run when the page is appeared
* @param {EventArguments} e Returns some attributes about the specified functions
* @this SMF.UI.Page
*/
function pgTakePhotos_Self_OnShow(e) {
    if (Device.deviceOS == "Android") {
        this.actionBar.visible = true;
        this.actionBar.backgroundColor = '#F2F2F2';
        this.actionBar.displayShowTitleEnabled = true;
        this.actionBar.title = 'Sahalar v' + Application.version;
        this.actionBar.subtitle = 'Saha Fotoğrafları';
        this.actionBar.displayShowHomeEnabled = true;
        this.actionBar.icon = 'icon.png';
        this.actionBar.displayHomeAsUpEnabled = true;
        this.actionBar.onHomeIconItemSelected = function () {
            resetAllFields();
            Pages.back();
        }
        var itmFinish = new SMF.UI.Android.MenuItem({
                id : '1',
                title : 'BİTTİ',
                showAsAction : SMF.UI.Android.ShowAsAction.always,
                onSelected : function (e) {
                    resetAllFields();
                    Pages.back(Pages.pgAddInformation);
                }
            });
        this.actionBar.menuItems = [itmFinish];
    } else {
        this.navigationItem.title = "Saha Fotoğrafları";
        var item2 = new SMF.UI.iOS.BarButtonItem({
                title : "Geri",
                onSelected : function () {
                    resetAllFields();
                    Pages.back();
                }
            });
        this.navigationItem.leftBarButtonItems = [item2];
    }
}
/**
* Creates action(s) that are run when the object is pressed from device's screen.
* @param {EventArguments} e Returns some attributes about the specified functions
* @this SMF.UI.ImageButton
*/
function pgTakePhotos_imgBtnMainPhoto_OnPressed(e) {
    openCameraAndResize();
}
/**
* Creates action(s) that are run when the object is pressed from device's screen.
* @param {EventArguments} e Returns some attributes about the specified functions
* @this SMF.UI.ImageButton
*/
function pgTakePhotos_imgBtnFirstPhoto_OnPressed(e) {
    openCameraAndCrop(0);
}
/**
* Creates action(s) that are run when the object is pressed from device's screen.
* @param {EventArguments} e Returns some attributes about the specified functions
* @this SMF.UI.ImageButton
*/
function pgTakePhotos_imgBtnSecondPhoto_OnPressed(e) {
    openCameraAndCrop(1);
}
/**
* Creates action(s) that are run when the object is pressed from device's screen.
* @param {EventArguments} e Returns some attributes about the specified functions
* @this SMF.UI.ImageButton
*/
function pgTakePhotos_imgBtnThirdPhoto_OnPressed(e) {
    openCameraAndCrop(2);
}