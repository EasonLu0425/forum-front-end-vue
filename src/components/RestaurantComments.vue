<template>
  <div>
    <h2 class="my-4">
      所有評論：
    </h2>

    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          type="button"
          class="btn btn-danger float-right"
          v-if="currentUser.isAdmin"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
        >
          Delete
        </button>
        <h3>
          <a href="#">
            {{comment.User.name}}
          </a>
        </h3>
        <p>{{comment.text}}</p>
        <footer class="blockquote-footer">
          {{comment.createdAt | fromNow}}
        </footer>
      </blockquote>
      <hr>
    </div>
  </div>
</template>

<script>

import { fromNowFilter } from './../utils/mixins'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from '../utils/helpers'
import {mapState} from 'vuex'

export default {
  name:"restaurantComments",
  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  computed:{
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods:{
    async handleDeleteButtonClick (commentId) {
      try {
        console.log('handleDeleteButtonClick', commentId)
        const {data} = await restaurantsAPI.deleteComment({commentId})
        if (data.status === 'error') {
          throw new Error(data.message)
        }
      this.$emit('after-delete-comment', commentId)
      } catch (error) {
        Toast.fire({
          icon:'error',
          title:'目前無法刪除評論，請稍後再試'
        })
      }
    }
  },
  mixins: [fromNowFilter],
}
</script>