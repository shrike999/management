<template>
  <div class="wrapper">
    <input id="keywordSearch" type="text" placeholder="输入关键字搜索" v-model="search">
    <div id="scroll-container" @scroll="handleScroll">
      <el-table
        ref="scroll"
        :data="loadedData"
        style="width: 1226px; margin-top: 20px;">
        <el-table-column
          label="姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="年龄"
          prop="age">
        </el-table-column>
        <el-table-column
          label="性别"
          prop="gender">
        </el-table-column>
        <el-table-column
          label="出生日期"
          prop="birthdate">
        </el-table-column>
        <el-table-column
          label="地址"
          prop="address">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改人员信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="键入名字" :label-width="formLabelWidth">
          <el-input v-model="edittingItemCopy.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>


export default {
  name: 'Users',
  data(){
    return{
      tableData: [],
      search: '',
      index: 15,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      edittingItem: {},
      edittingItemCopy: {},
      currentItemIndex: null,
    }
  },
  created(){
    this.$axios.get('http://localhost:3000/userList')
    .then((response)=>{
      this.tableData = response.data
    })
    .catch((error)=>{
      console.log('error', error)
    })
  },
  methods: {
    handleEdit(index, row) {
      this.currentItemIndex = index
      this.dialogFormVisible = true
      this.edittingItemCopy = JSON.parse(JSON.stringify(row))
    },
    confirmEdit(){
      this.loadedData[this.currentItemIndex] = this.edittingItemCopy
      this.dialogFormVisible = false
    },
    handleDelete(index, row) {
      console.log(row);
      this.loadedData.splice(index, 1);
    },
    handleScroll(){
        let scrollDom = document.querySelector('#scroll-container')
        let scrollTop = scrollDom.scrollTop
        let clientHeight = scrollDom.clientHeight
        let scrollHeight = scrollDom.scrollHeight
        console.log('scrollTop + clientHeight: ', scrollTop + clientHeight)
        console.log('scrollHeight: ', scrollHeight);
        if( scrollTop + clientHeight + 50 >= scrollHeight ){
            this.index += 10
        }
    }
  },
  computed: {
    loadedData(){
      return this.tableData.slice(0, this.index)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #wrapper {
    position: relative;
  }
  #scroll-container{
    height: 690px;
    overflow: auto;
  }
  #keywordSearch{
    border: 1px solid #999;
    border-radius: 3px;
    z-index: 1;
    position: absolute;
    top: 5px;
    left: 1000px;
    padding: 8px
  }
  #keywordSearch:focus{
    outline: 3px solid rgba(153, 211, 248, 0.5);
    border: 1px solid #3D3ABC;
  }

</style>
