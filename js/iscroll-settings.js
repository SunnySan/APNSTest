/**********這個檔案裡是 iscroll4 的啟動設定**********/

/**********初始化**********/
var myScroll = new Array();
var myScrollIndex = 0;
function initIscroll() {
	if (myScroll!=null && myScroll.length>0){
		var i = 0;
		for (i=0;i<myScroll.length;i++){
			myScroll[i].destroy();
		}
		myScroll = null;
	}
	myScrollIndex = 0;
	$('.wrapper').each(function(){
		var id = $(this).attr('id');
		$(this).css('width', $(window).width()-30);
		$('#'+id+' div:first-child').css('width', $(window).width()-30);

		//注意：以下在 new iScroll時若加入【useTransform: false,】參數，則排版會歪掉
		var iscrollobj = new iScroll(id,{
							onBeforeScrollStart: function (e) {
								var target = e.target;
								while (target.nodeType != 1) target = target.parentNode;
								if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA' && target.tagName != 'OPTION')
									e.preventDefault();
							},
			                hScrollbar: false,
			                vScrollbar: false
		                });
		//myScroll.push(new iScroll(id,{ hScrollbar: false, vScrollbar: false }));
		myScroll.push(iscrollobj);
		//$('#'+id+' div:first-child').on( "updatelayout", function( event ) { setTimeout(function () {iscrollobj.refresh();}, 0);} )
		$('#'+id+' div:first-child').on( "updatelayout", function(event) { setTimeout(function () {iscrollobj.refresh();}, 500);} )
		$(this).on({ 'touchmove' : function(e){ e.preventDefault(); } });
		myScrollIndex ++;
		//alert(id);
	});
	//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}

//document.addEventListener('DOMContentLoaded', initIscroll, false);
