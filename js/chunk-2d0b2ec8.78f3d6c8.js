(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b2ec8"],{"25d3":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t._self._c;return a("div",{staticClass:"container py-5"},[a("div",[a("h1",[t._v(t._s(t.restaurant.name))]),a("span",{staticClass:"badge badge-secondary mt-1 mb-3"},[t._v(" "+t._s(t.restaurant.categoryName)+" ")])]),a("hr"),a("ul",[a("li",[t._v("評論數："+t._s(t.restaurant.commentsLength))]),a("li",[t._v("瀏覽次數： "+t._s(t.restaurant.viewCounts))])]),a("button",{staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(a){return t.$router.back()}}},[t._v(" 回上一頁 ")])])},s=[],r=(e("d9e2"),e("2fa3")),c=e("c4c3"),i={data(){return{restaurant:{id:-1,name:"",categoryName:"",commentsLength:0,viewCounts:0},isLoading:!0}},watch:{},methods:{async fetchRestaurant(t){try{const{data:a}=await c["a"].getRestaurant({restaurantId:t}),{id:e,name:n,Category:s,Comments:r,viewCounts:i}=a.restaurant;if(this.restaurant={...this.restaurant,id:e,name:n,categoryName:s?s.name:"未分類",commentsLength:r.length,viewCounts:i},"error"===a.status)throw new Error(a.message)}catch(a){r["a"].fire({icon:"error",title:"無法取得餐廳資料，請稍後再試"})}}},created(){const{id:t}=this.$route.params;this.fetchRestaurant(t)}},o=i,u=e("2877"),d=Object(u["a"])(o,n,s,!1,null,null,null);a["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d0b2ec8.78f3d6c8.js.map