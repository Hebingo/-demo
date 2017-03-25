<template>
	<div>
		<xheader></xheader>
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
	import xheader from './xheader.vue';
	export default {
		components: {
			xheader,
		}
	}
</script>