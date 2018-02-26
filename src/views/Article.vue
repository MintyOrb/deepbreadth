<template>
  <section class="post-view">
    <div v-if="!content">loading..</div>
    <!-- <h6 class="post-title">
      {{ detail.title }}
      {{ detail.published }}
      {{ article.words }}
      {{ article.readTime}}
    </h6> -->
    <article v-if="content" v-html="content"></article>
  </section>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import fm from 'front-matter'
  import marked from 'marked'
  import tippy from 'tippy.js'

  export default {
    name: 'articleView',
    props: ['articles'],
    data () {
      return {
        article: {},
        detail: {},
        title: '',
        date: null,
        content: ''
      }
    },

    created () {
      this.findArticle()
      this.loadPost()
      // this.loadTestmd()
    },

    methods: {
      findArticle () { // get metadata from index
        this.article = this.articles.find((art) => { return art.fileName === this.$route.params.title })
      },
      loadPost () {
        let url = `https://api.github.com/repos/bornytm/writing/contents/${this.$route.params.title}`
        axios.get(url)
          .then(response => {
            // Parse front-matter
            // https://github.com/jxson/front-matter#fmstring
            let text = this.decode(response.data.content)
            const content = fm(text)
            this.detail = content.attributes
            this.content = marked(content.body)
            this.initPopovers()
            // Set window title
            window.document.title = this.detail.title
          })
          .catch(err => {
            console.error('[getDetail]', err)
            this.$router.replace('/')
          })
      },

      initPopovers () {
        this.$nextTick(() => {
          tippy('.aside', {
            animation: 'scale',
            arrow: true
          })
        })
      },

      loadTestmd () {
        axios.get('statics/test.md')
          .then(response => {
            const content = fm(response.data)
            this.content = marked(content.body)
            this.initPopovers()
          })
      },

      decode (str) { // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
        return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
      },

      newTab () {
        Vue.nextTick(function () {
          // Load the external link into new tab
          const linksArray = [...document.querySelectorAll('a')]
          const currentHost = window.location.host
          linksArray.forEach(el => {
            if (el.href && el.host !== currentHost) {
              el.target = '_blank'
              // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
              el.rel = 'noopener noreferrer'
            }
          })
        })
      }
    },

    watch: {
      'content': 'newTab'
    }
  }
</script>

<style>
img {
  max-width: 50vw;
  display:block;
  margin-left:auto;
  margin-right:auto;
}
@media (max-width: 600px) {
  img {
    max-width: 100%;
  }
}
article {
  max-width: 700px;
  margin: 0 auto;
}
.post-view {
  margin: 20px;
}

.caption {
  text-align: center;
  font-size: 0.7em;
  margin: 0 auto;
  width: 80%;
  display: block;
  line-height: 1.4;
}
.aside {
  color: red;
}
</style>
