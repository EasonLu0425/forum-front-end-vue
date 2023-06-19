<template>
  <div class="container py-5">
    <AdminRestaurantForm 
    :initial-restaurant="restaurant"
    :is-processing="isProcessing"
    @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>

import AdminRestaurantForm from './../components/AdminRestaurantForm.vue'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  components: {
    AdminRestaurantForm
  },
   data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      },
      isProcessing: false
    }
  },
  beforeRouteUpdate (to, from, next) {
    // 路由改變時重新抓取資料
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    async handleAfterSubmit (formData) {
      // 透過 API 將表單資料送到伺服器
      try {
        this.isProcessing = true
        const {data} = await adminAPI.restaurants.update({restaurantId : this.restaurant.id, formData})
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.$router.push({name:'admin-restaurants'})
      } catch (error) {
        this,this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新餐廳資料，請稍後再試'
        })
      }
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    },
    async fetchRestaurant (restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail(restaurantId)
        console.log( 'data', data  )
        
        const {
          id,
          name,
          tel,
          address,
          opening_hours: openingHours,
          description,
          image,
          CategoryId: categoryId
        } = data.restaurant

        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          tel,
          address,
          openingHours,
          description,
          image,
          categoryId
        }
      } catch (error) {
        console.log(error)
        //  STEP 5: 錯誤處理
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
  },
   created () {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
}
</script>