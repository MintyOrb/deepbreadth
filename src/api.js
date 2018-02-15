import axios from 'axios'
import 'es6-promise/auto'

/**
 * Format GitHub Api url for content list
 * @returns {string}
 */
export function getListUrl () {
  // @see https://developer.github.com/v3/repos/contents/#get-contents
  // @example https://api.github.com/repos/viko16/vue-ghpages-blog/contents/markdown?ref=markdown
  // let url = `https://api.github.com/repos/${conf.repo}/contents/`
  // if (conf.path) url += conf.path
  // if (conf.branch) url += `?ref=${conf.branch}`
  // return url
}

export { axios as axiosInstance }

// Cache processor
const Cache = {
  get: (key) => {
    if (!window.sessionStorage) return false
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  set: (key, data) => {
    if (!window.sessionStorage) return false
    window.sessionStorage.setItem(key, JSON.stringify(data))
    return true
  },
  has: (key) => {
    return Boolean(window.sessionStorage && window.sessionStorage.hasOwnProperty(key))
  }
}

export default {

  // getList () { // just fetch json that is made on commit
  // if (Cache.has('list')) {
  //   // Read from cache
  //   return Promise.resolve(Cache.get('list'))
  // } else {
  //   return axios.get(getListUrl())
  //     .then(res => res.data)
  //     .then(arr => {
  //       // Data cleaning
  //       const list = arr.map(({name, sha, size}) => ({
  //         title: onlyTitle(name),
  //         date: onlyDate(name),
  //         sha,
  //         size
  //       }))
  //       // Save into cache
  //       Cache.set('list', list)
  //       // ..then return
  //       return list
  //     })
  // }
  // },

  getDetail (name) {
    const httpOpts = {
      // https://developer.github.com/v3/media/#raw-1
      headers: { Accept: 'application/vnd.github.v3.raw' }
    }
    name = 'e3b1eaaee57862d3b65c54e3dccd86acaad0ff8a'
    const cacheKey = 'post.' + name

    if (Cache.has(cacheKey)) {
      // Read from cache
      return Promise.resolve(Cache.get(cacheKey))
    }
    else {
      console.log('about to get fo real')
      console.log(`https://api.github.com/repos/bornytm/writing/git/blobs/${name}`)
      return axios.get(`https://api.github.com/repos/bornytm/writing/git/blobs/${name}`, httpOpts)
        // @see https://developer.github.com/v3/git/blobs/#get-a-blob
        .then(res => res.data)
        .then(content => {
          // Save into cache
          Cache.set(cacheKey, content)
          // ..then return
          return content
        })
    }
  }
}
