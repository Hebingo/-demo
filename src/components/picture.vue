<template>
	<div>
		<ul>
			<li v-for='list in lists'>
				<div class="header">
					<img :src="list.group.user.avatar_url" class="img" v-if='list.group.user.name=="匿名用户"?false:true' />
					<p>{{list.group.user.name}}</p>
				</div>
				<div class="content">
					<a :href="'#/picparticulars/'+list.group.id" >
						<p >{{list.group.text}}</p>
						<div class="con_nei">
							{{list.group.category_name}}
						</div>
						<img :src="list.group.middle_image.url_list[0].url" alt="" />
					</a>
				</div>
				<div class="footer">
					<span class="span1"> {{list.group.digg_count|numberFilter}}</span>
					<span class="span2"> {{list.group.bury_count|numberFilter}}</span>
					<span class="span3"> {{list.group.comment_count|numberFilter}}</span>
					<span class="span4"> {{list.group.share_count|numberFilter}}</span>
				</div>
			</li>
		</ul>
		<router-view></router-view>
	</div>
	
</template>
<script type="text/javascript">
	export default {
		data: function() {
			return {
				page: 1,
				lists: [],
			}
		},
		methods: {
			getJoke: function() {
				this.$http.jsonp('http://m.neihanshequ.com/pic/?is_json='+this.page+'&app_name=neihanshequ_web&min_time=1490263355&csrfmiddlewaretoken=4f2ea2df97bc11695447bf3990018402').then(function(data) {
					this.lists = this.lists.concat(data.data.data.data)
					this.page++
				})
			},
			handleScroll:function(){
				if(window.innerHeight+document.body.scrollTop>=document.body.offsetHeight){
					this.getJoke()
				}
			}
		},
		mounted: function() {
			this.getJoke();
			window.addEventListener('scroll', this.handleScroll);
		}
	}
</script>
<style type="text/css" scoped>
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		font: inherit;
	}
	
	li {
		border: 1px solid #f0f0f0;
		margin: 1rem;
		padding: 1rem;
		background-color: #FDFDFD;
	}
	
	.img {
		height: 30px;
		width: 30px;
	}
	
	.header p {
		display: inline-block;
		font-size: 1.4rem;
		margin: 0;
	}
	
	.con_nei {
		display: inline-block;
		min-width: 3.8955rem;
		height: 1.5015rem;
		padding: 0 .84rem;
		line-height: 1.5225rem;
		border-radius: .7508rem;
		border: 1px solid #5e96b4;
		color: #5e96b4;
		text-align: center;
		font-size: 1.05rem;
	}
	
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
		color: #999;
		width: 5rem;
		font-size: 1.2rem;
	}
	
	.span1 {
		height: 2.8rem;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAP1BMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzFR7UUAAAAFHRSTlMAHt938PzJjQUQmE861aqpfW5WLxpLLXgAAAB+SURBVCjPrdBJDsIwEETR9th2Eua6/1lBkUBYsfgb/vqpFmXHwsm7/SpEqTYA0kpAiYBWAqUDUCWgKwE9CESbdtanmt7dwpfImpU3095LaF5FUVDoDxsRhZMogcTFSGwkqpG4k4iNRDIQuZNwG0SevDUKP4jFRtF8XMlL28ETgFgt8tnmHnEAAAAASUVORK5CYII=);
		background-position: left center;
	}
	
	.span2 {
		height: 2.8rem;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAOVBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz15oL/AAAAEnRSTlMAH9+I7/zJkHUKUdSqNxfhmC76jFC/AAAAgElEQVQoz6XPSQ6DQBBDUTddPTIk8f0PGyVSKAIIL/jrJ0sGvwFoxbjNSsMnF4X7njthB5HCv+CxKIU1JVileEjBLkWWgrMUkxQpKMEoxSBFkoK4v5GxZqfAZhcT18b4qwZ4y7B5eF5w8pKkQpEMRdIiSYciFYp0CJJxWRhLg/cGqOMpfVnLTBcAAAAASUVORK5CYII=);
		background-position: left .84rem;
	}
	
	.span3 {
		height: 2.8rem;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAElBMVEUAAADMzMzMzMzMzMzMzMzMzMyxZd59AAAABXRSTlMA7o6ABs2AO04AAAA+SURBVBjTY3ASDUWAQBUG1VBkEMQgisIPZAhFBaN8vHz08ApC5QPDOzQ0mAEZhIYaoPJRpRnQpBnQpBnQpAGK5HnV4Uw80wAAAABJRU5ErkJggg==);
		background-position: left .84rem;
	}
	
	.span4 {
		height: 2.8rem;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAVFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzg5ipKAAAAG3RSTlMAS/f8QGF4aVhHEQPs3MW7oFEn0LirgG9NMZTadDR6AAAApUlEQVQoz82SSRKDIBBFFdEoKCAOifn3v2cqKYqhmLL0LeHRfOhu6sDjYVfpVDNa8vKMVOUWZK0Z6MaCwegbVokNPQgTq+sTBh9FED0y1gUhz9BgOyIG37hmJBicQQlSnNbQrkL6FmYy5pMqWMi2HzJ6LTW7s+ov/v316Me232E1cdcXIxhjAiB6VujcsZy63H1qqtcnKDOFTR4pawZwK6PAf0adD3EtJfZ0oWPxAAAAAElFTkSuQmCC);
		background-position: left .84rem;
	}
	
	a {
		color: #000000;
	}
</style>