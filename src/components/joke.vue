<template>
	<div>
		<ul>
			<li v-for='list in lists'>
				<a :href="'#/jokeparticulars/'+list.group.id">
				<div class="header">
					<img :src="list.group.user.avatar_url" alt="" v-if='list.group.user.name=="匿名用户"?false:true' />
					<p>{{list.group.user.name}}</p>
				</div>
				<div class="content">
					
						<p>{{list.group.text}}</p>
						<div class="con_nei">
							内含段子
						</div>
					
				</div>
				</a>
				<div class="footer">
					<span class="span1" @click='like(list.group.digg_count,"攒",list.group)'> {{list.group.digg_count|numberFilter}}</span>
					<span class="span2" @click='like(list.group.bury_count,"踩",list.group)'> {{list.group.bury_count|numberFilter}}</span>
					<a :href="'#/jokeparticulars/'+list.group.id">
						<span class="span3"> 
							{{list.group.comment_count|numberFilter}}
						</span>
					</a>
					<span class="span4" @click = 'share()'> {{list.group.share_count|numberFilter}}</span>
				</div>
				<!--<joint></joint>-->
			</li>
		</ul>
		<div class="toast" :style="{display:isLike?'block':'none'}">
			<div class="mask"></div>
			<div class="wrapper" :style="{opacity:isLike?1:0}">
				<span class="msg"></span>
			</div>
		</div>
		<div class="share-container" :style="{display:isShare?'block':'none'}">
			<div class="masg">

			</div>
			<div class="content1">
				<header>分享到</header>
				<ul>
					<li class="J-share-item-wap">
						<a class="bds_tsina">
							<span>新浪微博</span>
						</a>
					</li>
					<li class="J-share-item-wap">
						<a class="bds_tqq">
							<span>腾讯微博</span>
						</a>
					</li>
					<li>
						<a class="bds_qzone">
							<span>QQ空间</span>
						</a>
					</li>
					<li class="J-share-item-wap">
						<a class="repin">
							<span>收藏</span>
						</a>
					</li>
				</ul>
				<div class="btns-wrapper">
					<div class="button" @click='shares()'>
						<a >取消</a>
					</div>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
/*import joint from './joint.vue';*/
	export default {
		data: function() {
			return {
				page: 1,
				lists: [],
				isLike: false,
				isOP: false,
				isShare:false,
			}
		},
		methods: {
			getJoke: function() {
				this.$http.jsonp('http://m.neihanshequ.com/?is_json=' + this.page + '&app_name=neihanshequ_web&min_time=1490176755&csrfmiddlewaretoken=4f2ea2df97bc11695447bf3990018402').then(function(data) {
					this.lists = this.lists.concat(data.data.data.data)
					this.page++
				})
			},
			handleScroll: function() {
				if(window.innerHeight + document.body.scrollTop >= document.body.offsetHeight) {
					this.getJoke()
				}
			},
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
			shares:function(){
				this.isShare=false
			}
		},
		mounted: function() {
			this.getJoke();
			window.addEventListener('scroll', this.handleScroll);

		},
		/*components:{
			joint,
		}*/
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
	
	img {
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
	
	a {
		color: #000000;
	}
	
	.toast {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 1000;
		z-index: 9999;
	}
	
	.mask {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1001;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, .3);
		background-color: transparent;
	}
	
	.wrapper {
		opacity: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		text-align: center;
		width: 100%;
		height: 12.5rem;
		line-height: 9rem;
	}
	
	.msg {
		border-radius: 10px;
		background-color: #000;
		height: 12.9rem;
		width: 12.9rem;
		font-size: 1.65rem;
		line-height: 12.375rem;
		color: #fff;
		box-sizing: border-box;
		display: inline-block;
	}
	
	.zan {
		height: 2.8rem;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAP1BMVEUAAAD/gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ+zMn/hAAAAFHRSTlMAHt938PyNxwjMqphPMxTVfW5WPSmdpSIAAACASURBVCjPrdNJCsNADAVR9aT2nOnf/6wJmIQ0blwb10qLhxYC2bFw88HOClGqBKSFgBIBLQTKBkCVgO4EtBKI1m3SrzF9e4Q/kdUrv2wfPkL9RhQFhS7YEVE4iRJITEZiJVGNxJNENBKJRN5IuDUid67VCj+I2VoxeLslz/t/vwF5xi3uUJ3yNQAAAABJRU5ErkJggg==);
		background-position: left center;
		background-repeat: no-repeat;
		color: #ff819f;
	}
	
	.cai {
		color: #ff819f;
		height: 2.8rem;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAOVBMVEUAAAD/gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ//gZ90kuzBAAAAEnRSTlMAH9+I7/zJkHUKUdSqNxfhmC76jFC/AAAAgElEQVQoz6XPSQ6DQBBDUTddPTIk8f0PGyVSKAIIL/jrJ0sGvwFoxbjNSsMnF4X7njthB5HCv+CxKIU1JVileEjBLkWWgrMUkxQpKMEoxSBFkoK4v5GxZqfAZhcT18b4qwZ4y7B5eF5w8pKkQpEMRdIiSYciFYp0CJJxWRhLg/cGqOMpfVnLTBcAAAAASUVORK5CYII=);
		background-position: left .84rem;
		background-repeat: no-repeat;
	}
	
	.share-container {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	
	.content1 {
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		width: 100%;
	}
	
	.masg {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, .3);
	}
	
	.content1 ul {
		width: 86.25%;
		overflow: hidden;
		margin: 0 auto;
	}
	
	.content1 ul li {
		float: left;
		width: 33%;
		box-sizing: border-box;
		margin: 0;
		border: none;
	}
	
	header {
		color: #666;
		font-size: 1.6rem;
		display: block;
		text-align: center;
		margin: 2.4rem 0 1.7rem;
		line-height: 1.6rem;
	}
	
	.J-share-item-wap {
		float: left;
		width: 33%;
		box-sizing: border-box;
	}
	
	.J-share-item-inapp {}
	
	.content1 a {
		display: block;
		height: 5.7rem;
		width: 5.7rem;
		margin: 0 auto 4rem;
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: center center;
		position: relative;
	}
	
	.content1 a span {
		text-align: center;
		display: block;
		position: absolute;
		bottom: -2.16rem;
		width: 150%;
		left: 50%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	}
	
	.bds_tsina {
		background-image: url(data:image/png;base64,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);
	}
	
	.bds_tqq {
		background-image: url(data:image/png;base64,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)
	}
	
	.repin {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAABxCAMAAADVoLziAAAAgVBMVEUAAAD/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/1RL/////9cX/+uD/4E3//O3/413/2zP/2CT/53X/3kH/5Wn/8rb/6YT/+Nb/64//8Kj/7pyC9QR7AAAAGXRSTlMA9igPtWEH37+JqtZ/SBl06MtVNZ+Xah8+ZQrawAAAA81JREFUaN7N2gnWmjAUBeAEkXnG6SKCs9b9L7BzacsP3JDY028B3pPIS14C4n/nWPEmWge253l2sPLTolyI97E2q1yix7XTUpi3WAYSw6SdWmbjbIlJYbQ1NZlrCZJXGMgrA6gIl5p5Oxuq3KWjMZ9dnlJmMbf0fImZPGvWhLqYT0bqgRH0eIlaXuJBVxarBMYZDPD5wBRmeOwqv4Yp4ZYqigDmuBYRaMOkbDqSGKHZyBVMc8cL04d54dgTu8Q72CN7oQTB4FKQuOAdLuAVA4k2eM+quoImE+0/sa2+UBil91HgVoJXf03cg7fRnNN79U0LnXktwDs13xNr8ILecuqC96p+OIO309gSj9VPDXj5X32+BO9W/XIHr5jdRx2q35xAC2cPcf974gsdlUFuwGurPxyBOf+kC179Z+INvLJrFsE7V385gLZS7zS64u/sQZOLGc/Ns+ppQVuqbxrHqu8Bmq2+hn+qPnCF4rQ6/KReemmKC3rRPakzin/OWrdS6Bgv19e+qQbUt3tLrXfZt8R8Muz8elTTmtuznVyBthN/4+lw/9SFMZp9FztUH+Vg3LMmY/qjHVyI/LFqfFQa2pGK9IkFVF0z8ujYzHqmDgMWQoTEPkhglz5LCEm0MwR2D4uFIFYYdeex8hipRqXqILufdCwRx2Ze4G38LMk2irzHaX4irjMCm9HFdd0lGqvKC7QS8Uk1sEWHmFX9GrmDTNSsEf5UEHWJRmrkxjSQkuinWHuqt3KZww2nPlFnD486bDCaC6Yl5I3xi9svpkn2BuDOJB7JM2TMdf+EA9kiJ1wzTjizd1cudTAmPNlj8grTKsYn4sFhj49Hrv6pAyT3Rx64esSkVDBHHX5jxiSLvbC6c4lH9trKIstRvyAj8UNuaFe+EpNKXpLVZvZ/j78I/KASDu1DuSCX9BvHUz/v2xP8UCvIzOkSLboJ6PK+ZdYq1ywR/w6w7ed9nElcH3GDPPfzOuffMk/EEKlBXnt5A5nEELk3OqeBvC6zmX5yUqV3ne2XX7x1fdPAOOuxVS50et8ZuRhzxJTLBWNi0RPjnVbES2ujsu6xoeZVXzzwRY7Em/jEFyRGeQ7xwYNJWTLyUUcO82QpRiQujIvFqK3xyKWYYGUwaiMmWa7ZERK2IUyRhaAsPFOBO0FyzCyxoSV4GwltwUKoKEPdGd0IRc4aOnJLqNuF8weYilmcVGKWYCvmStYzMr2d0LFVzfRioSuJMrBkUAoTnMKmBhqmyT/8al7mkSUMc+LIG0jN/Xgh3sQqopUXZj8H5uaBvywdoeQzekPI5S6zTkQAAAAASUVORK5CYII=);
	}
	
	.bds_qzone {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAABxCAMAAADVoLziAAAAflBMVEUAAAD/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/w0X/////yVX/1Hj/9d//+Of/89j/68H/57P/+/H/46b/zGH/3JD/2IX//fj/z2r/783/35v9yVS4AAAAGHRSTlMAHeMI7KMSc0L1gbmulzAoi8xbT9lmNcIlFBFpAAAEiElEQVRo3rTW666qQAwFYEBQQVBR3K6CwHCH93/Bs0PMcSsX6QDfb5KmM6tTFKbtz3V3NuzDL9twrNv+pKxnu7cOGjpM17mtUfZo3TFCMy4bZUEny8NXpn1dqOjmcsdE+lldoN5OA4f9M7eeDi77qMi7aJBhqLLxdCHJ3Ekd6BkzuEf+QLiYh9vmzcRchy3nRB0sQJs+KFsXizAvU6/QA8f8yzzqWM5Z+e5Hx5Icbofrd3nSsTRrPKUelncbm0MXa9grgxysQlcHlxNW4m4GUmOCZX5gXXCIqEJL/iotcARENabTNj1nCpaQiAK0ZN+eOzhS+hWBobO6ruDIqMVp8v45+x44amo9wPCxLG/gKOipwHTee4saOEJ6CsFwkW9R0H85WvwmPTBU9JKA4Sob1Ij+aNDixtUGQ0F/JT6mOylPKhj8hN6kaPEe9B0YBL0rGU1qMkujok8C0+0lDjWijgyTOfxhzKkrBpjHegA4semqALDSamIyQV2s1bxrf/sxIzbcrWXwZsN/UL/IZ12kga+yIE/jqKQRyaOORZMH1Zfi6vg0+lXRiDoknjKMYpHmRZANTKTZV6ptKqF5iv7oqBMzyVcMvAF79ElpRJmEYRTVcSxEmjZ5XgRBFYSTCuIw+OLk1PWI8yrz/UkxLgP08oaHI+iPZhinRSZfELqinDGgGg5OGYkm8NkFW4riMAf+JalFnvV+mFQYtB17APyIvoh8bkGo409OTKNEb4dhhtGKNndZvDTsgt0eu/71amdLqsJAGIAbhAiIuI42wcgq4vu/4KnDXFAplu4IzHc9VV2Of2K6k8/415gMF5Q4ryK+RjZwNRyah8Rpgp5vJIOrpJFaQf7v1obRjJdqJDPfFPS1PYe/SqqRgkiymT1H08vMUMEGaSeAm/EB51GObEkJ76AjTLubZnQP/DBbDwdpRb+zkVWaf3FUPusHZHq3q1/awim0TCmkRQBwNGj81buX41fWLR6JpA2zQZ5ebmWV1szo3Jmt1Xvwe5Jl+U6S16uqPkXR5qhgjrCvzKiqosiyNG2eT6Xy+rsGxGNOjouYJ0eCv2FOOtKYqcRpO2htfCQ82Idi5q2SS0aVK8NpFnOAVMZcT+4Iyaai2qeSsol7au4sMDCNat5u2snDbCTgdMNyyzCqmcRfVR7rKu4dhGsS1bTETlHzo2NBJ8IptRaOBDVS+w88iKlDJ2RGNa+w5/2MO8Qsh/chky6KxUiYFePk4YLOZRzLUzn+NzV18vAt0Fk+FdVmMvkyi1sp/6p1Oz1uVAkSfncERV9c0XcsdbviGdodQVJT+c4Nh8luxZOqXEkyNp0AV2MLGHTHtXgwzHJwHVsY4+EqQhj3gys4CZhwxMXZFkxycWHOAQjhwgUjILkrFlz/dYdNFFx887lawHT2kbbsi7nIxvkCMCHC2Zm5wN++Q9xZYMzazfiA50UfzNL2Ar60CRw0t4tgBnH00czdg5mE0WPr8AZLuITIYgcWLEX87MhyxxssS1z2VxzhhNsDrEJ42/3d1mqdwuB8gLWJw837L7I2YO4fhBSrfCUWk8MAAAAASUVORK5CYII=);
	}
	
	.btns-wrapper {
		border-top: 1px solid #C7C7C7;
		overflow: hidden;
	}
	
	.button {
		float: left;
		font-size: 1.6rem;
		height: 5rem;
		line-height: 5rem;
		padding: 0;
		border: 0;
		width: 100%;
		background-color: #fff;
		color: #ff819f;
		text-align: center;
	}
	
	.button a {
		display: block;
		height: 100%;
		color: #4f5157;
		text-decoration: none;
	}
</style>