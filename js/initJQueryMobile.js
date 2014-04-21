/**********這個檔案是 JQuery Mobile 的初始化設定 **********/

$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.defaultPageTransition="slide";
	$.mobile.defaultDialogTransition="slideup";
	$.mobile.loadingMessage="資料更新中，請稍候...";
	$.mobile.pageLoadErrorMessage="無法載入頁面!";
	$.mobile.loader.prototype.options.text = "請稍候...";
	$.mobile.loader.prototype.options.textVisible = true;
	$.mobile.loader.prototype.options.textonly = false;
	$.mobile.loader.prototype.options.theme = "a";
	$.mobile.page.prototype.options.addBackBtn=false;
	$.mobile.page.prototype.options.backBtnText = "上頁";
	$.mobile.page.prototype.options.backBtnTheme = "f";
	$.mobile.page.prototype.options.theme="f";
	$.mobile.page.prototype.options.headerTheme="f";
	$.mobile.page.prototype.options.footerTheme="f";
	$.mobile.page.prototype.options.contentTheme="f";
	$.mobile.listview.prototype.options.theme="f";
	$.mobile.listview.prototype.options.countTheme="f";
	$.mobile.listview.prototype.options.dividerTheme="f";
	$.mobile.listview.prototype.options.filterTheme="f";
	$.mobile.button.prototype.options.theme="f";
	$.mobile.textinput.prototype.options.theme="f";
	$.mobile.checkboxradio.prototype.options.theme="f";
	$.mobile.selectmenu.prototype.options.theme="f";
	//$.mobile.fixedtoolbar.prototype.options.tapToggle = false;
	//$.mobile.fixedtoolbar.prototype.options.hideDuringFocus = "";
});
