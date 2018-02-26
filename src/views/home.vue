<template>
  <div class='limited'>
    <isotope ref='arts' :options='{}' :list="articles">
      <q-card v-for='article, i in articles' :key='i' class="card art hoverable-3">
        <router-link :to="{ name: 'article', params: {title: article.fileName} }">
          <q-card-media>
            <img :src="article.thumbnail">
          </q-card-media>
        </router-link>
        <!-- <q-card-separator /> -->
        <router-link :to="{ name: 'article', params: {title: article.fileName} }">
          <q-card-title>
            {{article.title}}
          </q-card-title>
        </router-link>

        <q-card-main>
          {{article.subtitle}}
        </q-card-main>
      </q-card>
    </isotope>

  </div>
</template>
<script>
  import isotope from 'vueisotope'
  import { QCard, QCardTitle, QCardMain, QCardSeparator, QCardMedia } from 'quasar'

  export default {
    name: 'home',

    props: ['articles'],

    components: {
      isotope, QCard, QCardTitle, QCardMain, QCardSeparator, QCardMedia
    },

    mounted () {
      window.document.title = 'Deep Breadth - articles'
      setInterval(() => {
        this.$refs.arts.layout()
      }, 1000)
    }
  }
</script>
<style scoped>
.q-card-container {
  padding: 0px 20px 0px 19px;
}
.q-card-title {
  line-height: 1.3rem;
  font-weight: 600;
}
.card {
  padding-bottom: 20px;
  width: calc(50% - 16px);
  word-break: break-word;
}
.grow {
  transition: all .3s;
}
.grow:hover {
  transform: scale(1.2);
}
a {
  color: black
}
span a {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}
</style>
