<template>
  <el-table
    :data="tableData.filter(data => !search || data.gpname.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="股票代码"
      prop="id">
    </el-table-column>
    <el-table-column
      label="股票名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="涨跌幅"
      prop="add"
      sortable
    >
    </el-table-column>
    <el-table-column
      label="换手率"
      prop="change"
      sortable>
    </el-table-column>
    <el-table-column
      label="总市值"
      prop="count"
      sortable
    >
    </el-table-column>
<!--    <el-table-column-->
<!--      align="right">-->
<!--      <template slot="header" slot-scope="scope">-->
<!--        <el-input-->
<!--          v-model="search"-->
<!--          size="mini"-->
<!--          placeholder="输入关键字搜索"/>-->
<!--      </template>-->

<!--    </el-table-column>-->
  </el-table>
</template>

<script>
  import {junzhiList } from '@/api/table'
  export default {
    data() {
      return {
        account: { account: 'wcp' },
        tableData: [],
        search: ''
      }
    },
    created() {
      junzhiList(this.account).then(response => {
        this.tableData = response.data
      })
    },
    methods: {}
  }
</script>
