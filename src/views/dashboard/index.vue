<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ name }}</div>
    <img src="gupiaozhang.jpg" width="100%">

    <el-table
      :data="tableData"
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
        align="center" label="操作">
        <template slot="header" slot-scope="scope">
          <el-select v-model="analysisCreateForm.method" placeholder="选择分析方法" class="filter-item" size="mini" >
            <el-option
              v-for="item in optionsSearch"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showK(scope.row.gpid, scope.row.gpid)">查看k线
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="analysisCreate(scope.row.gpid,scope.row.gpname)">加入分析
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { showK, gupiaoList, analysisList,analysisCreate } from '@/api/table'

  export default {
    name: 'Dashboard',
    created() {
      gupiaoList().then(response => {
        this.tableData = response.data
      })
    },
    data() {
      return {
        analysisCreateForm: {
          account: '',
          gpid: '',
          method: 'turnRelation',
          gpname: '',
          memo: '',
          analysis: '',
          imgaddr: ''
        },
        tableData: [],
        name: '欢迎您，世界上最伟大的股票分析师',
        optionsSearch: [{
          value: 'turnRelation',
          label: '换手率关联分析'
        },
          {
            value: 'compare',
            label: '相对大盘分析'
          }]
      }
    },
    methods:{
      showK(knum, kaddr) {
        console.log('ok')
        let data = {}
        data.knum = knum
        data.kaddr = kaddr
        showK(data)
      },
      analysisCreate(gpid,gpname) {
        this.analysisCreateForm.account = this.$cookies.get("accountKey")
        this.analysisCreateForm.gpid = gpid
        this.analysisCreateForm.gpname = gpname
        analysisCreate(this.analysisCreateForm)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
