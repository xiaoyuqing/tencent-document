<template>
  <Document :tableData="mockData"></Document>
</template>
<script>
import Document from '@/components/Document'
import mockData from '@/mock/mock.js'
export default {
  data() {
    return {
      mockData: mockData(),
    }
  },
  components:{
    Document
  }
}
</script>
<style>

</style>

