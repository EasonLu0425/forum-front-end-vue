<template>
  <div class="card mb-3">
    <div class="card-header">
      <strong>{{ followingsLength }}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <router-link
        v-for="following in user.Followings"
        :key="following.id"
        :to="{ name: 'user', params: { id: following.id } }"
      >
        <img
          :src="following.image | emptyImageFilter"
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
  name:'UserFollowingsCard',
  props:{
    user:{
      type:Object,
      require:true
    },
    followingsLength:{
      type:Number,
      require:true
    }
  },
  mixins:[emptyImageFilter],
}
</script>