var lang = {};
function notifyLang() {
    for (var keyword in lang) {
        if (lang.hasOwnProperty(keyword)) {
            Data.notify('lang["' + keyword + '"]');
            Data.notify("lang['" + keyword + "']");
            Data.notify('lang.' + keyword);
        }
    }
}
function changeLang(languageCode, doNotify) {
    switch (languageCode) {
    case "en":
        lang = {
            "cancel" : "Cancel",
            "copy" : "Copy",
            "done" : "Done",
            "copyURL" : "Copy URL",
            "cut" : "Cut",
            "no" : "No",
            "ok" : "OK",
            "paste" : "Paste",
            "selectAll" : "Select All",
            "untitled" : "Untitled",
            "yes" : "Yes",
            "sureToDelete" : "Are you sure to delete?",
            "networkError": "There has been a network error, please try again later",
            "applicationError": "There has been an unhandled application error, please inform developers",
            "delete":"Delete"
        };
        break;
    case "tr":
        lang = {
            "cancel" : "İptal",
            "copy" : "Kopyala",
            "done" : "Tamam",
            "copyURL" : "Adresi Kopyala",
            "cut" : "Kes",
            "no" : "Hayır",
            "ok" : "Tamam",
            "paste" : "Yapıştır",
            "selectAll" : "Tamamını Seç",
            "untitled" : "Başlıksız",
            "yes" : "Evet",
            "sureToDelete" : "Silmek istediğinize emin misiniz?",
            "networkError": "Bir ağ bağlantı hatası oluştu, lütfen daha sonra tekrar deneyiniz",
            "applicationError": "Beklenmeyen bir hata oluştu, lütfen geliştiricileri bilgilendiriniz",
            "delete":"Sil"
        };
        break;
    case "de":
        lang = {
            "cancel" : "Stornieren",
            "copy" : "Kopieren",
            "done" : "Übersetzung",
            "copyURL" : "URL Kopieren",
            "cut" : "Schneiden",
            "no" : "Nein",
            "ok" : "Okay",
            "paste" : "Einfügen",
            "selectAll" : "Alle Auswählen",
            "untitled" : "Ohne Adelsrang",
            "yes" : "Ja",
            "sureToDelete" : "Sind Sie sicher zu löschen?",
            "networkError": "Es hat einen Netzwerkfehler, bitte versuchen Sie es später noch einmal",
            "applicationError": "Es ist ein nicht behandelter Anwendungsfehler gewesen, informieren Sie bitte Entwickler"
        };
        break;
    case "fi":
        lang = {
            "cancel" : "Keskeytä",
            "copy" : "Kopioi",
            "done" : "Käännös",
            "copyURL" : "Kopioi URL",
            "cut" : "Leikkaa",
            "no" : "Ei",
            "ok" : "OK",
            "paste" : "Liitä",
            "selectAll" : "Valitse Kaikki",
            "untitled" : "Nimetön",
            "yes" : "Kyllä",
            "sureToDelete" : "Haluatko varmasti poistaa?",
            "networkError": "Tapahtui verkkovirhe. Yritä myöhemmin uudelleen",
            "applicationError": "Tapahtui käsittelemätön virhe. Ilmoita sovelluksen kehittäjille"
        };
        break;
    }
    if (doNotify) {
        notifyLang();
    }
}