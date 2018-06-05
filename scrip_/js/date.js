$(function () {
	$('#choseDate').mobiscroll().date({
		theme:'mobiscroll',
		lang:'zh',
		cancelText:null,
		dateFormat:'yy-mm-dd',
		display:'bottom',
		onSelect: function (valueText, inst) {//选择时事件（点击确定后），valueText 为选择的时间，
			var nowTimestamp = new Date().getTime();//当前时间的时间戳
			var checkTimestamp = new Date(valueText).getTime();//选中的时间的时间戳
			// 选中的时间 大于 当前时间  显示选中的时间  否则 显示当前的时间
			if(checkTimestamp < nowTimestamp){
				var nowChoseTimestamp = new Date();
				var choseYear = nowChoseTimestamp.getFullYear();
				var choseMonth = nowChoseTimestamp.getMonth() + 1;
				var choseDay = nowChoseTimestamp.getDate();
				// 月份不足10添加0
				if(choseMonth<10){
					choseMonth = '0' + choseMonth;
				}else{
					choseMonth = choseMonth;
				}
				// 日子不足10添加0
				if(choseDay<10){
					choseDay = '0' + choseDay;
				}else{
					choseDay = choseDay;
				}
				$('#choseDate').val(choseYear+'-'+choseMonth+'-'+choseDay);
				var dateHint = $('<div id="dateHint" style="position:fixed;top:0;left:0;bottom:0;right:0;margin:auto;width:5rem;height:1rem;background:rgba(51,51,51,0.6);border-radius:0.15rem"><div class="wrap" style="width:100%;height:100%;font-size:.34rem;line-height:1rem;color:#fff;text-align:center;position:relative;">不能选择小于今天的日期！</div></div>');
				dateHint.appendTo($('body'));
				$('#dateHint').on('tap',function(){
					$(this).remove();
				})
			}
		}
	})



	// 显示年月日控件
	$('#date').mobiscroll().date({
		theme:'mobiscroll',
		lang:'zh',
		cancelText:null,
		dateFormat:'yy-mm-dd',
		display:'bottom'
	})

	// 点击前一天
	$('.prevDay').on('tap',function(){
		changeDate(-1)
	})

	// 点击后一天
	$('.nextDay').on('tap',function(){
		changeDate(1)
	})

	// 日期增减的函数
	function changeDate(i){
		var nowDate = $('#date').val();//获取日期框中的值
		var date = new Date(nowDate);//选择的时间
		var time = date.getTime();//选择的时间的时间戳
		var newTime = time + (24*60*60*1000)*i;//前一天/后一天的时间戳
		var newDate = new Date(newTime);//前一天/后一天的时间
		var nextYear = newDate.getFullYear();//转成年
		var nextMonth = newDate.getMonth() + 1;//转成月
		var nextDay = newDate.getDate();//转成日
		// 月份不足10添加0
		if(nextMonth<10){
			nextMonth = '0' + nextMonth;
		}else{
			nextMonth = nextMonth;
		}
		// 日子不足10添加0
		if(nextDay<10){
			nextDay = '0' + nextDay;
		}else{
			nextDay = nextDay;
		}
		// 转换后的日期显示
		$('#date').val(nextYear+'-'+nextMonth+'-'+nextDay)
	} 
});