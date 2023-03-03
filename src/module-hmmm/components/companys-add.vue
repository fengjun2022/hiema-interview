<template>
  <div class="container">
    <el-dialog :title="changeTitle" :visible="isShowDialog" center @close="cancel">
      <el-form ref="companysForm" label-width="120px" :model="companysData" :rules="companysRules">
        <el-form-item label="企业简称" prop="shortName" style="width:80%">
          <el-input v-model="companysData.shortName" />
        </el-form-item>
        <el-form-item label="所属公司" prop="company" style="width:80%">
          <el-input v-model="companysData.company" />
        </el-form-item>
        <el-form-item style="width:70%">
          <span>https://www.tianyancha.com （在此可查询所属公司全称及简称）</span>
        </el-form-item>
        <el-form-item label="城市地区" style="width:80%" prop="province">
          <el-row type="flex" justify="space-between">
            <el-select v-model="companysData.province" style="width:48%" @change="handleChange">
              <el-option v-for="item in province" :key="item" :label="item" :value="item" />
            </el-select>
            <el-select v-model="companysData.city" style="width:48%">
              <el-option v-for="item in city" :key="item" :label="item" :value="item" />
            </el-select>
          </el-row>
        </el-form-item>
        <el-form-item label="方向(企业标签)" prop="tags" style="width:80%">
          <el-input v-model="companysData.tags" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks" style="width:80%">
          <el-input v-model="companysData.remarks" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add, update, detail } from '@/api/hmmm/companys.js'
import { provinces, citys } from '@/api/hmmm/citys.js'
export default {
  name: 'CompanysAdd',
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      province: [],
      city: [],
      companysData: {
        shortName: '',
        company: '',
        province: '',
        city: '',
        tags: '',
        remarks: '',
        isFamous: true
      },
      companysRules: {
        shortName: [{ required: true, message: '企业简称不能为空', trigger: 'blur' }],
        company: [{ required: true, message: '所属公司不能为空', trigger: 'blur' }],
        province: [{ required: true, message: '请选择省份', trigger: 'blur' }],
        tags: [{ required: true, message: '请输入标签', trigger: 'blur' }],
        remarks: [{ required: true, message: '备注不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    changeTitle() {
      return this.companysData.id ? '编辑用户' : '新增用户'
    }
  },
  created() {
    this.province = provinces()
  },
  methods: {
    async confirm() {
      try {
        await this.$refs.companysForm.validate()
        if (this.companysData.id) {
          await update({ ...this.companysData, isFamous: true })
        } else {
          await add(this.companysData)
        }
        this.$emit('update:isShowDialog', false)
        this.$emit('updateList')
        this.$notify({
          message: `${this.changeTitle}成功!`,
          duration: 1500,
          showClose: false
        })
      } catch (error) {
        console.log(error)
      }
    },
    cancel() {
      this.$emit('update:isShowDialog', false)
      this.companysData = {
        shortName: '',
        company: '',
        province: '',
        city: '',
        tags: '',
        remarks: '',
        isFamous: true
      }
      this.$refs.companysForm.resetFields()
    },
    handleChange(currentItem) {
      this.city = citys(currentItem)
      this.companysData.city = citys(currentItem)[0]
    },
    async editData(id) {
      const { data } = await detail(id)
      this.companysData = data
    }
  }
}
</script>

<style scoped lang='less'></style>
