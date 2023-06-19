<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ commentsLength }}</strong> 已評論餐廳
    </div>
    <div class="card-body">
      <router-link
        v-for="comment in user.Comments"
        :key="comment.id"
        :to="{name: 'restaurant', params: { id: comment.Restaurant.id }}"
      >
        <img
          :src="comment.Restaurant.image | emptyImageFilter"
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
  name:'UserCommentsCard',
  props: {
    user: {
      type:Object,
      require: true
    },
    commentsLength: {
      type: Number,
      require: true
    }
  },
  mixins:[emptyImageFilter],
  
}
</script>