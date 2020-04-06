<template>
  <div class="app-container">
    <div class="filter-container">
    </div>
  <el-table v-loading="loading"
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
      label="连续5天及以上涨幅领先大盘情况"
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
          相对大盘分析
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
  import { showK, gupiaoList, analysisList,showAnalysis2,del } from '@/api/table'

  export default {
    data() {
      return {
        loading: true,
        form: {
          account: '',
          method:'compare'
        },
        tableData: [],
        search: '',
        // minConf: 0.2,
        // minSupport: 0.2
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
        this.loading = true
        analysisList(this.form).then(response => {
          this.tableData = response.data
          this.loading = false
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
        this.loading = true
        let data = {}
        data.id = id
        data.method = method
        data.account = account
        data.gpname = gpname
        data.gpid = gpid
        data.createOrUpdate = "update"
        data.memo = "memowcp"
        showAnalysis2(data).then(()=>
          this.analysisList()
        )
      }
      // handleDelete(index, row) {
      //   console.log(index, row)
      // }
    }
  }
</script>
