<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{restaurant.name}}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{restaurant.categoryName}}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block" 
    :src="restaurant.image | emptyImage"
        style="width: 250px;margin-bottom: 25px;"
      >
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{restaurant.openingHours}}
          </li>
          <li>
            <strong>Tel:</strong>
            {{restaurant.tel}}
          </li>
          <li>
            <strong>Address:</strong>
            {{restaurant.address}}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link
        class="btn btn-primary btn-border mr-2"
        :to="{name: 'restaurant-dashboard', params: { id: restaurant.id }}"
      >Dashboard</router-link>

      <button
        type="button"
        class="btn btn-danger btn-border mr-2"
        v-if="restaurant.isFavorited"
        @click.stop.prevent="deleteFavorite"
      >
        移除最愛
      </button>
      <button
        type="button"
        v-else
        class="btn btn-primary btn-border mr-2"
        @click.stop.prevent="addFavorite"
      >
        加到最愛
      </button>
      <button
        type="button"
        v-if="restaurant.isLiked"
        class="btn btn-danger like mr-2"
        @click.stop.prevent="deleteLike"
      >
        Unlike
      </button>
      <button
        type="button"
        v-else
        class="btn btn-primary like mr-2"
        @click.stop.prevent="addLike"
      >
        Like
      </button>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
import usersAPI from './../apis/users'
import { Toast } from '../utils/helpers'

export default {
  name:"restaurantDetails",
  mixins: [emptyImageFilter],
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant
    }
  },
  methods: {
    addFavorite() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: true
      }
    },
    deleteFavorite() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: false
      }
    },
    async addLike() {
      try {
        const {data} = await usersAPI.addLike({restaurantId: this.restaurant.id})
        if (data.stauts === 'error') {
          throw new Error(data.message)
        }
        this.restaurant = {
        ...this.restaurant,
        isLiked: true
      }
      } catch (error) {
        Toast.fire({
          icon:'error',
          title:'目前無法新增like，請稍後再試'
        })
      }
      
    },
    async deleteLike() {
      try {
        const {data} = await usersAPI.deleteLike({restaurantId: this.restaurant.id})
        if (data.stauts === 'error') {
          throw new Error(data.message)
        }
        this.restaurant = {
        ...this.restaurant,
        isLiked: false
      }
      } catch (error) {
        Toast.fire({
          icon:'error',
          title:'目前無法刪除like，請稍後再試'
        })
      }
    },
  },
  watch: {
    initialRestaurant (newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },
}
</script>