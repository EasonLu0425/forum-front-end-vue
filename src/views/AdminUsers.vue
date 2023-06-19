<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th
            scope="col"
            width="140"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">
            {{user.id}}
          </th>
          <td>{{user.email}}</td>
          <td v-if="user.isAdmin">Admin</td>
          <td v-else>User</td>
          <td v-if="currentUser.id !== user.id">
            <button
              type="button"
              class="btn btn-link"
              v-if="user.isAdmin"
              @click.stop.prevent="toggleUserRole(user.id)"
            >
              set as user
            </button>
            <button
              type="button"
              class="btn btn-link"
              v-else
              @click.stop.prevent="toggleUserRole(user.id)"
            >
              set as Admin
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

const dummyData = {
    "users": [
        {
            "id": 1,
            "name": "root",
            "email": "root@example.com",
            "password": "$2a$10$7vnnFXP/BX9jX6AIJF1k9.pFnZ8pEwf/LcIaVWvhTKLWvYxZdpR/.",
            "isAdmin": true,
            "image": null,
            "createdAt": "2023-06-06T09:37:38.000Z",
            "updatedAt": "2023-06-06T09:37:38.000Z"
        },
        {
            "id": 2,
            "name": "user1",
            "email": "user1@example.com",
            "password": "$2a$10$j76V.l9gjJWZacZTgKcJU.aDtUFPP0jafb9g/Y9qoBg3tcNWJrhY2",
            "isAdmin": false,
            "image": null,
            "createdAt": "2023-06-06T09:37:38.000Z",
            "updatedAt": "2023-06-06T09:37:38.000Z"
        },
        {
            "id": 3,
            "name": "user2",
            "email": "user2@example.com",
            "password": "$2a$10$EL3O/QKH8bTd1BKdPS3QyOCV0aD1mBYv9Wz8mWHb6.1XIRk..6EUK",
            "isAdmin": false,
            "image": null,
            "createdAt": "2023-06-06T09:37:38.000Z",
            "updatedAt": "2023-06-06T09:37:38.000Z"
        }
    ]
}
const dummyUser = {
  'profile': {
    'id': 1,
    'name': 'root',
    'email': 'root@example.com',
    'password': '$2a$10$OJ3jR93XlEMrQtYMWOIQh.EINWgaRFTXkd0Xi5OC/Vz4maztUXEPe',
    'isAdmin': true,
    'image': 'https://i.imgur.com/58ImzMM.png',
    'createdAt': '2019-07-30T16:24:54.983Z',
    'updatedAt': '2019-08-01T10:33:51.095Z',
  }
}

import AdminNav from './../components/AdminNav.vue'
export default {
  name:'AdminUsers',
  components: {
    AdminNav
  },
  data() {
    return {
      users:[],
      currentUser: {}
    }
  },
  methods: {
    fetchUsers () {
      const { users } = dummyData
      this.users = users
    },
    fetchCurrentUser() {
      const currentUser = dummyUser.profile
      this.currentUser = currentUser
    },
    toggleUserRole (userId) {
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isAdmin: !user.isAdmin
          }
        }
      return user
      })
    }
  },
  created () {
    this.fetchCurrentUser()
    this.fetchUsers()
  }
}
</script>