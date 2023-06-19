<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ followersLength }}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <router-link
        v-for="follower in user.Followers"
        :key="follower.id"
        :to="{ name: 'user', params: { id: follower.id } }"
      >
        <img
          :src="follower.image | emptyImageFilter"
          width="60"
          height="60"
          class="mr-1"
        >
      </router-link>
    </div>
  </div>
</template>


<script>
import { emptyImageFilter } from './../utils/mixins'
export default {
  name:'UserFollowersCard',
  props: {
    user: {
      type:Object,
      require: true
    },
    followersLength: {
      type:Number,
      require: true
    }
  },
  mixins: [emptyImageFilter],
  
}
</script>