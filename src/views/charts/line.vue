<template><!-- view 流程图 -->
	<div class="chart-container" >
		<chart width="100%" height="400px" />
	</div>
</template>

<script>
	import Chart from '@/components/Charts/Line'
	
	export default {
		name: 'FlowChart',
		components: { Chart }
	}
</script>

<style scope>
	
</style>