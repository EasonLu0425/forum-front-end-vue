<template>
  <div class="container py-5">
    <NavTabs /> 

    <h1 class="mt-5">
      最新動態
    </h1>
    <hr> 
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
        <NewestRestaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <!-- 最新評論 NewestComments-->
        <h3>最新評論</h3>
        <Feeds  :comments="comments"/>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs.vue'
import NewestRestaurants from './../components/NewestRestaurants.vue'
import Feeds from './../components/Feeds.vue'
import { Toast } from '../utils/helpers'
import restaurantsAPI from './../apis/restaurants'



export default {
  components: {
    NavTabs,
    NewestRestaurants,
    Feeds,
  },
  data () {
    return {
      restaurants: [],
      comments: []
    }
  },
  created () {
    this.fetchFeeds()
  },
  methods: {
    async fetchFeeds () {
      try{
        const response = await restaurantsAPI.getFeeds()
        const {restaurants, comments} = response.data
        this.restaurants = restaurants
        this.comments = comments.filter(comment => comment.Restaurant && comment.text)
      } catch(error) {
        Toast.fire({
            icon:'error',
            title:'無法取得評論'
        }) 
      } 
    }
  }
}
</script>