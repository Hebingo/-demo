<template>
	<div>
		<ul>
			<li class="underline" @click='backdrop()'>
				<a href="#/index/cross">段子</a>
			</li>
			<li @click='backdrop()'>
				<a href="#/index/picture">图片</a>
			</li>
			<li @click='backdrop()'>
				<a href="#/index/cross">发现</a>
			</li>
			<li @click='backdrop()'>
				<a href="#/index/cross">我的</a>
			</li>
		</ul>
	</div>
</template>
<script src="../../static/zepto.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
	export default{
		data:function(){
			return {
				
			}
		},
		methods:{
			backdrop:function(){
				var el = event.currentTarget;

				$(el).addClass('underline').siblings().removeClass('underline')
			}
		},
		mounted:function(){
			
		}
	}
</script>
<style type="text/css" lang='less' scoped="">
.underline{
	background: #ff819f;
}
	template {
		padding: 10px;
	}
	
	div {
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			overflow: hidden;
			background: #222;
			li {
				float: left;
				font-size: 1.5rem;
				height: 3.5rem;
				line-height: 3;
				color: #fff;
				width: 25%;
				text-align: center;
				a{
					color: #F0F0F0;
					display: block;
				}
			}
		}
	}
</style>