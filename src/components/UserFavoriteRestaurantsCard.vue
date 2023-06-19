<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ favoritedRestaurantsLength }}</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <router-link
        v-for="favoritedRestaurant in user.FavoritedRestaurants"
        :key="favoritedRestaurant.id"
        :to="{ name: 'restaurant', params: { id: favoritedRestaurant.id } }"
      >
        <img
          :src="favoritedRestaurant.image | emptyImageFilter"
          width="60"
          height="60"
          class="mr-1 mb-1"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
export default {
  name:'UserFavoritedRestaurantsCard',
  props:{
    user:{
      type:Object,
      require:true
    },
    favoritedRestaurantsLength: {
      type:Number,
      require:true
    }
  },
  mixins: [emptyImageFilter],
  
}
</script>