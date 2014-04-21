/**********這個檔案裡是一些公用的函數**********/

/**********全域變數**********/
var GAAccountId = "UA-44606446-3"							//Google Analytics 的帳號
var sServerBaseURL = "https://vshop.vibo.com.tw/myviboadmin/";	//Server端接收 request 的 URL 路徑

/**********Google Analytics的追蹤功能**********/
var gaPlugin;

function initGAPlugin(){	//初始化GA plugin，注意確認【GAAccountId=UA-36524249-6】參數是否正確
	//alert(isRunInApp());
	//alert('type='+typeof(window.plugins.gaPlugin));
	if (isRunInApp()){
		if (typeof(gaPlugin)!='object'){
			gaPlugin = window.plugins.gaPlugin;
			//alert('typeof(gaPlugin)=' + typeof(gaPlugin));
			gaPlugin.init(gaPluginResultHandler, gaPluginErrorHandler, GAAccountId, 10);
		}
	}
}
    
function GATrackPageView(pageName){
	//alert('p1');
	if (isRunInApp()){
	//alert('p2');
		if (gaPlugin!=null && typeof(gaPlugin)=='object'){
	//alert('p3');
			gaPlugin.trackPage( gaPluginResultHandler, gaPluginErrorHandler, pageName);
		}
	}else{
		//_gaq.push(['_trackPageview', pageName]);
		ga('send', 'pageview', pageName);
	}
}

function GATrackEvent(category, eventAction, eventLabel){
	if (isRunInApp()){
		if (gaPlugin!=null && typeof(gaPlugin)=='object'){
			gaPlugin.trackEvent( gaPluginResultHandler, gaPluginErrorHandler, category, eventAction, eventLabel, 0);
		}
	}else{
		//_gaq.push(['_trackEvent', category, eventAction, eventLabel]);	//紀錄至Google Analytics
		ga('send', 'event', category, eventAction, eventLabel, 4);	//紀錄至Google Analytics
	}
}

function gaPluginResultHandler(result){
	//alert('result:'+result);
}

function gaPluginErrorHandler(error){
	//alert('error:'+error);
}

/**********取得 server API 的 base URL**********/
function getServerBaseURL(){
	return sServerBaseURL;
}	//function getServerBaseURL(){

/**********判斷字串是否為空值**********/
function beEmpty(s){
	return (s==null || s=='undefined' || s.length<1);
}	//function scrollToTop(){

/**********判斷字串是否有值**********/
function notEmpty(s){
	return (s!=null && s!='undefined' && s.length>0);
}	//function scrollToTop(){

/**********將金額字串加上千位的逗點**********/
function toCurrency(s){
	if (beEmpty(s)) return "";	//字串為空
	if (isNaN(s))	return s;	//不是數字，回覆原字串
	
	var i = 0;
	var j = 0;
	var k = 0;
	var l = 0;
	var s2 = "";
	s = trim(s);
	i = s.length;			//i為字串長度
	if (i<4) return s;		//長度太短，不用加逗點，直接回覆原字串
	j = Math.floor(i/3);	//j為字串長度除以3的商數
	k = i % 3;				//k為字串長度除以3的餘數
	s2 = "";
	if (k>0) s2 = s.substring(0, k);
	for (l=0;l<j;l++){
		s2 = s2 + (s2==""?"":",") + s.substring(k+(l*3), k+(l+1)*3);
	}
	return s2;
}

/**********將字串的空白去掉**********/
function trim(stringToTrim){
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

/**********判斷字串開頭是否為指定的字**********/
String.prototype.startsWith = function(prefix)
{
    return (this.substr(0, prefix.length) === prefix);
}
 
/**********判斷字串結尾是否為指定的字**********/
String.prototype.endsWith = function(suffix)
{
    return (this.substr(this.length - suffix.length) === suffix);
}
 
/**********判斷字串是否包含指定的字**********/
String.prototype.contains = function(txt)
{
    return (this.indexOf(txt) >= 0);
}

/**********取得某個 URL 參數的值，例如 http://target.SchoolID/set?text=abc **********/
function getParameterByName( name ){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null )
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**********檢查email格式是否正確**********/
function isEmail(email) { 
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**********顯示loading中的BlockUI**********/
function showBlockUI(){
/*
	$.blockUI({
		message: '<img src="images/loading.gif">資料更新中，請稍候...</img>',
		css: {
			border: 'none',
			background: 'none',
			color: '#00FF00'
		},
		overlayCSS:{
			backgroundColor: '#000000',
			opacity:         0.5,
			cursor:          'wait'
		}
	});
*/
	
	$.blockUI({ 
		message: '<img src="images/loading.gif">資料更新中，請稍候...</img>',
		css:{
			border: 'none',
			padding: '15px',
			backgroundColor: '#000',
			'-webkit-border-radius': '10px',
			'-moz-border-radius': '10px',
			opacity: 0.95,
			color: '#00FF00'
		}
	}); 

	//$('.blockOverlay').attr('title','以滑鼠點擊灰色區域可回到主畫面').click($.unblockUI);	//若加這一行且有使用JQuery UI Tooltip，則這一行字在BlockUI關閉後仍會殘留在IE畫面上(Chrome不會)
	//$('.blockOverlay').click($.unblockUI);	//若加這一行且有使用JQuery UI Tooltip，則這一行字在BlockUI關閉後仍會殘留在IE畫面上(Chrome不會)

}

/**********解除BlockUI**********/
function unBlockUI(){
	$.unblockUI();
}

/**********判斷是否從APP中使用本網頁**********/
function isRunInApp(){
	var wl = window.location.href;
	var mob = (wl.indexOf("http://")<0 && wl.indexOf("https://")<0);
	return mob;
}

function getPlatformName(){
	var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iOS" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iOS" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "";
	return deviceType;
}

/**********取得今天日期，格式為：2013/10/3**********/
function getCurrentDate(){
	var currDate = new Date();	//目前時間
	var txtCurrDate = currDate.getFullYear() + "/" + (currDate.getMonth()+1) + "/" + currDate.getDate();	//今天日期，格式為：2013/10/3
	return txtCurrDate;
}

/**********取得儲存在client端的變數值(從PC cookie或手機storage取得)**********/
function getLocalValue(key){
	var value = "";
	if (isRunInApp()){	//PhoneGap，使用 local storage
		value = window.localStorage.getItem(key);
	}else{
		value = $.cookie(key);	//Browser，使用 cookie for JQuery
	}
	if (beEmpty(value)) value="";
	return value;
}

/**********將變數值儲存在client端(PC cookie或手機storage)**********/
function setLocalValue(key, value){
	if (beEmpty(key)) return;
	if (isRunInApp()){	//PhoneGap，使用 local storage
		window.localStorage.setItem(key, value);
	}else{
		$.cookie(key, value, { expires: 30, path: '/' });	//Browser，使用 cookie for JQuery，預設儲存30天
	}
	return;
}

/**********顯示類似alert的message box**********/
function MsgBox(msg, callbackClose){
	if (callbackClose==null){
		$(document).simpledialog2({ blankContent : "<p class='msgbox-text'>" + msg + "</p>" + "<a rel='close' data-role='button' href='#' class='msgbox-button'>關閉</a>", headerText: '系統通知', mode: 'blank', showModal: true, headerClose: true, animate: false, themeDialog: 'f'});
	}else{
		$(document).simpledialog2({ blankContent : "<p class='msgbox-text'>" + msg + "</p>" + "<a rel='close' data-role='button' href='#' class='msgbox-button'>關閉</a>", headerText: '系統通知', mode: 'blank', showModal: true, headerClose: true, animate: false, themeDialog: 'f', callbackClose: callbackClose });
	}
}

/**********顯示 multi page中的某個page**********/
function showPage(pageId){
	$.mobile.changePage(pageId,{transition: 'slide'});
}

/**********設定header區塊的高度，已經沒有在用了**********/
function setHeaderHeight(){
	var pageid = $.mobile.activePage.attr('id');
	var iHeight;
	/*
	iHeight = 47/window.devicePixelRatio;	//在 pixel ratio = 1 時，高度為 54
	if (iHeight<32) iHeight = 32;	//小於32的話，header上的button會跑到外面去
	*/
	iHeight = 40;
	/*以下資料改為寫在 style.css 中
	$("#" + pageid + " .ui-header").css('background-size', 'auto ' + iHeight + 'px');
	$("#" + pageid + " .ui-header").height(iHeight);
	*/
	var i = 0;
	$("#" + pageid + " div[data-role='header'] div[data-role='navbar']").each(function(){
	    //if (i==0) $(this).css('margin-top', iHeight);
	    iHeight += $(this).height();
	    i++;
	});
	if (i>0) $("#" + pageid + " .ui-header").height(iHeight);
}

/*******以下這個沒在用了***********/
function setHeaderHeightWithNavbar(){
	var pageid = $.mobile.activePage.attr('id');
	var iHeight;
	/*
	iHeight = 47/window.devicePixelRatio;	//在 pixel ratio = 1 時，高度為 54
	if (iHeight<32) iHeight = 32;	//小於32的話，header上的button會跑到外面去
	*/
	iHeight = 40;
	/*以下資料改為寫在 style.css 中
	$("#" + pageid + " div[data-role='header'] div[data-role='navbar']").css('margin-top', iHeight);
	$("#" + pageid + " .ui-header").css('background-size', 'auto ' + iHeight + 'px');
	*/
	$("#" + pageid + " .ui-header").height(iHeight + $("#" + pageid + " div[data-role='header'] div[data-role='navbar']").height());
}

/**********產生頁面下方的滑動選單，目前沒在用了**********/
function generateFooterMenu2(pageid){
	var s = "";
	$("#" + pageid + " #CarouselMenu").each(function(){
		if (pageid.indexOf('myBill')==0) s += "<div><a href='myBillInfo.html'><img src='images/tab-bill-dark.png' alt='帳單' /></a></div>";
		else s += "<div><a href='myBillInfo.html'><img src='images/tab-bill-light.png' alt='帳單' /></a></div>";
		s += "<div><a href='#myService'><img src='images/tab-service-light.png' alt='服務' /></a></div>";
		s += "<div><img src='images/tab-personal-data-light.png' alt='個資' /></div>";
		s += "<div><img src='images/tab-pay-light.png' alt='繳費' /></div>";
		s += "<div><img src='images/tab-recommend-light.png' alt='推薦' /></div>";
		s += "<div><img src='images/tab-query-light.png' alt='查詢' /></div>";
		s += "<div><img src='images/tab-customer-service-light.png' alt='客服' /></div>";
		s += "<div><img src='images/tab-settings-light.png' alt='設定' /></div>";
		//$(window).width()/4
		//alert(screen.width);
		s = "<div id='scroller'>" + s + "</div>";
		$('#' + pageid + ' #CarouselMenu').html(s);
		
		//$('#' + pageid + ' #CarouselMenu a.ui-link').css('height', 0);
		$('#' + pageid + ' #CarouselMenu img').css('width', screen.width/4);
		$('#' + pageid + ' #CarouselMenu img').css('height', screen.width*3/4/4);
		$(this).css('width', screen.width);
		$('#' + pageid + ' #CarouselMenu #scroller').css('height', screen.width*3/4/4);
		$('#' + pageid + ' #CarouselMenu #scroller').css('width', screen.width*2.5);
		alert($('#' + pageid + ' #CarouselMenu').outerHeight(true));

		//alert('img height:'+$('#' + pageid + ' #CarouselMenu img').css('height'));

		var myScroll;
		myScroll = new iScroll('CarouselMenu', { vScroll: false, hScrollbar: false, vScrollbar: false });
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

		$('#' + pageid).on({ 'swipeleft' : function(e){ e.preventDefault(); } });
		$('#' + pageid).on({ 'swiperight' : function(e){ e.preventDefault(); } });
		//$('#' + pageid + ' #CarouselMenu').on({ 'swipeleft' : function(e){ alert('left');$('#' + pageid + ' #CarouselMenu').trigger("prevPage"); } });
		//$('#' + pageid + ' #CarouselMenu').on({ 'swiperight' : function(e){ alert('right');$('#' + pageid + ' #CarouselMenu').trigger("nextPage"); } });
	
		//$('#' + pageid + ' .ui-content').css('margin-bottom', $('#' + pageid + " div[data-role='footer']").height() - 50);
		//alert($('#' + pageid + ' .ui-content').css('margin-bottom'));
		 
		//$('#wrapper').css('height', $(window).height() - $('#' + pageid + " div[data-role='footer']").height() - $('#' + pageid + " div[data-role='header']").height());
		//alert($('#' + pageid + " .content:visible").height());
		//alert($('#' + pageid + " div[data-role='footer']").height());
	});
}


/**********產生頁面下方的滑動選單**********/
function generateFooterMenu(){
	var pageid = $.mobile.activePage.attr('id');
	var s = "";
	var i = 0;
	var j = 0;	//起始的位置
	var aPic = new Array();
	var aLink = new Array();
	var bLogin = isLogin();	//判斷用戶是否已登入
	var sAction = (bLogin?"":" onclick=\"MsgBox('此功能需先登入才能使用!');return false;\" ");
	
	if (!bLogin) {aPic[i] = "tab-bill.png";} else { if (pageid.startsWith('myBill'))			{aPic[i] = "tab-bill-dark.png";				j=0;} else aPic[i] = "tab-bill-light.png";} i++;
	if (!bLogin) {aPic[i] = "tab-service.png";} else { if (pageid.startsWith('myService'))		{aPic[i] = "tab-service-dark.png";			j=1;} else aPic[i] = "tab-service-light.png";} i++;
	if (!bLogin) {aPic[i] = "tab-personal-data.png";} else { if (pageid.startsWith('myData'))	{aPic[i] = "tab-personal-data-dark.png";	j=2;} else aPic[i] = "tab-personal-data-light.png";} i++;
	if (!bLogin) {aPic[i] = "tab-pay.png";} else { if (pageid.startsWith('myPay'))				{aPic[i] = "tab-pay-dark.png";				j=3;} else aPic[i] = "tab-pay-light.png";} i++;
	if (pageid.startsWith('myRecommand'))	{aPic[i] = "tab-recommend-dark.png";		j=4;} else aPic[i] = "tab-recommend-light.png"; i++;
	if (pageid.startsWith('myQuery'))		{aPic[i] = "tab-query-dark.png";			j=5;} else aPic[i] = "tab-query-light.png"; i++;
	if (pageid.startsWith('myCustomer'))	{aPic[i] = "tab-customer-service-dark.png";	j=6;} else aPic[i] = "tab-customer-service-light.png"; i++;
	if (pageid.startsWith('myWifi'))		{aPic[i] = "tab-wifi-dark.png";				j=7;} else aPic[i] = "tab-wifi-light.png"; i++;
	if (pageid.startsWith('mySettings'))	{aPic[i] = "tab-settings-dark.png";			j=8;} else aPic[i] = "tab-settings-light.png"; i++;
	i = 0;
	aLink[i] = (bLogin?"myBill.html":"#")		+ "' " + sAction + "class='CarouselMustLogin"; i++;		//帳單
	aLink[i] = (bLogin?"myService.html":"#")	+ "' " + sAction + "class='CarouselMustLogin"; i++;		//服務
	aLink[i] = (bLogin?"myData.html":"#")		+ "' " + sAction + "class='CarouselMustLogin"; i++;		//個資
	aLink[i] = (bLogin?"myPay.html":"#")		+ "' " + sAction + "class='CarouselMustLogin"; i++;		//繳費
	aLink[i] = "myRecommand.html"; i++;	//推薦
	aLink[i] = "myQuery.html"; i++;		//查詢
	aLink[i] = "myCustomer.html'"; i++;	//客服
	aLink[i] = "myWifi.html'"; i++;		//WiFi熱點
	aLink[i] = "mySettings.html'"; i++;	//設定
	//alert('screen.width='+screen.width);
	//alert('window.devicePixelRatio=' + window.devicePixelRatio);
	//var devicePixelRatio = window.devicePixelRatio;
	/*
	if (isRunInApp()){
		//var devicePlatform = device.platform;
		var devicePlatform = getPlatformName();
		//alert('devicePlatform='+devicePlatform);
		if (devicePlatform=='iOS') devicePixelRatio = 1;	//iOS不用理window.devicePixelRatio的值，只有Android才要理他
	}
	*/
	//alert(devicePixelRatio);
	//alert(screen.width);
	//alert($(window).width());
	$("#" + pageid + " #CarouselMenu").each(function(){
		for (i=0;i<9;i++){
			s += "<a href='" + aLink[i] + "' rel='external'><div style='background-image:url(images/" + aPic[i] + ");'><span>&nbsp;</span></div></a>";
		}
		$('#' + pageid + ' #CarouselMenu').html("<div id='CarouselMenuItems'>" + s + "</div><div style='float:none;clear:both;'></div>");
		/*
		$('#' + pageid + ' #CarouselMenu #CarouselMenuItems div').css('width', screen.width/4/devicePixelRatio);
		$('#' + pageid + ' #CarouselMenu #CarouselMenuItems img').css('width', screen.width/4/devicePixelRatio);
		*/
		$('#' + pageid + ' #CarouselMenu #CarouselMenuItems div').css('width', $(window).width()/4);
		$('#' + pageid + ' #CarouselMenu #CarouselMenuItems img').css('width', $(window).width()/4);
		
		/*
		$('#' + pageid + ' #CarouselMenu #CarouselMenuItems div').css('height', screen.width*3/4/4/devicePixelRatio);
		$('#' + pageid + ' #CarouselMenu #CarouselMenuItems img').css('height', screen.width*3/4/4/devicePixelRatio);
		*/
		$('#' + pageid + ' #CarouselMenu #CarouselMenuItems div').css('height', $(window).width()*3/4/4);
		$('#' + pageid + ' #CarouselMenu #CarouselMenuItems img').css('height', $(window).width()*3/4/4);
		$('#' + pageid + ' #CarouselMenu #CarouselMenuItems').carouFredSel({
			items: {
				visible: 4,
				start: j
			},
			width: $(window).width(),
			height: $(window).width()*3/4/4,
			responsive: false,
			auto: false,
			padding: [0, 0, 0, 0],
			scroll: {
				items: 4,
				duration: 500
			},
			swipe: {
				onMouse: true,
				onTouch: true
			}
		});
		$('#' + pageid).on({ 'swipeleft' : function(e){ e.preventDefault(); } });
		$('#' + pageid).on({ 'swiperight' : function(e){ e.preventDefault(); } });
		//$('#' + pageid + ' #CarouselMenu').on({ 'swipeleft' : function(e){ alert('left');$('#' + pageid + ' #CarouselMenu').trigger("prevPage"); } });
		//$('#' + pageid + ' #CarouselMenu').on({ 'swiperight' : function(e){ alert('right');$('#' + pageid + ' #CarouselMenu').trigger("nextPage"); } });
	
		//$('#' + pageid + ' .ui-content').css('margin-bottom', $('#' + pageid + " div[data-role='footer']").height() - 50);
		//alert($('#' + pageid + ' .ui-content').css('margin-bottom'));
		 
		//$('#wrapper').css('height', $(window).height() - $('#' + pageid + " div[data-role='footer']").height() - $('#' + pageid + " div[data-role='header']").height());
		//alert($('#' + pageid + " .content:visible").height());
		//alert($('#' + pageid + " div[data-role='footer']").height());
	});
}

/**********產生頁面上方header中的回首頁按鈕**********/
function generateHeaderGoHomeButton(pageid){
	//var pageid = $.mobile.activePage.attr('id');
	var s = "";
	s += "<div data-role='controlgroup' data-type='horizontal' class='ui-btn-right'>";
    s += "<a href='#' data-role='button' data-rel='back' data-icon='back' data-theme='g'>上頁</a>";
    s += "<a href='index.html' data-role='button' data-icon='home' rel='external' data-theme='g'>首頁</a>";
	s += "</div>";
	if (beEmpty(pageid)){	//沒傳入pageid，把multi page中的每個page都加上回首頁按鈕
		$("div[data-role='header']").each(function(){
			//$(this).append("<a class='btnGoHome' href='index.html' class='ui-btn-right' data-icon='home' rel='external'>首頁</a>");
			$(this).append(s);
		});
		/*
		$("div[data-role='page']").each(function(){
			$(this).trigger('create');
		});
		*/
	}else{	//只加到某個page的header
		//$("#" + pageid + " div[data-role='header']").append("<a id='btnGoHome' href='index.html' class='ui-btn-right' data-icon='home' rel='external'>首頁</a>");
		$("#" + pageid + " div[data-role='header']").append(s);
		//$("#" + pageid).trigger('create');
		//$("#" + pageid + " #btnGoHome").button().addClass('ui-btn-active');
	}
}

/**********將頁面上方navbar中的某個項目設為已選取(active)**********/
function hightlightNavbarItem(i, j){
	var pageid = $.mobile.activePage.attr('id');
	if (beEmpty(j)){	//只有一個 navbar
		$("#" + pageid + " div[data-role='header'] div[data-role='navbar'] ul li a").eq(i).removeClass('ui-btn-active').addClass('ui-btn-active');
	}else{	//有兩個navbar
		var i = 0;
		$("#" + pageid + " div[data-role='header'] div[data-role='navbar']").each(function(){
			//alert($(this, 'li').find('a').eq(1).html());
			if (i==0) $(this, 'li').find('a').eq(i).removeClass('ui-btn-active').addClass('ui-btn-active');
			else $(this, 'li').find('a').eq(j).removeClass('ui-btn-active').addClass('ui-btn-active');
			i++;
		});
	}
}

/**********從 Server 擷取資料**********/
function getDataFromServer(sProgram, sData, sResponseType, SuccessCallback, bBlockUI){
	/*****************************************************************
	sProgram		server端程式名稱，例如 xxx.jsp
	sData			要post給server的資料
	sResponseType	希望server端回覆的資料類型，可為 json 或 xml
	SuccessCallback	成功從server取得資料時的處理程式(function)
	bBlockUI		是否顯示BlockUI，若未輸入此參數則預設為顯示BlockUI
	*****************************************************************/
	if (beEmpty(bBlockUI)) bBlockUI = true;
	if (beEmpty(sData)) sData = "ResponseType=" + sResponseType; else sData += "&ResponseType=" + sResponseType;
	$.ajax({
		url: sServerBaseURL + sProgram,
		type: 'POST', //根據實際情況，可以是'POST'或者'GET'
		beforeSend : (bBlockUI==true?showBlockUI:null),
		complete   : (bBlockUI==true?unBlockUI:null),
		data: sData,
		dataType: sResponseType, //指定數據類型，注意server要有一行：response.setContentType("text/xml;charset=utf-8");
		timeout: 60000, //設置timeout時間，以千分之一秒為單位，1000 = 1秒
		error: function (){	//錯誤提示
			MsgBox('系統忙碌中，請稍候再試!!');
		},
		success: function (data){ //ajax請求成功後do something with response data
			SuccessCallback(data);
		}	//success: function (data){ //ajax請求成功後do something with response data
	});	//$.ajax({
	return false;
}	//function sServerBaseURL(sProgram, sData, sResponseType, SuccessCallback){

/**********未登入卻嘗試使用需登入才能使用的服務時的警告視窗**********/
function alertNoLogin(){
	alert('請先至首頁登入再執行此功能!!');
	location.href='index.html';
}

function isLogin(){	//檢查目前用戶是否已登入
	var msisdn = getLocalValue('loginmsisdn');
	var contractid = getLocalValue('logincontractid');
	var customerid = getLocalValue('logincustomerid');
	var password = getLocalValue('loginpassword');

	if (beEmpty(msisdn) || beEmpty(contractid) || beEmpty(customerid) || beEmpty(password)){
		return false;
	}else{
		return true;
	}
}	//function isLogin(){	//檢查目前用戶是否已登入

/**********清除登入資料**********/
function clearLoginInfo(){
	setLocalValue('loginmsisdn', '');	//將門號清空
	setLocalValue('logincontractid', '');	//將ContractId清空
	setLocalValue('logincustomerid', '');	//將CustomerId清空
	setLocalValue('loginpassword', '');	//將Password清空
	//setLocalValue('msisdn', '');	//一併清除已紀錄的門號資訊
	//setLocalValue('password', '');
}

/**********將門號及密碼送給server重新檢查，若有問題就自動登出**********/
function userAuthentication(){
	var msisdn = getLocalValue('loginmsisdn');
	var contractid = getLocalValue('logincontractid');
	var customerid = getLocalValue('logincustomerid');
	var password = getLocalValue('loginpassword');

	if (beEmpty(msisdn) || beEmpty(contractid) || beEmpty(customerid) || beEmpty(password)){
		clearLoginInfo();
		GATrackEvent('用戶強迫登出', msisdn + ':' + contractid, '');
		alert('您的登入資料有誤，請重新登入');
		location.href='index.html';
		return;
	}
	
	var sData = "";
	sData = "Function=DoAuthCheck&Request=";
	sData += "<MSISDN>" + msisdn + "</MSISDN>";
	sData += "<Password>" + password + "</Password>";
	getDataFromServer("ajaxBSCAPIBridge.jsp", sData, "xml", function(xml){
		var ResultCode = $(xml).find("ResultCode").text();
		var ResultText = $(xml).find("ResultText").text();
		if (ResultCode!='00000'){	//作業失敗
			clearLoginInfo();
			GATrackEvent('用戶登入資料有誤，強迫登出', msisdn + ':' + contractid, '');
			alert('登入資訊檢核失敗，請至首頁重新登入：' + ResultText);
			location.href='index.html';
			return;
		}	//if (ResultCode=='00000'){	//作業成功

		var contractid1 = $(xml).find("ContractId").text();
		var customerid1 = $(xml).find("CustomerId").text();
		if (contractid1!=contractid || customerid1!=customerid){
			clearLoginInfo();
			GATrackEvent('用戶門號資料需更新，強迫登出', msisdn + ':' + contractid, '');
			alert('您的門號資料需更新，請至首頁重新登入。');
			location.href='index.html';
			return;
		}
	}, false);	//getDataFromServer("ajaxBSCAPIBridge.jsp", sData, "xml", function(xml){
}