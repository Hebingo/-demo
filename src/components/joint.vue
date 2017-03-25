<template>
	<div class="footer">
		<span class="span1" @click='like(list.group.digg_count,"攒",list.group)'> {{list.group.digg_count|numberFilter}}</span>
		<span class="span2" @click='like(list.group.bury_count,"踩",list.group)'> {{list.group.bury_count|numberFilter}}</span>
		<span class="span3"> 
			<a :href="'#/jokeparticulars/'+list.group.id">{{list.group.comment_count|numberFilter}}</a>
		</span>
		<span class="span4" @click='share()'> {{list.group.share_count|numberFilter}}</span>
	</div>
</template>
<style type="text/css">
	.footer span {
		display: inline-block;
		text-align: left;
		background-repeat: no-repeat;
		padding-left: 2.16rem;
		background-size: auto 60%;
		line-height: 2.8rem;
		box-sizing: border-box;
		white-space: nowrap;
		text-indent: .5rem;
		width: 5rem;
		font-size: 1.2rem;
	}
	
	.span1 {
		height: 2.8rem;
		color: #999;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAP1BMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzFR7UUAAAAFHRSTlMAHt938PzJjQUQmE861aqpfW5WLxpLLXgAAAB+SURBVCjPrdBJDsIwEETR9th2Eua6/1lBkUBYsfgb/vqpFmXHwsm7/SpEqTYA0kpAiYBWAqUDUCWgKwE9CESbdtanmt7dwpfImpU3095LaF5FUVDoDxsRhZMogcTFSGwkqpG4k4iNRDIQuZNwG0SevDUKP4jFRtF8XMlL28ETgFgt8tnmHnEAAAAASUVORK5CYII=);
		background-position: left center;
	}
	
	.span2 {
		color: #999;
		height: 2.8rem;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAOVBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz15oL/AAAAEnRSTlMAH9+I7/zJkHUKUdSqNxfhmC76jFC/AAAAgElEQVQoz6XPSQ6DQBBDUTddPTIk8f0PGyVSKAIIL/jrJ0sGvwFoxbjNSsMnF4X7njthB5HCv+CxKIU1JVileEjBLkWWgrMUkxQpKMEoxSBFkoK4v5GxZqfAZhcT18b4qwZ4y7B5eF5w8pKkQpEMRdIiSYciFYp0CJJxWRhLg/cGqOMpfVnLTBcAAAAASUVORK5CYII=);
		background-position: left .84rem;
	}
	
	.span3 {
		color: #999;
		height: 2.8rem;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAElBMVEUAAADMzMzMzMzMzMzMzMzMzMyxZd59AAAABXRSTlMA7o6ABs2AO04AAAA+SURBVBjTY3ASDUWAQBUG1VBkEMQgisIPZAhFBaN8vHz08ApC5QPDOzQ0mAEZhIYaoPJRpRnQpBnQpBnQpAGK5HnV4Uw80wAAAABJRU5ErkJggg==);
		background-position: left .84rem;
	}
	
	.span4 {
		color: #999;
		height: 2.8rem;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAVFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzg5ipKAAAAG3RSTlMAS/f8QGF4aVhHEQPs3MW7oFEn0LirgG9NMZTadDR6AAAApUlEQVQoz82SSRKDIBBFFdEoKCAOifn3v2cqKYqhmLL0LeHRfOhu6sDjYVfpVDNa8vKMVOUWZK0Z6MaCwegbVokNPQgTq+sTBh9FED0y1gUhz9BgOyIG37hmJBicQQlSnNbQrkL6FmYy5pMqWMi2HzJ6LTW7s+ov/v316Me232E1cdcXIxhjAiB6VujcsZy63H1qqtcnKDOFTR4pawZwK6PAf0adD3EtJfZ0oWPxAAAAAElFTkSuQmCC);
		background-position: left .84rem;
	}
	
</style>
<script type="text/javascript">
	export default{
		methods:{
			like: function(n, p, m) {
				var el = event.currentTarget;
				if(!m.is) {
					if(p == '攒') {
						n++
						$(el).html(n)
						$(el).addClass('zan');
						this.isLike = true;
						var self = this;
						$('.msg').html('操作成功')
						setTimeout(function() {
							self.isLike = false;
						}, 2000)
					} else {
						n++
						$(el).html(n)
						$(el).addClass('cai');
						this.isLike = true;
						var self = this;
						$('.msg').html('操作成功')
						setTimeout(function() {
							self.isLike = false;
						}, 2000)
					}
					m.is = true;
				} else {
					if(p == '攒') {
						this.isLike = true;
						var self = this;
						$('.msg').html('您已踩过')
						setTimeout(function() {
							self.isLike = false;
						}, 2000)
					} else {
						this.isLike = true;
						var self = this;
						$('.msg').html('您已顶过')
						setTimeout(function() {
							self.isLike = false;
						}, 2000)
					}

				}
			},
			share:function(){
				this.isShare=true
			},
		}
	}
</script>