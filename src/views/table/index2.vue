<template>
  <div class="app-container">
    <div class="filter-container">
    <el-input class="filter-item"
      v-model="minConf"
      size="mini"
      placeholder="输入可信度"/>
      <el-input class="filter-item"
                v-model="minSupport"
                size="mini"
                placeholder="输入支持度"/>
    </div>
  <el-table
    :data="tableData.filter(data => !search || data.gpid.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="股票代码"
      prop="gpid">
    </el-table-column>
    <el-table-column
      label="股票名称"
      prop="gpname">
    </el-table-column>
    <el-table-column
      label="涨==>换手高、成交次数高,相关系数："
      prop="analysis">
    </el-table-column>
<!--    <el-table-column-->
<!--      label="自定义备注"-->
<!--      prop="memo">-->
<!--    </el-table-column>-->
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入股票代码搜索"/>
      </template>

      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="showK(scope.row.gpid, scope.row.gpid)">K线
        </el-button>
        <el-button
          size="mini"
          type="warning"
          @click="showAnalysis(scope.row.id, scope.row.method,scope.row.account,scope.row.gpname,scope.row.gpid)">
          换手率分析
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="del(scope.row.id)">删除
        </el-button>
        <!--        <el-button-->
        <!--          size="mini"-->
        <!--          type="danger"-->
        <!--          @click="showAnalysis(scope.$index, scope.row)">换手率分析-->
        <!--        </el-button>        -->
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  import { showK, gupiaoList, analysisList,showAnalysis,del } from '@/api/table'

  export default {
    data() {
      return {
        form: {
          account: '',
          method:'trueRelation'
        },
        tableData: [],
        search: '',
        minConf: 0.2,
        minSupport: 0.2
      }
    },
    created() {
      // gupiaoList().then(response => {
      //   this.items = response.data
      // })
      this.form.account=this.$cookies.get("accountKey")
      this.analysisList()
    },
    methods: {
      analysisList(){
        analysisList(this.form).then(response => {
          this.tableData = response.data
        })
      },
      //删除分析
      del(id){
        del(id).then(()=>
          this.analysisList()
        )
      },
      showK(knum, kaddr) {
        let data = {}
        data.knum = knum
        data.kaddr = kaddr
        showK(data)
      },
      showAnalysis(id, method, account, gpname, gpid) {
        let data = {}
        data.id = id
        data.method = method
        data.account = account
        data.gpname = gpname
        data.gpid = gpid
        data.createOrUpdate = "update"
        data.minConf = this.minConf
        data.minSupport = this.minSupport
        data.memo = "memowcp"
        showAnalysis(data).then(()=>
          this.analysisList()
        )
      }
      // handleDelete(index, row) {
      //   console.log(index, row)
      // }
    }
  }
</script>
