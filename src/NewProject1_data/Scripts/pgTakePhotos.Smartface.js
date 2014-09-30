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
        this.actionBar.title = 'Sahalar';
        this.actionBar.subtitle = 'Saha Fotoğrafları';
        this.actionBar.displayShowHomeEnabled = true;
        this.actionBar.icon = 'icon.png';
        this.actionBar.displayHomeAsUpEnabled = true;
        this.actionBar.onHomeIconItemSelected = function () {
            Pages.back();
        }
        var item1 = new SMF.UI.Android.MenuItem({
                id : '1',
                title : 'Ekle',
                showAsAction : SMF.UI.Android.ShowAsAction.ifRoom,
                onSelected : function (e) {
                    //TODO: Show court information and wait for acceptance and then call add court service.
                    alert("Eklendi");
                }
            });
        this.actionBar.menuItems = [item1];
    } else {
        this.navigationItem.title = "Saha Fotoğrafları";
        var item1 = new SMF.UI.iOS.BarButtonItem({
                title : "Ekle",
                onSelected : function () {
                    //TODO: Show court information and wait for acceptance and then call add court service.
                    alert("Eklendi");
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