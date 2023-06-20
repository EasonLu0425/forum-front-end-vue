<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea
        class="form-control"
        rows="3"
        name="text"
        v-model="text"
      />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button
        type="button"
        class="btn btn-link"
        @click="$router.back()"
      >回上一頁</button>
      <button
        type="submit"
        class="btn btn-primary mr-0"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { Toast } from '../utils/helpers'
import restaurantsAPI from './../apis/restaurants'

export default {
  props: { 
    restaurantId:{
      type:Number,
      required: true
    }
  },
  data() {
    return {
      text:'',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true
        if (!this.text) {
          Toast.fire({
            icon: 'warning',
            title: '您尚未填寫任何評論'
          })
          return
        }

        const {data} = await restaurantsAPI.addComment({ restaurantId: this.restaurantId, text: this.text })
        const {commentId} = data
        console.log ('data', data)
        this.$emit('after-create-comment', {
          commentId,
          restaurantId: this.restaurantId,
          text: this.text
        })
        this.isProcessing = false
        this.text = ''
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon:'error',
          title:'目前無法新增評論，請稍後再試'
        })
      }
      // Todo:向API請求comment Id
      // 伺服器新增comment成功後
    }
  },
}
</script>