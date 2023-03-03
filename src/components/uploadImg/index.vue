<template>
  <div>
  <el-upload
  action="#"
  list-type="picture-card"
:on-change="imgChange"
  :limit="limitCountImg"
  :class="{uoloadSty:showBtnDealImg,disUoloadSty:noneBtnImg}"
  :on-remove="handleDealImgRemove"
  :file-list="fileList"

  :auto-upload="false">
  <span style="">点击上传</span>
    <div slot="file" slot-scope="{file}" >
      <img

        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >

          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      showBtnDealImg: true,
      noneBtnImg: false,
      limitCountImg: 1, // 上传图片的最大数量,
      fileList: []

    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    handleRemove (file) {
      this.fileList.forEach((item, index) => {
        this.fileList.forEach((item, index) => {
          if (item.name === file.name) {
            this.fileList.splice(index, 1)
          }
        })
      })
      this.handleDealImgRemove()
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件改变后回调
    imgChange (file, fileList) {
      this.fileList = fileList
      console.log(fileList)
      this.$emit('flieurl', fileList[0].url)
      this.noneBtnImg = fileList.length >= this.limitCountImg
    },
    // 删除文件的回调
    handleDealImgRemove (file, fileList) {
      this.noneBtnImg = fileList?.length >= this.limitCountImg
    }
  }
}
</script>
<style scoped>
::v-deep  .uoloadSty .el-upload--picture-card{
                    width: 100px;
                    height: 40px;
                    vertical-align: middle;
                }
               ::v-deep .el-upload{
                    width: 100px;
                    height: 40px;
                    line-height: 40px;
                }
               ::v-deep .el-upload-list--picture-card .el-upload-list__item{
                    width: 100px;
                    height: 60px;
                    line-height: 100px;

                }
               ::v-deep .el-upload-list--picture-card .el-upload-list__item-thumbnail{
                    width: 100px;
                    height: 60px;
                    line-height: 60px;

                }
              ::v-deep  .avatar{
                    width: 100px;
                    height: 100px;
                }
              ::v-deep  .disUoloadSty .el-upload--picture-card{
  display:none;   /* 上传按钮隐藏 */
}
.input_bottom div{
margin-bottom: 20px;
}
::v-deep .el-upload-list__item-actions{
                    vertical-align: middle;

}
</style>
