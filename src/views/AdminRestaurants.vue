<template>

<div class="container py-5">

   <AdminNav />

   <router-link to="/admin/restaurants/new" class="btn btn-primary mb-4">
    New restaurant
   </router-link>
    

  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Name
        </th>
        <th
          scope="col"
          width="300"
        >
          操作
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link :to="{name: 'admin-restaurant', params: {id: restaurant.id}}" class="btn btn-link">
            Show
          </router-link>

          <router-link
            :to = "{name:'admin-restaurant-edit', params: {id: restaurant.id}}"
            class="btn btn-link"
          >Edit</router-link>

          <button
            type="button"
            class="btn btn-link"
            @click.stop.prevent="deleteRestaurant(restaurant.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>


import AdminNav from './../components/AdminNav.vue'
import adminAPI from './../apis/admin'
import {Toast} from './../utils/helpers'

export default {
  components: {
    AdminNav
  },
  data () {
    return {
      restaurants: []
    }
  },
  created () {
    this.fetchRestaurants()
  },
  methods: {
    async fetchRestaurants () {
        try {
            const {data} = await adminAPI.restaurants.get('')
            this.restaurants = data.restaurants
        } catch (error) {
            Toast.fire({
                icon:'error',
                title:'無法取得餐廳清單，請稍後再試'
            })
        }
    },
    async deleteRestaurant(restaurantId) {
        try {
            const {data} = await adminAPI.restaurants.delete(restaurantId)
            if (data.status === 'error') {
                throw new Error(data.message)
            }

            this.$router.push({ name: 'admin-restaurants' })
        } catch (error) {
            Toast.fire({
                icon:'error',
                title:'無法刪除餐廳，請稍後再試'
            })
        }
        this.restaurants = this.restaurants.filter( restaurant => restaurant.id !== restaurantId)
    }
  }
}
</script>