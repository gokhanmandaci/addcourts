function pgTakePhotos_Self_OnKeyPress(e) {
    if (e.keyCode == 4) {
        Pages.back();
    }
}
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
            Pages.back();
        }
        var item1 = new SMF.UI.Android.MenuItem({
                id : '1',
                title : 'TAMAMLA',
                showAsAction : SMF.UI.Android.ShowAsAction.ifRoom,
                onSelected : function (e) {
                    resetAllFields();
                }
            });
        this.actionBar.menuItems = [item1];
    } else {
        this.navigationItem.title = "Saha Fotoğrafları";
        var item2 = new SMF.UI.iOS.BarButtonItem({
                title : "Geri",
                onSelected : function () {
                    Pages.back();
                }
            });
        this.navigationItem.leftBarButtonItems = [item2];
    }
}
function pgTakePhotos_imgBtnMainPhoto_OnPressed(e){
    openCameraAndResize();
}
function pgTakePhotos_imgBtnFirstPhoto_OnPressed(e){
    openCameraAndCrop(0);
}
function pgTakePhotos_imgBtnSecondPhoto_OnPressed(e){
    openCameraAndCrop(1);
}
function pgTakePhotos_imgBtnThirdPhoto_OnPressed(e){
    openCameraAndCrop(2);
}