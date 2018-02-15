<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <header class="limited">
      <div class="header">
      <div>
      <router-link to="/">
        <img class="icon" src="/statics/bptcs.PNG" />
      </router-link>
      </div>
      <div class='title'>
        <router-link to="/">Deep Breadth</router-link>
      </div>
      <div style="clear: both"></div>

      <div class='subtitle'>
        <!-- some of everything. -->
        big pictures, thresholds, and cross sections.
      </div>

      </div>
    </header>
    <transition name="fade" mode="out-in" appear>
      <router-view :articles="articles"></router-view>
    </transition>
  </div>
</template>

<script>
/*
 * Root component
 */
import axios from 'axios'

export default {
  created () {
    this.loadIndex()
  },
  data () {
    return {
      articles: [],
      loading: true
    }
  },
  methods: {
    loadIndex () { // get index from github repo
      this.loading = true
      let url = 'https://api.github.com/repos/bornytm/writing/contents/index.json'
      axios.get(url)
        .then(res => res.data)
        .then(data => {
          this.articles = JSON.parse(atob(data.content))
          this.loading = false
        })
    }
  }
}
</script>

<style>
/* * {outline:1px black solid;} */
h1, h2, h3, h4, h5, h6 {
  line-height: initial;
  font-weight: bold;
}
h2 {
  font-size: 2.4rem;
  margin:0;
}
h4 {
  font-size: 1.2rem;
  margin:0;
}
h3 {
  font-size: 1.5rem;
  margin-bottom: -2px;
}
p {
  font-size: 1.2rem;
  line-height: auto;
  margin: 0 0 1.4rem;
}
li {
  margin:5px;
  font-size: 1.3rem;
}
ol li {
  margin:20px;
}
.limited {
  position: relative;
  max-width: 700px;
  margin: 0 auto;
}
#app {
  min-height: 101vh;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s
}
.fade-enter, .fade-leave-active, .fade-leave-to {
  opacity: 0
}
.fade-enter-to, .fade-leave {
  opacity: 1;
}
.subtitle {
  text-align: center;
  font-weight: 200;
  font-size: 14px;
}
.icon {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 110px;
}
.header {
  background-color: white;
  z-index: 1;
}
.links{
  margin-top: 20px;
  text-align:center;
}
.links a {
  color: gray;
  transition: color .3s;
  padding-right:3px;
}
.links a:hover{
  color:black;
}
.separator{
  border-right: 1px solid black;
  padding-right:3px;
}

::-moz-selection,
::selection {
	background: #b2d7ff;
}

body {
	font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-webkit-text-size-adjust: none;
	padding: 0;
	background: #fff;
	color: #555;
  min-height: 101vh;
}

a {
	text-decoration: none;
}

.header {
	margin: 50px auto;
}

.title {
	padding-top: 13px;
  text-align: center;
  font-weight: 200;
}

.title a {
	font-size: 29px;
	letter-spacing: 5px;
	text-transform: uppercase;
	color: #555;
}

pre {
	background: #f7f7f7 !important;
	padding: 16px;
	overflow-x: auto;
	white-space: pre;
}

code {
	background: #f7f7f7;
	font-family: "Ubuntu Mono", "PT Mono", Consolas, Monaco, Menlo, monospace !important;
}

blockquote {
	margin: 0;
	padding: 0 16px;
  border-left: 2px solid #545454;
}

</style>
