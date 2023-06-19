<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img
          :src="user.image | emptyImageFilter"
          width="300px"
          height="300px"
        >
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{ user.name }}
          </h5>
          <p class="card-text">
            {{ user.email }}
          </p>
          <ul class="list-unstyled">
            <li>
              <strong>{{ commentsLength }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ favoritedRestaurantsLength }}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{ followingsLength }}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{ followersLength }}</strong> followers (追隨者)
            </li>
          </ul>
          <template v-if="isAuthenticated">
            <router-link
              :to="{name: 'user-profile-edit', params:{id: user.id}}"
              class="btn btn-primary"
            >
              Edit
            </router-link>
          </template>
          <template v-else>
            <button
              v-if="isFollowed"
              type="button"
              class="btn btn-danger"
              @click.stop.prevent="deleteFollowing()"
            >
              取消追蹤
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click.stop.prevent="addFollowing()"
            >
              追蹤
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const dummyUser = {
  currentUser :{
    id:1,
    name:'管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

import { emptyImageFilter } from './../utils/mixins'
export default {
  name:'UserProfileCard',
  props: {
    user: {
      type:Object,
      require:true
    },
    isFollowed: {
      type: Boolean,
      require: true
    },
    followingsLength: {
      type:Number,
      require:true
    },
    followersLength: {
      type:Number,
      require:true
    },
    commentsLength: {
      type:Number,
      require:true
    },
    favoritedRestaurantsLength: {
      type:Number,
      require:true
    },
  },
  data() {
    return {
      currentUser:{},
      isAuthenticated: false
    }
  },
  methods: {
    fetchCurrentUser() {
      const {currentUser, isAuthenticated} = dummyUser
      this.currentUser = currentUser
      this.isAuthenticated = isAuthenticated
    },
    addFollowing(id) {
      this.$emit('handle-follow-click', id )
    },
    deleteFollowing(id) {
      this.$emit('handle-unfollow-click', id )
    },
  },
  created() {
    this.fetchCurrentUser()
  },
  mixins: [emptyImageFilter],
  
}
</script>