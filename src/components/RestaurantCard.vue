<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        :src="restaurant.image | emptyImage" 
        alt="Card image cap"
        width="286px"
        height="180px"
      >
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id }}"
          >
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary">{{ restaurant.Category.name }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button 
          type="button"
          v-if="restaurant.isFavorited"
          class="btn btn-danger btn-border favorite mr-2"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
        >
          移除最愛
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
          @click.stop.prevent="addFavorite(restaurant.id)"
        >
          加到最愛
        </button>
         <button
          type="button"
          v-if="restaurant.isLiked"
          class="btn btn-danger like mr-2"
          @click.stop.prevent="deleteLike(restaurant.id)"
        >
          Unlike
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary like mr-2"
          @click.stop.prevent="addLike(restaurant.id)"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  mixins: [emptyImageFilter],
  data () {
    return {
      restaurant: this.initialRestaurant
    }
  },
  methods: {
    async addFavorite(restaurantId) {
      try{
        const {data} = await usersAPI.addFavorite({restaurantId})

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
        }
      } catch(error) {
        Toast.fire({
          icon:'error',
          title:'無法加入最愛請稍後再試'
        })
      }
    },
    async deleteFavorite(restaurantId) {
      try{
        const {data} = await usersAPI.deleteFavorite({restaurantId})

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false
        }
      } catch(error) {
        Toast.fire({
          icon:'error',
          title:'無法刪除最愛請稍後再試'
        })
      }
    },
    async addLike(restaurantId) {
      try{
        const {data} = await usersAPI.addLike({restaurantId})

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        }
      } catch(error) {
        Toast.fire({
          icon:'error',
          title:'無法like請稍後再試'
        })
      }
    },
    async deleteLike(restaurantId) {
      try{
        const {data} = await usersAPI.deleteLike({restaurantId})

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        }
      } catch(error) {
        Toast.fire({
          icon:'error',
          title:'無法unlike請稍後再試'
        })
      }
    },
  }
}
</script>