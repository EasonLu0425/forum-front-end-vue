(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-84cc821a"],{"12b2":function(t,e,a){"use strict";var r=function(){var t=this,e=t._self._c;return e("form",{directives:[{name:"show",rawName:"v-show",value:!0!==t.isLoading,expression:"isLoading !== true"}],on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit.apply(null,arguments)}}},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"name"}},[t._v("Name")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.name,expression:"restaurant.name"}],staticClass:"form-control",attrs:{id:"name",type:"text",name:"name",placeholder:"Enter name",required:""},domProps:{value:t.restaurant.name},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"name",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"categoryId"}},[t._v("Category")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.categoryId,expression:"restaurant.categoryId"}],staticClass:"form-control",attrs:{id:"categoryId",name:"categoryId",required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.restaurant,"categoryId",e.target.multiple?a:a[0])}}},[e("option",{attrs:{value:"",selected:"",disabled:""}},[t._v(" --請選擇-- ")]),t._l(t.categories,(function(a){return e("option",{key:a.id,domProps:{value:a.id}},[t._v(" "+t._s(a.name)+" ")])}))],2)]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"tel"}},[t._v("Tel")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.tel,expression:"restaurant.tel"}],staticClass:"form-control",attrs:{id:"tel",type:"text",name:"tel",placeholder:"Enter telephone number"},domProps:{value:t.restaurant.tel},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"tel",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"address"}},[t._v("Address")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.address,expression:"restaurant.address"}],staticClass:"form-control",attrs:{id:"address",type:"text",placeholder:"Enter address",name:"address"},domProps:{value:t.restaurant.address},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"address",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"opening-hours"}},[t._v("Opening Hours")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.openingHours,expression:"restaurant.openingHours"}],staticClass:"form-control",attrs:{id:"opening-hours",type:"time",name:"opening_hours"},domProps:{value:t.restaurant.openingHours},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"openingHours",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"description"}},[t._v("Description")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.description,expression:"restaurant.description"}],staticClass:"form-control",attrs:{id:"description",rows:"3",name:"description"},domProps:{value:t.restaurant.description},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"description",e.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"image"}},[t._v("Image")]),t.restaurant.image?e("img",{staticClass:"d-block img-thumbnail mb-3",attrs:{src:t.restaurant.image,width:"200",height:"200"}}):t._e(),e("input",{staticClass:"form-control-file",attrs:{id:"image",type:"file",name:"image",accept:"image/*"},on:{change:t.handleFileChange}})]),e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v(" "+t._s(t.isProcessing?"處理中...":"送出")+" ")])])},s=[],n=(a("d9e2"),a("5494"),a("be6c")),i=a("2fa3"),o={props:{initialRestaurant:{type:Object,default:()=>({name:"",categoryId:"",tel:"",address:"",description:"",image:"",openingHours:""})},isProcessing:{type:Boolean,default:!1}},data(){return{restaurant:{name:"",categoryId:"",tel:"",address:"",description:"",image:"",openingHours:""},categories:[],isLoading:!0}},created(){this.fetchCategories(),this.restaurant={...this.restaurant,...this.initialRestaurant}},watch:{initialRestaurant(t){this.restaurant={...this.restaurant,...t}}},methods:{async fetchCategories(){try{const{data:t}=await n["a"].categories.get();if("error"===t.status)throw new Error(t.message);this.categories=t.categories,this.isLoading=!1}catch(t){this.isLoading=!1,i["a"].fire({icon:"error",title:"無法取得餐廳類別，請稍後再試"})}},handleFileChange(t){const e=t.target.files;if(0===e.length)this.restaurant.image="";else{const t=window.URL.createObjectURL(e[0]);this.restaurant.image=t}},handleSubmit(t){if(!this.restaurant.name)return void i["a"].fire({icon:"warning",title:"請填寫餐廳名稱"});if(!this.restaurant.categoryId)return void i["a"].fire({icon:"warning",title:"請選擇餐廳類別"});const e=t.target,a=new FormData(e);this.$emit("after-submit",a)}}},u=o,l=a("2877"),d=Object(l["a"])(u,r,s,!1,null,null,null);e["a"]=d.exports},2743:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container py-5"},[e("AdminRestaurantForm",{attrs:{"is-processing":t.isProcessing},on:{"after-submit":t.handleAfterSubmit}})],1)},s=[],n=(a("d9e2"),a("14d9"),a("12b2")),i=a("be6c"),o=a("2fa3"),u={components:{AdminRestaurantForm:n["a"]},data(){return{isProcessing:!1}},methods:{async handleAfterSubmit(t){try{this.isProcessing=!0;const{data:e}=await i["a"].restaurants.create({formData:t});if("error"===e.status)throw new Error(e.message);this.$router.push({name:"admin-restaurants"})}catch(e){this.isProcessing=!1,o["a"].fire({icon:"error",title:"無法建立餐廳，請稍後再試"})}}}},l=u,d=a("2877"),c=Object(d["a"])(l,r,s,!1,null,null,null);e["default"]=c.exports},be6c:function(t,e,a){"use strict";var r=a("2fa3");e["a"]={categories:{get(){return r["b"].get("/admin/categories")},create(t){return r["b"].post("/admin/categories",t)},delete(t){return r["b"].delete("/admin/categories/"+t)},update({categoryId:t,name:e}){return r["b"].put("/admin/categories/"+t,{name:e})}},restaurants:{create({formData:t}){return r["b"].post("/admin/restaurants",t)},get(t){return r["b"].get("/admin/restaurants/"+t)},delete(t){return r["b"].delete("/admin/restaurants/"+t)},getDetail(t){return r["b"].get("/admin/restaurants/"+t)},update({restaurantId:t,formData:e}){return r["b"].put("/admin/restaurants/"+t,e)}},users:{get(){return r["b"].get("/admin/users")},toggleRole({userId:t,isAdmin:e}){return r["b"].put("/admin/users/"+t,{isAdmin:e})}}}}}]);
//# sourceMappingURL=chunk-84cc821a.01215a2b.js.map