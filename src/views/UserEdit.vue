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
          :value="user.name"
          required
        >
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
        v-if="user.image"
        :src="user.image"
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
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>

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

export default {
  data() {
    return {
      user: {
        name:'',
        image: '',
      }
    }
  },
  methods: {
    fetchUser(userId) {
      console.log('fetchUser id:' , userId)
      const { profile } = dummyData
      const { name, image } = profile
      // console.log(name, image)
      this.user = {
        ...this.user,
        name,
        image
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
        this.user.image = filesURL
      }
      
    },
    handleSubmit(e) {
      const form = e.target
      console.log(form)
      const formData = new FormData(form)
      for (let [name, value] of formData.entries()) {
        console.log(name + ':' + value)
      }
    // 透過API傳送表單到伺服器
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchUser( id)
  }
}
</script>