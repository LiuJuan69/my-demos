$(function(){
	// 会员有保障页面左上角标
	var length = $(".huiWrap .content .textBox>b").length;
	for(var i = 0;i<length;i++){
		var lengths = $(".huiWrap .content .textBox>b").eq(i).text().length;
		if(lengths == "1"){
			$(".huiWrap .content .textBox>b").eq(i).css({"left":"0.1rem"});
		}else{
			$(".huiWrap .content .textBox>b").eq(i).css({"left":"0.04rem"});
		}
	}
	// 点击攀枝花基地 查看更多
	$("#more").on("tap",function(e){
		if($("#more").html() == "查看更多"){
			$(this).html("收起");
			$(".infoBox .font").css({"height":"auto","overflow":""});
			$(".pzhWrap .content .infoBox>div").css({"margin-bottom":"0"});
		}else{
			$(this).html("查看更多");
			$(".infoBox .font").css({"height":"2.7rem","overflow":"hidden"});
			$(".pzhWrap .content .infoBox>div").css({"margin-bottom":"0.38rem"});
		}	

	});
	// 品牌有保障里logo图
	var imgs = $(".pinpaiWrap .content .oneBox>img").length;
	for(var img =0;img<imgs;img++){
		var widths = parseFloat($(".pinpaiWrap .content .oneBox>img").eq(img).width()/100)+'rem';
		$(".pinpaiWrap .content .oneBox>img").eq(img).css({"width":widths});
	};
	// 品牌有保障里时间轴的高度
	var lis = $(".times ul li").length;
	for(var li = 0;li<lis;li++){
		var lines = parseFloat($(".times ul li").eq(li).height()/100*2)+'rem';
		$(".times ul li span").eq(li).css({"line-height":lines})
	}

})