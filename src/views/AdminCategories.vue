<template>
  <div class="container py-5">
     <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            type="text"
            class="form-control"
            placeholder="新增餐廳類別..."
            v-model="newCategoryName"
          >
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="createNewCategory"
          >
            新增
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th
            scope="col"
            width="60"
          >
            #
          </th>
          <th scope="col">
            Category Name
          </th>
          <th
            scope="col"
            width="210"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
      v-for="category in categories"
      :key="category.id"
    >
     <th scope="row">
      {{ category.id }}
     </th>
        <td class="position-relative">
          <div
            v-show="!category.isEditing"
            class="category-name"
          >
            {{ category.name }}
          </div>
          <input
            v-show="category.isEditing"
            v-model="category.name"
            type="text"
            class="form-control"
          >
          <span
            v-show="category.isEditing"
            class="cancel"
            @click="handleCancel(category.id)"
          >
            ✕
          </span>
        </td>
        <td class="d-flex justify-content-between">
          <button
            v-show="!category.isEditing"
            type="button"
            class="btn btn-link mr-2"
            @click.stop.prevent="toggleIsEditing(category.id)"
          >
            Edit
          </button>
          <button
            v-show="category.isEditing"
            type="button"
            class="btn btn-link mr-2"
            @click.stop.prevent="updateCategory({ categoryId: category.id, name: category.name })"
          >
            Save
          </button>
          <button
            type="button"
            class="btn btn-link mr-2"
            @click.stop.prevent="deleteCategory(category.id)"
          >
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav'
// import {v4 as uuidv4} from 'uuid'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'


export default {
  components: {
    AdminNav
  },

  data () {
    return {
      newCategoryName:'',
      categories: []
    }
  },

  created () {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories () {
      try {
        const {data} = await adminAPI.categories.get()
        if (data.status ==='error') {
          throw new Error(data.message)
        }
        this.categories = data.categories.map( category => ({
        ...category,
        isEditing: false,
        nameCatched:''
      }))
      } catch (error) {
        Toast.fire({
          icon:'error',
          title:'無法載入類別清單，請稍後再試'
        })
      }
      
    },
    async createNewCategory() {
      // Todo: 透過API告知後端伺服器新增類別
      try{
        const {data} = await adminAPI.categories.create({name:this.newCategoryName})
        // 將新類別添加至陣列之中
        console.log(data)
 
      this.fetchCategories()
      this.newCategoryName=''

      } catch (error) {
        Toast.fire({
          icon:'error',
          title:'目前無法新增類別，請稍後再試'
        })
      }
      
    },
    async deleteCategory (categoryId) {
      // Todo: 透過API告知伺服器刪除餐廳類別
      try{
        const {data} = await adminAPI.categories.delete(categoryId)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
      } catch (error) {
        Toast.fire({
          icon:'error',
          title:'目前無法刪除，請稍後再試'
        })
      }
      
      // 將該餐廳類別從陣列移除
       this.categories = this.categories.filter(
        category => category.id !== categoryId
      )
    },
    async updateCategory( {categoryId, name}) {
      // Todo: 透過API把資料傳回伺服器
      try{
        this.toggleIsEditing(categoryId)
        console.log('name', name)
        const {data} = await adminAPI.categories.update({categoryId, name})
        if (data.status === 'error') {
          throw new Error(data.message)
        }
      } catch (error) {
        Toast.fire({
          icon:'error',
          title:'無法成功編輯，請稍後再試'
        })
      }
      

    },
    handleCancel (categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            // 把原本的餐廳類別名稱還回去
            name: category.nameCached
          }
        }
        return category
      })

      this.toggleIsEditing(categoryId)
    },
    toggleIsEditing (categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name
          }
        }

        return category
      })
    },
  }
}
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>