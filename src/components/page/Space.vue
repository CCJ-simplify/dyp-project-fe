<template>
  <div class="container">
  	<div class="header">
      <div class="input">
        <el-input
          placeholder="请输入关键字"
          prefix-icon="el-icon-search"
          :style="{'width':'200px'}"
          v-model="input"
          @clear="loadData()"
          @blur="loadData()"
          clearable>
        </el-input>
          <el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :value-format="'yyyy-MM-dd'"
            @change="loadData()"
            @blur="loadData()"
            @clear="loadData()">
          </el-date-picker>
          <el-select 
            v-model="status" 
            clearable 
            :style="{'margin-left': '20px'}"
            @change="loadData()"
            placeholder="请选择">
              <el-option
                :key="'ACTIVE'"
                :label="'正常'"
                :value="'ACTIVE'">
              </el-option>
              <el-option
                :key="'NOT_ACTIVE'"
                :label="'禁用'"
                :value="'NOT_ACTIVE'">
              </el-option>
            </el-select>
      </div>
  		<div class="table-header">
        <el-button type="primary" plain @click="add()"><i class="el-icon-plus"></i>添加场地</el-button>
        <el-button type="danger" @click="delAll()" plain><i class="el-icon-delete"></i>批删除场地</el-button>
      </div>
  	</div>
		<el-table
		  ref="multipleTable"
		  :data="tableData"
			v-loading="loading"
		  tooltip-effect="dark"
      border
		  style="width: 100%; background-color: #FFFFFF;"
			highlight-current-row
		  @selection-change="handleSelectionChange">
		  <el-table-column
		    type="selection">
		  </el-table-column>
			<el-table-column
				prop="name"
        align="center"
        show-overflow-tooltip
			  label="名字">
			</el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="位置">
        <template slot-scope="scope">
          <i class="el-icon-location"></i>
          <span style="margin-left: 10px">{{scope.row.address}}</span>
        </template>
      </el-table-column>
		  <el-table-column
        align="center"
		    label="容量(人数)">
        <template slot-scope="scope">
          <el-tag
            type="success"
            effect="plain"
            disable-transitions>
            <span>{{scope.row.total}}人</span>
          </el-tag>
        </template>
		  </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status == 'ACTIVE'  ? 'success' : 'danger'"
              disable-transitions>
              <span v-if="scope.row.status == 'ACTIVE'">正常</span>
              <span v-if="scope.row.status == 'NOT_ACTIVE'">禁用</span>
            </el-tag>
          </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        show-overflow-tooltip>
				<template slot-scope="scope">
				  <i class="el-icon-time"></i>
				  <span style="margin-left: 10px">{{scope.row.updateTime}}</span>
				</template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        highlight-current-row
				width="185"
        show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip 
              class="item" 
              effect="dark" 
              content="编辑"  
              placement="right">
              <el-button 
                type="primary" 
                size="mini"
                icon="el-icon-edit"
                @click="edit(scope.row)"/>
            </el-tooltip>
            <el-tooltip
              class="item" 
              effect="dark" 
              content="场地信息"
              placement="right">
              <el-button 
                type="success" 
                icon="el-icon-more"
                size="mini"
                @click="info(scope.row)"/>
            </el-tooltip>
            <el-tooltip 
              class="item" 
              effect="dark" 
              content="删除"
              placement="right">
              <el-button 
                type="danger" 
                icon="el-icon-delete"
                size="mini"
                @click="del(scope.row)"/>
            </el-tooltip>
          </template>
      </el-table-column>
		</el-table>
		<div class="block" style="text-align: right;">
		  <el-pagination
		    @size-change="handleSizeChange"
		    @current-change="handleCurrentChange"
		    :current-page="currentPage"
		    :page-sizes="[10, 20, 50, 100]"
		    :page-size="tablePageSize"
		    layout="total, sizes, prev, pager, next, jumper"
		    :total="tablePageTotal">
		  </el-pagination>
		</div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="userInfo" status-icon ref="ruleForm" label-width="100px">
        <el-form-item label="位置" >
          <el-input 
            v-model="userInfo.address" 
            autocomplete="off" 
            placeholder="请输入场地位置"
            maxlength="20"
            show-word-limit/>
        </el-form-item>
				<el-form-item label="场地名称" >
				  <el-input 
				    v-model="userInfo.name" 
				    autocomplete="off" 
				    placeholder="请输入场地名称"
				    maxlength="20"
				    show-word-limit
				    :disabled="userInfo.update"/>
				</el-form-item>
        <el-form-item label="状态">
            <el-switch v-model="tmpStatus"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qx">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
		<el-dialog :title="`场地信息,场地位置:${size}`" :visible.sync="infoDialog" width="800px">
			<div class="line fe">屏幕</div>
			<div v-for="(item, index) in spaceList" 
				:key="index" 
				:index="index" style="text-align: center;">
				<div v-for="(i, iIndex) in item" :index="iIndex"
					:key="iIndex" 
					:class="{
					'infoItem': true,
					'color': i
					}"/>
				<div class="infoItem infoAdd-item" @click="infoAdd(index)"><i class="el-icon-plus tag"/></div>
				<div class="infoItem infoAdd-item" @click="infoDel(index)"><i class="el-icon-minus tag"/></div>
				<span class="size">{{item.length}}位</span>
			</div>
			<div @click="infoAddLine" class="line">添加一排</div>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="qxInfo">取 消</el-button>
		    <el-button type="primary" @click="infoSubmit">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        tableData: [],
				tablePageSize: 10,
        currentPage: 1,
				tablePageTotal: 0,
				input: '',
				loading: false,
				ids: [],
				date: [],
        multipleSelection: [],
        page : 1,
				id: 0,
        dialogFormVisible: false,
        showPassword: true,
				infoDialog: false,
				spaceList: [[]],
        userInfo: {
          name : '',
          userName: '',
          password: '',
          password2: '',
          update: false,
        },
				tmpStatus: 0,
				size: 0,
        status: ''
      }
    },

    methods: {
      loadData(startTime = '', endTime = '') {
				this.loading = true
				if(this.date) {
				  startTime = this.date[0] ? this.date[0] + ' 00:00:00' : ''
				  endTime = this.date[1] ? this.date[1] + ' 23:59:59' : ''
				}
        this.$GET(this.$API.ADMIN.AdminQuerySpace, {
						page : this.page,
						size : this.tablePageSize,
						name : this.input,
						startTime : startTime,
						endTime : endTime,
						status : this.status
					})
        .then(res => {
          this.tablePageTotal = res.data.total
          this.tableData = res.data.details
					this.loading = false
        })
				.catch(res => {
					this.loading = false
				})
      },
      filterTag(key, row) {
        return row.status == key
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          });
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.ids = val.map(e => e.id)
      },
			handleSizeChange(val) {
				this.tablePageSize = val
			  this.loadData()
			},
			handleCurrentChange(val) {
				this.page = val
        this.loadData()
      },
      edit(data){
        this.title = '修改场地信息'
        this.dialogFormVisible = true
        this.userInfo = data
				this.tmpStatus = data.status == 'ACTIVE' 
				this.userInfo.update = true
				console.log(this.userInfo)
      },
			info(row){
				this.id = row.id
				this.size = 0
				if(row.info){
					this.spaceList = JSON.parse(row.info)
					this.spaceList.forEach(e => this.size += e.length)
				}else {
					this.spaceList = [[]]
				}
				this.infoDialog = true
			},
			qx() {
				this.dialogFormVisible = false
				this.loadData()
			},
			qxInfo(){
				this.infoDialog = false
			},
			itemClick(l, r, elem){
				this.spaceList[l][r] = 1
				this.$forceUpdate()
			},
			submit() {
				this.userInfo.status = this.tmpStatus ? 'ACTIVE' : 'NOT_ACTIVE'
				this.$POST(this.$API.ADMIN.AdminInsertUpdateSpace, this.userInfo)
				.then(res => {
					if(this.update){
						this.$message.success('更新成功')
					}else {
						this.$message.success('添加成功')
					}
					this.loadData()
				})
				this.dialogFormVisible = false
			},
			delAll(){
				this.ids.forEach(e=> {
					this.$POST(this.$API.ADMIN.AdminDelSpace+`/${e}`)
				})
				this.$message.success('批量删除成功')
			},
      add(){
				this.userInfo = {}
        this.title = '添加场地'
        this.dialogFormVisible = true
				this.userInfo.update = false
      },
			infoAddLine(){
				this.spaceList.push([])
			},
			infoAdd(item){
				this.spaceList[item].push(0)
				this.size++
			},
			infoDel(item){
				if(this.spaceList[item].length > 0){
					this.spaceList[item].pop()
					this.size--
				}else {
					this.spaceList.pop()
				}
			},
      del(data) {
        this.userInfo = data
				this.$POST(this.$API.ADMIN.AdminDelSpace+`/${data.id}`).then(res => {
					this.$message.success('删除成功')
				})
				this.loadData()
      },
			infoSubmit(){
				this.$POST(this.$API.ADMIN.AdminInsertUpdateSpace, {
					id: this.id,
					total: this.size,
					info: JSON.stringify(this.spaceList)
				})
				.then(res => {
					this.$message.success('修改成功')
					this.loadData()
					this.infoDialog = false
				})
			},
      play(data){
        
      }
    },
    created(){
      this.loadData()
    }
  }
</script>

<style scoped>
  .el-select .el-input {
    width: 6.25rem;
  }
	.tag{
		line-height: 2.1875rem;
	}
	.line{
		clear: left;
		cursor: pointer;
		text-align: center;
		border-radius: 0.25rem;
		margin: 0 auto;
		width: 80%;
		background-color: #409EFF;
		color: #FFFFFF;
	}
  .input {
    display: inline-block;
    text-align: left;
    float: left;
  }
  .block {
    padding: 0rem;
  }
  .el-date-editor {
    margin-left: 3.125rem;
  }
  .header {
    background-color: #FFFFFF;
    padding: 0.9375rem 0.625rem;
  }
  .table-header {
    text-align: right;
  }
  .block {
    background-color: #FFFFFF;
    padding: 0.9375rem 0rem;
  }
	.infoItem {
		width: 2.1875rem;
		height: 2.1875rem;
		cursor: pointer;
		margin-left: 0.1875rem;
		border: 0.0625rem solid #999999;
		display: inline-block;
		text-align: center;
		margin-top: 0.3125rem;
	}
	.color{
		background-color: red;
	}
	.infoAdd-item{
		position: relative;
		bottom: 0.875rem;
	}
	.size{
		position: relative;
		color: #F02D2D;
		margin-left: 1.25rem;
		bottom: 0.4375rem;
	}
	.fe{
		background-color: #FFFFFF;
		height: 5rem;
		border: 0.0625rem solid #999999;
		cursor: default;
		color: #000000;
		line-height: 5rem;
		margin-bottom: 1.25rem;
	}
</style>
