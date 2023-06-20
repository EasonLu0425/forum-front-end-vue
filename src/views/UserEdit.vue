<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          :value="name"
          required
        >
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
        v-if="image"
        :src="image"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      >
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileUpload"
        >
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="isProcessing"
      >
        {{ isProcessing ? '資料更新中...' : 'Submit' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'

const dummyData = {
  'profile': {
    'id': 1,
    'name': 'root',
    'email': 'root@example.com',
    'password': '$2a$10$OJ3jR93XlEMrQtYMWOIQh.EINWgaRFTXkd0Xi5OC/Vz4maztUXEPe',
    'isAdmin': true,
    'image': 'https://i.imgur.com/58ImzMM.png',
    'createdAt': '2019-07-30T16:24:54.983Z',
    'updatedAt': '2019-08-01T10:33:51.095Z',
  },
}
import usersAPI from './../apis/users'
export default {
  data() {
    return {
      id:0,
      name:'',
      email:'',
      image:'',
      isProcessing: false
    }
  },
  methods: {
    async setUser(userId) {
      try {
        const {id, name, email, image} = this.currentUser
        if (id.toString() !== userId.toString()) {
          this.$route.push({name:'not-found'})
          return
        }
        this.id = id
        this.name = name
        this.email = email
        this.image = image
      } catch(error) {
        Toast.fire({
          icon:'error',
          title:'目前取得資料，請稍後再試'
        })
      }
    },
    handleFileUpload(e) {
      const files = e.target.files
      console.log(files)
      if (files.length === 0) {
        this.user.image = ''
      } else {
        const filesURL = window.URL.createObjectURL(files[0])
        console.log(filesURL)
        this.image = filesURL
      }
      
    },
    async handleSubmit(e) {
      try{
        if (!this.name) {
          Toast.fire({
            icon: 'warning',
            title: '您尚未填寫姓名'
          })
          return
        }

        const form = e.target
        this.isProcessing = true
        const formData = new FormData(form)
        const {data} = await usersAPI.edit({userId: this.id, formData})
        
      
        this.isProcessing = false
        this.$router.push({ name: 'user-profile', params: { id: this.id } })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon:'error',
          title:'目前無法編輯，請稍後再試'
        })
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.setUser( id)
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    currentUser (user) {
      if (user.id === -1) return
      const { id } = this.$route.params
      this.setUser(id)
    }
  },
}
</script>