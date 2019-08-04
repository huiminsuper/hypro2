<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
	created () {
		// this.$router.push('/') // 刷新后进入此路由
	}
}
</script>

<style>
html, body, #app, #app > section {
	width: 100%;
	height: 100%;
}

#app > section {
	display: flex;
	flex-direction: column;
}

#app > section > .el-menu--horizontal.el-menu{
		/* height: 61px; */
}

#app > section > section {
	flex: 1;
	/* overflow: auto;
	overflow-x: hidden; */
	overflow: hidden;
}

.el-scrollbar__wrap {
	overflow-x: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
	padding: 0;
	margin: 0;
}

.setFlex {
	display: flex;
}

.setFlexColumn {
	display: flex;
	flex-direction: column;
}

.setFlexOne {
	flex: 1;
}

.wrap {
	padding-top: 30px;
}

.section-padding-top {
	padding-top: 15px;
}

.section-padding-top .search-div {
	text-align: left;
	padding-left: 20px;
}

.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
		font-weight: 400;
	}
	
	.el-dialog {
		    /* left: 50%;
			margin-left: -190px;
			top: 50%;
			margin-top: -101px;
			margin-bottom: initial;
			margin-right: initial; */
	}
</style>
