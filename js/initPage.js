/**********這個檔案是頁面 header/footer的初始化設定 **********/

var	i			= 0;

$(document).find("div[data-role='page']").each(function(){
	var pageid="";
	var sEval = "";
	
	pageid=$(this).attr('id');
	//產生頁面上方的回上頁/首頁按鈕
	$('#' + pageid).on('pagebeforecreate', function () {
		generateHeaderGoHomeButton(pageid);
	});

	//產生頁面下方的滑動選單
	if (i==0){	//第0頁的GA追蹤已經在initPhoneGap.js或ga.js執行過了，這裡不執行
		$('#' + pageid).one('pageshow', function () {
			generateFooterMenu();
		});
	}else{
		$('#' + pageid).one('pageshow', function () {
			generateFooterMenu();	//產生頁面下方的滑動選單
			GATrackPageView(pageid);//GA追蹤
		});
	}

	i++;
});

//若<a> 中有 "class=external"，點取連結時連到OS的 browser
$(document).on('click', ".external", function (e) {
	if (isRunInApp()){
		e.preventDefault();
		var targetURL = $(this).attr("href");
		var ref = window.open(targetURL, "_system", "");
	}
});

//hide the keyboard when input is actif，若不這樣做，當輸入文字時，螢幕下方的虛擬keyboard會將footer往上推，不只蓋住input box，可能會使點選input box的click事件變成click footer
$("input").blur(function() {
	$("[data-role=footer]").show();
});

$("input").focus(function() {
	$("[data-role=footer]").hide();
});
