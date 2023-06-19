<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr>

    <ul>
      <li>評論數：{{ restaurant.commentsLength}} </li>
      <li>瀏覽次數： {{ restaurant.viewCounts }} </li>
    </ul>

    <button
      type="button"
      class="btn btn-link"
      @click="$router.back()"
    >
      回上一頁
    </button>
  </div>
</template>

<script>

const dummyData = {
    "restaurant": {
        "id": 1,
        "name": "Leora Pfeffer",
        "tel": "098.055.3938",
        "address": "930 Conn Row",
        "opening_hours": "08:00",
        "description": "Perferendis eos illo sequi eos ex.\nArchitecto iusto et nulla numquam.\nEt quia repellendus perspiciatis.\nOptio sed dolorem.\nDolore cum expedita et neque qui vel.",
        "image": "https://loremflickr.com/320/240/restaurant,food/?random=21.832520814339773",
        "viewCounts": 0,
        "createdAt": "2023-06-06T09:37:38.000Z",
        "updatedAt": "2023-06-06T09:37:38.000Z",
        "CategoryId": 3,
        "Category": {
            "id": 3,
            "name": "義大利料理",
            "createdAt": "2023-06-06T09:37:38.000Z",
            "updatedAt": "2023-06-06T09:37:38.000Z"
        },
        "Comments": [
            {
                "id": 101,
                "text": "Et aut eligendi autem.",
                "UserId": 1,
                "RestaurantId": 1,
                "createdAt": "2023-06-06T09:37:38.000Z",
                "updatedAt": "2023-06-06T09:37:38.000Z",
                "User": {
                    "id": 1,
                    "name": "root",
                    "email": "root@example.com",
                    "password": "$2a$10$7vnnFXP/BX9jX6AIJF1k9.pFnZ8pEwf/LcIaVWvhTKLWvYxZdpR/.",
                    "isAdmin": true,
                    "image": null,
                    "createdAt": "2023-06-06T09:37:38.000Z",
                    "updatedAt": "2023-06-06T09:37:38.000Z"
                }
            },
            {
                "id": 1,
                "text": "Ratione veritatis optio in.",
                "UserId": 2,
                "RestaurantId": 1,
                "createdAt": "2023-06-06T09:37:38.000Z",
                "updatedAt": "2023-06-06T09:37:38.000Z",
                "User": {
                    "id": 2,
                    "name": "user1",
                    "email": "user1@example.com",
                    "password": "$2a$10$j76V.l9gjJWZacZTgKcJU.aDtUFPP0jafb9g/Y9qoBg3tcNWJrhY2",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2023-06-06T09:37:38.000Z",
                    "updatedAt": "2023-06-06T09:37:38.000Z"
                }
            },
            {
                "id": 51,
                "text": "Asperiores exercitationem quasi sunt sunt eaque dignissimos laborum laboriosam.",
                "UserId": 3,
                "RestaurantId": 1,
                "createdAt": "2023-06-06T09:37:38.000Z",
                "updatedAt": "2023-06-06T09:37:38.000Z",
                "User": {
                    "id": 3,
                    "name": "user2",
                    "email": "user2@example.com",
                    "password": "$2a$10$EL3O/QKH8bTd1BKdPS3QyOCV0aD1mBYv9Wz8mWHb6.1XIRk..6EUK",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2023-06-06T09:37:38.000Z",
                    "updatedAt": "2023-06-06T09:37:38.000Z"
                }
            }
        ]
    }
}

export default {
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        commentsLength: 0,
        viewCounts: 0
      },
      isLoading: true
    }
  },
  methods: {
    fetchRestaurant() {
       const { id, name, Category, Comments, viewCounts } = dummyData.restaurant

        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          categoryName: Category ? Category.name : '未分類',
          commentsLength: Comments.length,
          viewCounts
        }
    }
  },
  created () {
    this.fetchRestaurant()
  },
}
</script>