$(function(){
	var FileName ;//选中图片的名称
	var FileSize;//选中图片的大小
	var FileType;//选中图片的格式
	var Size;
	var Files;
	var i=0;
	var ImgType;
	var newImageData;
	var m;

	// 点击选择文件 
	$('input[type=file]').change(function(e){

		var file = $('#UpLoad').get(0).files[0];
 		if (file) {
			var fileSize = 0;
			fileSize = (Math.round(file.size));			
			// console.log(file.name, fileSize, file.type);
			FileName = file.name;
			FileSize = fileSize;
			FileType = file.type;			
		}
		// 获取选择的图片信息
		Files = document.getElementById('UpLoad').files;
		var yImgLength = Files.length;
		console.log()
		
		// 循环添加div，img,
		for(i =0;i<Files.length;i++){
			// 定义一个文件file
			var FileRead = new FileReader();
			// 读取文件信息
			FileRead.readAsDataURL(Files[i]);
			var FilesName = Files[i].name;
					
			// 获取选中图片的大小
			var Size = Files[i].size;
			//根据图片的大小字节 转换成MB和Kb
			if (Files[i].size > 1024 * 1024) 
				Size = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
			else 
				Size = (Math.round(Files[i].size * 100 / 1024) / 100).toString() + 'KB';

			$('#wrapbox').append('<div class="wrap"> <div class="old"> <div class="y_small"> <img src="'+'./imgs/'+Files[i].name+'"  class="y_Simg"> </div> <div class="y_big"> <img src="" alt="" class="y_Bimg"> </div> <div class="y_size">size:'+Size+'</div> </div> <div class="btn"> <select name="" class="chose"> <option value="0.1">模糊0.1</option> <option value="0.2">模糊0.2</option> <option value="0.3">模糊0.3</option> <option value="0.4">模糊0.4</option> <option value="0.5">模糊0.5</option> <option value="0.6">模糊0.6</option> <option value="0.7" selected = "selected">模糊0.7</option> <option value="0.8">模糊0.8</option> <option value="0.9">模糊0.9</option> </select> <button class="star">压缩</button> </div> <div class="new"> <div class="n_small"><img src="" alt="" class="n_Simg" style="width:100%;height:100%"></div> <div class="n_big"> <img src="" alt="" class="n_Bimg"> </div> <div class="n_size">size:</div> <div class="n_bi">占原图：0%</div></div> <canvas class="canvas" style="position:relative;display:none" ></canvas></div>');	
		}	

	});

	// 点击原图缩略图,压缩缩略图显示大图
	$('#wrapbox').on('click','.y_Simg,.n_Simg',function(){
		var YimgSrc = $(this).attr('src');
		var m = $(this).closest('.wrap').index();
		var c =  $(this).parent().hasClass('y_small')? 'y':'n';
		$('.'+c+'_Bimg').eq(m).attr('src',YimgSrc);
		$('.'+c+'_big').eq(m).css('display','block').css('z-index','9999');
		$('.'+c+'_small').eq(m).css('visibility','hidden');
	});
	
	
	// 点击原图,压缩图=>大图隐藏
	$('#wrapbox').on('click','.y_Bimg,.n_Bimg',function(){
		var m =$(this).closest('.wrap').index();
		var c = $(this).parent().hasClass('y_big')?'y':'n';
		$('.'+c+'_big').eq(m).css('display','none');
		$('.'+c+'_small').eq(m).css('visibility','visible');
	});

 
	// 点击单个压缩
	$('#wrapbox').on('click','.star',function(){
		var m = $(this).closest('.wrap').index();
		var len = $('.star').length;
		YScanvasImg(m);
		$('canvas').eq(m).hide();
	});

	// 选择全部模糊值
	$('#chose_all').click(function(){
		var Aval= $(this).val();
		var choseLen = $('.chose').length;
		for(var n =0;n<choseLen;n++){
			$('.chose').eq(n).val(Aval);
		}		
	});

	// 选择全部压缩
	$('.star_all').click(function(){
		var canLen = $('canvas').length;
		for(var j=0;j<canLen;j++){
			YScanvasImg(j);
			$('canvas').eq(j).hide();
		}
		
	});

	// 选择保存压缩图
	$('.save').click(function(){
		$('.a').attr('download',FileName);
		$('.a').attr('href',newImageData);
		$('.a').eq(i).click();
	});


	// 用来调用的函数,多图
	function YScanvasImg(j){

		// 获取选中的模糊值
		var num = $('.chose').eq(j).val();
		var Num = parseFloat(num);

		// 定义一个img给canvas绘制用
		var img = new Image();
		var ImgSrc = $('.y_Simg').eq(j).attr('src');

		img.src = ImgSrc;		

		// 判断文件大小如果大于10kb压缩，否则不压缩
		if(FileSize>10240){

			var c = document.getElementsByTagName("canvas")[j];
			var ctx = c.getContext("2d");

			// 给canvas赋值选中图片的宽高		
			c.width = img.width;
			c.height = img.height;

			img.onload = function(){

				// 获取选中图片的格式
				var pos = ImgSrc.lastIndexOf('\.');
				ImgType = ImgSrc.substring(pos+1,ImgSrc.length);				

				// 将压缩后的图保存成原图的格式 
				if(ImgType == 'png' || ImgType == 'gif'){				
					ctx.drawImage(img,0,0,c.width,c.height);
					 newImageData = c.toDataURL('image/png',Num);
				}else{ 
					ctx.fillStyle = "#fff";
					ctx.fillRect(0,0,c.width,c.height);	
					ctx.drawImage(img,0,0,c.width,c.height);
					newImageData = c.toDataURL('image/jpeg',Num);
				} 

				$('.n_Simg').eq(j).attr("src",newImageData);
				// 截取base64编码23位之后的部分
				// 去掉编码中的"="
				var equalIndex= newImageData.indexOf('=');
				str = newImageData.substr(23,newImageData.length-1);

				// 编码长度单位为字节
				var strLength=newImageData.length;
				var fileLength=parseInt(strLength-(strLength/8)*2);

				// 将字节转换为字符串
				if (fileLength > 1024 * 1024) NSize = (Math.round(fileLength * 100 / (1024 * 1024)) / 100).toString() + 'MB';
				else NSize = (Math.round(fileLength * 100 / 1024) / 100).toString() + 'KB';

				// 显示压缩后的图片的大小
				$('.n_size').eq(j).html(NSize);

				// 显示压缩后的图占原图的比例
				var Nb = '占原图：'+Math.round((fileLength / FileSize)*100) + '%';
				console.log('原图大小'+FileSize+'------'+'压缩图大小'+fileLength+'压缩后的路径'+newImageData)
				$('.n_bi').eq(j).html(Nb);
			}
		}else{
			img.onload = function(){

				// 不能压缩的图片直接展示在缩略图的地方
				$('.n_Simg').eq(j).attr("src",ImgSrc);
				var Size = FileSize;
				if (FileSize > 1024 * 1024) Size = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
				else Size = (Math.round(FileSize * 100 / 1024) / 100).toString() + 'KB';

				// 显示图的大小
				$('.n_size').eq(j).html(Size);

				// 压缩图占原图的比例
				var Nb = '占原图：100%';
				$('.n_bi').eq(j).html(Nb);
			}
		}
		
	}

})