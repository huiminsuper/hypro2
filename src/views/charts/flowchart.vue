<template><!-- view 流程图 -->
	<div class="chart-container" >
		<chart width="100%" height="500px" bgColor="white" />
	</div>
</template>

<script>
	import Chart from '@/components/Charts/Chart'
	
	export default {
		name: 'FlowChart',
		components: { Chart }
	}
</script>

<style scope>
	
</style>