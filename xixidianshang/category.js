// 当页面的DOM结构加载完成之后 执行回调函数中的代码
$(function(){

	// 初始化区域滚动组件
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	

// 获取一级分类的数据
	$.ajax({
		url: '/category/queryTopCategory',
		type: 'get',
		success:function(response){
			console.log(response)

			// 将数据和html做拼接
			// 第一个参数是html的模板id
			// 数据,第二个参数对象数据类型 ,result是自己给数据取得名字.
			// 告诉模板引擎,html和数据怎样进行拼接
			var html=template( 'category-first',{result:response.rows }) 
			
			$('#links').html(html);
			// console.log(html);  

			// 如果一级分类有数据的话
			if(response.rows.length){
				// 给第一个一级分类添加选中状态
				$('#links').find('a').eq(0).addClass('active');
				
				// 获取第一个一级分类的id
				var id = response.rows[0].id;
				// 根据一级分类获取二级分类
				getSecondCategory(id);
			}
		}
	});
// 点击一级分类获取二级分类的数据
// 1.一级分类添加点击事件
// 2.在事件处理函数中获取到一级分类的id
// 3.调用二级分类的接口获取对应的数据
// 4.将数据展示到对应的位置中
// 5.如果接口中没有数据 要在页面中显示暂无数据

//  1.一级分类添加点击事件
	$('#links').on('click','a',function(){
		// 获取当前点击的一级分类的id
		var id =$(this).attr('data-id');

		// 给当前的一级分类添加选中状态
		$(this).addClass('active').siblings().removeClass('active');

		// 根据一级分类获取二级分类
		getSecondCategory(id);
		
	})

});


// 根据一级分类获取二级分类
function getSecondCategory(id){
	$.ajax({
			url:'/category/querySecondCategory',
			type:'get',
			data:{
				id:id
			},
			success: function(response){
					console.log(response);

				var html=template('category-second',response);
			
				$('.brand-list').html(html);
				console.log(html)
			}
		})
}