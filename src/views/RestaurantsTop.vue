<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>

    <hr />
   <TopRestaurantsCard v-for="restaurant in restaurants"
      :key="restaurant.id" :initialRestaurant="restaurant" />
  </div>
</template>

<script>
// const dummyData = {
//   restaurants: [
//     {
//       id: 50,
//       name: "Sanford Jacobi",
//       tel: "046.199.6496 x77188",
//       address: "452 Lehner Forges",
//       opening_hours: "08:00",
//       description: "iusto",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=22.472478500839422",
//       viewCounts: 0,
//       createdAt: "2023-06-06T09:37:38.000Z",
//       updatedAt: "2023-06-06T09:37:38.000Z",
//       CategoryId: 2,
//       FavoritedUsers: [],
//       isFavorited: false,
//       FavoriteCount: 0,
//     },
//     {
//       id: 49,
//       name: "Natalia Stark MD",
//       tel: "1-149-588-1476 x352",
//       address: "819 Romaguera Islands",
//       opening_hours: "08:00",
//       description: "Dolor nulla est optio. Voluptatem rerum dicta. Max",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=83.94329372328093",
//       viewCounts: 0,
//       createdAt: "2023-06-06T09:37:38.000Z",
//       updatedAt: "2023-06-06T09:37:38.000Z",
//       CategoryId: 5,
//       FavoritedUsers: [],
//       isFavorited: false,
//       FavoriteCount: 0,
//     },
//     {
//       id: 48,
//       name: "Waylon Ortiz",
//       tel: "355.297.7402",
//       address: "0746 Mosciski Street",
//       opening_hours: "08:00",
//       description: "Voluptas earum aliquid laboriosam repellat eos at ",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=92.93888956817477",
//       viewCounts: 0,
//       createdAt: "2023-06-06T09:37:38.000Z",
//       updatedAt: "2023-06-06T09:37:38.000Z",
//       CategoryId: 5,
//       FavoritedUsers: [],
//       isFavorited: false,
//       FavoriteCount: 0,
//     },
//     {
//       id: 47,
//       name: "Larissa Erdman",
//       tel: "474.888.8844 x237",
//       address: "88989 Larkin Parkway",
//       opening_hours: "08:00",
//       description: "Suscipit eligendi aut dolorem. Sapiente veritatis ",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=66.751596905716",
//       viewCounts: 0,
//       createdAt: "2023-06-06T09:37:38.000Z",
//       updatedAt: "2023-06-06T09:37:38.000Z",
//       CategoryId: 3,
//       FavoritedUsers: [],
//       isFavorited: false,
//       FavoriteCount: 0,
//     },
//     {
//       id: 46,
//       name: "Ruth Dach",
//       tel: "920-412-2315",
//       address: "0090 Neha Cliff",
//       opening_hours: "08:00",
//       description: "Hic laudantium ab optio saepe. Quibusdam asperiore",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=64.11581997770045",
//       viewCounts: 0,
//       createdAt: "2023-06-06T09:37:38.000Z",
//       updatedAt: "2023-06-06T09:37:38.000Z",
//       CategoryId: 4,
//       FavoritedUsers: [],
//       isFavorited: false,
//       FavoriteCount: 0,
//     },
//     {
//       id: 45,
//       name: "Idella Hamill",
//       tel: "775-137-3604",
//       address: "9100 Okuneva Parkways",
//       opening_hours: "08:00",
//       description: "Provident et cum sed beatae.\nQuis quia et maxime e",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=48.49454705001168",
//       viewCounts: 0,
//       createdAt: "2023-06-06T09:37:38.000Z",
//       updatedAt: "2023-06-06T09:37:38.000Z",
//       CategoryId: 1,
//       FavoritedUsers: [],
//       isFavorited: false,
//       FavoriteCount: 0,
//     },
//     {
//       id: 44,
//       name: "Rey Reynolds",
//       tel: "811.520.0507",
//       address: "240 Clyde Islands",
//       opening_hours: "08:00",
//       description: "Eius omnis voluptatem aut. Doloremque beatae et id",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=0.6564191266303032",
//       viewCounts: 0,
//       createdAt: "2023-06-06T09:37:38.000Z",
//       updatedAt: "2023-06-06T09:37:38.000Z",
//       CategoryId: 1,
//       FavoritedUsers: [],
//       isFavorited: false,
//       FavoriteCount: 0,
//     },
//     {
//       id: 43,
//       name: "Archibald Ryan",
//       tel: "1-134-624-4376",
//       address: "4832 Lakin Curve",
//       opening_hours: "08:00",
//       description: "Porro aspernatur ut illum aliquam et voluptas libe",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=82.76784582630813",
//       viewCounts: 0,
//       createdAt: "2023-06-06T09:37:38.000Z",
//       updatedAt: "2023-06-06T09:37:38.000Z",
//       CategoryId: 4,
//       FavoritedUsers: [],
//       isFavorited: false,
//       FavoriteCount: 0,
//     },
//     {
//       id: 42,
//       name: "Rico Hamill",
//       tel: "759.487.7123 x480",
//       address: "43325 Shawn Land",
//       opening_hours: "08:00",
//       description: "Voluptas eum ducimus accusantium reprehenderit fac",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=28.94827818113095",
//       viewCounts: 0,
//       createdAt: "2023-06-06T09:37:38.000Z",
//       updatedAt: "2023-06-06T09:37:38.000Z",
//       CategoryId: 4,
//       FavoritedUsers: [],
//       isFavorited: false,
//       FavoriteCount: 0,
//     },
//     {
//       id: 41,
//       name: "Aliyah Romaguera V",
//       tel: "915-947-5102",
//       address: "220 Tod Falls",
//       opening_hours: "08:00",
//       description: "dolorum",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=93.068764833407",
//       viewCounts: 0,
//       createdAt: "2023-06-06T09:37:38.000Z",
//       updatedAt: "2023-06-06T09:37:38.000Z",
//       CategoryId: 1,
//       FavoritedUsers: [],
//       isFavorited: false,
//       FavoriteCount: 0,
//     },
//   ],
// };

import NavTabs from "./../components/NavTabs.vue";
import TopRestaurantsAPI from "./../apis/restaurants";
import TopRestaurantsCard from './../components/TopRestaurantsCard.vue'
import { Toast } from "./../utils/helpers";

export default {
  components: {
    NavTabs,
    TopRestaurantsCard
  },
  data() {
    return {
      restaurants: [],
    };
  },
  methods: {
    async fetchRestaurants() {
      try {
        const { data } = await TopRestaurantsAPI.getTopRestaurants();
        this.restaurants = data.restaurants;
        console.log(this.restaurants);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得排名餐廳資料",
        });
      }
    },
    
  },
  created() {
    this.fetchRestaurants();
  },
};
</script>
