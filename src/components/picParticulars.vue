<template>
	<div>
		<header>
			<span class="litle">详情</span>
			<a class="retreat">
				<span @click='getBack()'>
					<img src="http://s3.pstatp.com/resource/neihan_wap/static/image/post/back_cf8396a.png" alt="" />
				</span>
			</a>
			<a class="report">
				<span>举报</span>
			</a>
		</header>
		<div class="text">
			<ul>
				<li>
					<div class="header">
						<img :src="lists.user.avatar_url" alt="" />
						<span>{{lists.user.name}}</span>
					</div>
					<div class="content">
						<p>
							{{lists.content}}
						</p>
						<img :src="lists.middle_image" alt="" />
						<div>
							<a>内涵段子</a>
						</div>

					</div>
					<div class="footer">
						<ul>
							<li class="li1">
								<span class="span1">{{lists.digg_count|numberFilter}} </span>
							</li>
							<li class="li2">
								<span class="span2"> {{lists.bury_count|numberFilter}}</span>
							</li>
							<li class="li3">
								<span class="span3"> {{lists.comment_count|numberFilter}}</span>
							</li>
							<li class="li4">
								<span class="span4">
									下一条
								</span>
							</li>
							<li class="li5">
								<span class="span5"> {{lists.share_count|numberFilter}}</span>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
		<div class="hostDiscuss">

		</div>
		<div class="discuss">
			<div>
				新鲜评论
				<span>({{discus.total_number}})</span>
			</div>
			<ul>
				<li v-for='item in disLists'>
					<div>
						<div>
							<img :src="item.user_profile_image_url" alt="" />
							<div>
								<p>{{item.user_name}}</p>
							</div>
							<div class="shou">
								{{item.digg_count}}
							</div>
						</div>
						<p>{{item.text}}</p>
					</div>
				</li>
			</ul>

		</div>
		<footer>
			<span>期待您的神评论</span>
		</footer>
	</div>
	
</template>
<script type="text/javascript">
	export default {
		data: function() {
			return {
				page:0,
				lists: {
					user: {}
				},
				discus: '',
				disLists: []
			}
		},
		methods: {
			particulars: function() {
				this.$http.jsonp('http://m.neihanshequ.com/group/' + this.$route.params.id + '/?is_json=1&csrfmiddlewaretoken=4f2ea2df97bc11695447bf3990018402').then(function(data) {
					this.lists = data.data.the_data;
				});
			},
			discuss: function() {
				this.$http.jsonp('http://m.neihanshequ.com/api/get_essay_comments/?app_name=neihanshequ_web&group_id=' + this.$route.params.id + '&offset='+this.page+'&csrfmiddlewaretoken=4f2ea2df97bc11695447bf3990018402').then(function(data) {
					this.discus = data.data;
					this.disLists = this.disLists.concat(data.data.data.recent_comments);
					this.page+=20
				})
			},
			getBack:function(){
				window.history.back();
			},
			handleScroll:function(){
				if(window.innerHeight+document.body.scrollTop>=document.body.offsetHeight){
					this.discuss()
				}
			}
		},
		mounted: function() {
			this.particulars();
			this.discuss();
			window.addEventListener('scroll', this.handleScroll);
		}
	};
</script>
<style type="text/css" lang='less' scoped="">
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	
	header {
		display: block;
		height: 4.5rem;
		line-height: 4.5rem;
		text-align: center;
		background-color: #222;
		color: #FAFAFA;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 1000;
		.litle {
			font-size: 2rem;
			max-width: 65%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: inline-block;
		}
		.retreat {
			position: absolute;
			left: 0;
			width: 3.6rem;
			height: 100%;
			span {
				display: block;
				height: 100%;
				img {
					position: absolute;
					top: 50%;
					left: 1.5rem;
					-webkit-transform: translate(0, -50%);
					transform: translate(0, -50%);
					width: 1rem;
					height: 1.8rem;
				}
			}
		}
		.report {
			position: absolute;
			top: 50%;
			-webkit-transform: translateY(-50%);
			transform: translateY(-50%);
			right: 1.6rem;
			font-size: 1.6rem;
		}
	}
	
	footer {
		position: fixed;
		bottom: 0;
		background-color: #d3d3d3;
		width: 100%;
		padding: .8rem;
		box-sizing: border-box;
		span {
			color: #CBCBCB;
			display: block;
			width: 100%;
			border-radius: 1.072rem;
			height: 3rem;
			line-height: 3rem;
			font-size: 1.6rem;
			background: #fff url(//s3.pstatp.com/resource/neihan_wap/static/image/post/post-logo_b660914.png) no-repeat 1.92rem center;
			background-size: auto 70%;
			padding-left: 5rem;
			box-sizing: border-box;
		}
	}
	
	.text {
		padding-top: 4.5rem;
		box-sizing: border-box;
		display: block;
		position: relative;
		height: 100%;
		font-size: 1.2rem;
		ul {
			li {
				position: relative;
				margin-bottom: .96rem;
				background-color: #FDFDFD;
				margin: 1rem;
				padding: 1.1rem;
				.header {
					margin-bottom: .6rem;
					overflow: hidden;
					position: relative;
					img {
						width: 2.5rem;
						height: 2.5rem;
						border-radius: 2.4rem;
						margin-right: 1.1rem;
					}
					span {
						font-size: 1.6rem;
						color: #787878;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						width: 70%;
						display: inline-block;
					}
				}
			}
		}
	}
	
	.content {
		p {
			font-size: 1.8rem;
			margin: 0;
			margin-bottom: .54rem;
			color: #333;
			word-break: break-all;
			word-wrap: break-word;
		}
		div {
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
			a {
				color: #5e96b4;
				display: block;
			}
		}
	}
	
	.footer {
		ul {
			overflow: hidden;
			li {
				color: #999;
				float: left;
				height: 2.4rem;
				position: relative;
				margin: 0 3px ;
				padding: 0;
				overflow: hidden;
				width: 22%;
				span {
					display: inline-block;
					text-align: left;
					background-repeat: no-repeat;
					padding-left: 2rem;
					line-height: 2.4rem;
					box-sizing: border-box;
					white-space: nowrap;
					
				}
				.span1 {
					height: 2.8rem;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAP1BMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzFR7UUAAAAFHRSTlMAHt938PzJjQUQmE861aqpfW5WLxpLLXgAAAB+SURBVCjPrdBJDsIwEETR9th2Eua6/1lBkUBYsfgb/vqpFmXHwsm7/SpEqTYA0kpAiYBWAqUDUCWgKwE9CESbdtanmt7dwpfImpU3095LaF5FUVDoDxsRhZMogcTFSGwkqpG4k4iNRDIQuZNwG0SevDUKP4jFRtF8XMlL28ETgFgt8tnmHnEAAAAASUVORK5CYII=);
					background-position: left center;
					background-size: auto 60%;
					background-repeat: no-repeat;
				}
				.span2 {
					height: 2.8rem;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAOVBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz15oL/AAAAEnRSTlMAH9+I7/zJkHUKUdSqNxfhmC76jFC/AAAAgElEQVQoz6XPSQ6DQBBDUTddPTIk8f0PGyVSKAIIL/jrJ0sGvwFoxbjNSsMnF4X7njthB5HCv+CxKIU1JVileEjBLkWWgrMUkxQpKMEoxSBFkoK4v5GxZqfAZhcT18b4qwZ4y7B5eF5w8pKkQpEMRdIiSYciFYp0CJJxWRhLg/cGqOMpfVnLTBcAAAAASUVORK5CYII=);
					background-position: left .84rem;
					background-size: auto 60%;
					background-repeat: no-repeat;
				}
				.span3 {
					height: 2.8rem;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAOVBMVEUAAADMzMzMzMzMzMzMzMzMzMzz8/PPz8/4+Pjm5ubh4eHr6+vZ2dn8/Pz////W1tbw8PDd3d3T09M3QGvgAAAABXRSTlMAgu6RBqd+m8UAAADoSURBVCjPhdPdsoQgCABgd1t+BETr/R/2pM10Gs2RC7D4RvTCEMJv+8IkvtsvnLF1v+n58ani3iGmoxXfH7tUAbfAVizBI/6FmSmb5XNVIY2CETkhFj0Lu8dbDFPMakGZCcoXZHsVysU1HxoB/EUgeuKdQFISgPQiVI7rtuJIgDY/KXFRztOTVsAEKqpQqBeCXCAmbg1z9aMXRxSCHBsAUtdxiuxAApBLnZUNBkFJgDwDsJw60Sgin6no2W0LHER2g6tLaa8p9oK1uZp3qjZ3YhZr8V2KTycmr+G201iCsARhCcIShAX4AzrBEjn1TrZDAAAAAElFTkSuQmCC);
					background-position: left .84rem;
					background-size: auto 60%;
					background-repeat: no-repeat;
				}
				.span4 {
					border-radius: .5rem;
					background: #ff819f;
					padding: 0;
					color: #F0F0F0;
					padding: .1rem;
				}
			}
			.li5 {
				position: absolute!important;
				top: 1rem!important;
				right: 0!important;
				padding: 0!important;
				margin: 0;
				.span5 {
					height: 2.8rem;
					background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAVFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzg5ipKAAAAG3RSTlMAS/f8QGF4aVhHEQPs3MW7oFEn0LirgG9NMZTadDR6AAAApUlEQVQoz82SSRKDIBBFFdEoKCAOifn3v2cqKYqhmLL0LeHRfOhu6sDjYVfpVDNa8vKMVOUWZK0Z6MaCwegbVokNPQgTq+sTBh9FED0y1gUhz9BgOyIG37hmJBicQQlSnNbQrkL6FmYy5pMqWMi2HzJ6LTW7s+ov/v316Me232E1cdcXIxhjAiB6VujcsZy63H1qqtcnKDOFTR4pawZwK6PAf0adD3EtJfZ0oWPxAAAAAElFTkSuQmCC);
					background-position: left;
					background-size: auto 60%;
					background-repeat: no-repeat;
				}
			}
		}
	}
	
	.discuss {
		padding: 0 1.2rem;
		font-size: 1.2rem;
		ul {
			padding-bottom: 5.5rem;
			li {
				zoom: reset;
				-webkit-text-size-adjust: none;
				text-size-adjust: none;
				border: 0;
				padding: 0;
				div {
					div {
						img {
							width: 2.4rem;
							height: 2.4rem;
							border-radius: 2.4rem;
							position: relative;
							top: 8px;
						}
						div {
							display: inline-block;
							width: 17rem;
							p {
								font-size: 1.4rem;
								color: #787878;
								margin: 0;
								height: 2.8rem;
								line-height: 2.8rem;
							}
						}
						.shou {	
							height: 2.8rem;
							width: 3.5rem;
							background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAMAAACVFoclAAAAP1BMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzFR7UUAAAAFHRSTlMAHt938PzJjQUQmE861aqpfW5WLxpLLXgAAAB+SURBVCjPrdBJDsIwEETR9th2Eua6/1lBkUBYsfgb/vqpFmXHwsm7/SpEqTYA0kpAiYBWAqUDUCWgKwE9CESbdtanmt7dwpfImpU3095LaF5FUVDoDxsRhZMogcTFSGwkqpG4k4iNRDIQuZNwG0SevDUKP4jFRtF8XMlL28ETgFgt8tnmHnEAAAAASUVORK5CYII=);
							background-size: auto 60%;
							background-repeat: no-repeat;
							position: relative;
							
							top: .2rem;
							text-indent: 2.5rem;
							    color: #999;
							    line-height: 2.4rem;
						}
					}
					p {
						word-break: break-all;
						margin-right: 1.12rem;
						margin-left: 3.616rem;
						margin-bottom: 1.2rem;
						font-size: 1.6rem;
						zoom: normal!important;
						-webkit-text-size-adjust: auto!important;
						text-size-adjust: auto!important;
					}
				}
			}
		}
	}
</style>