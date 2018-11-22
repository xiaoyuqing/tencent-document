<template>
	<div class="document rolling-table">
		<div class="top-left"></div>
		<div class="table-head" :style="{position: 'absolute', overflow: 'hidden'}">
			<table id="top-table" ref="tFixedHead">
				<tr class="header"><th></th><th v-for="(item, index) in headers" :key="index">{{item}}</th></tr>
			</table>
		</div>
		<div class="table-left" :style="{height: scrollHeight + 'px'}">
			<table id="left-table" ref="tFixedLeft">
				<tr v-for="(item, index) in files" :key="index"><td>{{index+1}}</td></tr>
			</table>
		</div>
		<div class="scroll-table" ref="cScroll" :style="{height: scrollHeight + 'px'}">			
			<div class="table-body" :style="{height: scrollHeight -43 + 'px'}">
				<table id="roll-table" ref="scrollBody">
					<tr v-for="(tr, index) in files" :key="index">
						<td v-for="(item,index) in tr" :key="index">{{item.name}}</td>
					</tr>
				</table>
			<div v-if="this.isUpload">正在加载中...</div>
			</div>
		</div>		
	</div>
</template>
<script>
const iScoll = require("iscroll/build/iscroll-probe");
export default {
  props: {
    tableData: Object,
    pageSize: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      headers: [],
      files: [],
      showLeft: false,
      showTop: false,
      scrollHeight: window.innerHeight,
      pageNum: 1,
      isUpload: true
    };
  },
  mounted() {
    this.headers = this.tableData.headers;
    let total = this.tableData.files.length;
    this.totalPage = Math.ceil(total / this.pageSize);
    this.files = this.tableData.files.slice(0, 100);
    this.iscrollTable = new iScoll(".table-body", {
      preventDefault: true, // 阻止浏览器滑动默认行为
      probeType: 3, //需要使用 iscroll-probe.js 才能生效 probeType ： 1 滚动不繁忙的时候触发 probeType ： 2 滚动时每隔一定时间触发 probeType ： 3   每滚动一像素触发一次
      mouseWheel: true, //是否监听鼠标滚轮事件。
      scrollX: true, // 启动x轴滑动
      scrollY: true, // 启动y轴滑动
      freeScroll: false,
      scrollbars: true
    });
    this.iscrollTable.on("scroll", this.scrollTable);
    this.iscrollTable.on("beforeScrollStart", this.scrollStart);
    this.iscrollTable.on('scrollEnd', this.scrollEnd);
  },
  methods: {
    scrollTable() {
      let iscrollTable = this.iscrollTable;
      if (iscrollTable.x > 0) {
        iscrollTable.scrollTo(0, iscrollTable.y);
        this.$refs.tFixedHead.style.transform = "translateX(0px)";
        return;
      }
      if (iscrollTable.y > 0) {
        iscrollTable.scrollTo(iscrollTable.x, 0);
        this.$refs.tFixedLeft.style.transform = "translateY(0px)";
        return;
      }
      if ((iscrollTable.y - iscrollTable.maxScrollY) > 600) {
        this.isUpload = true;
      }
      if (iscrollTable.y - iscrollTable.maxScrollY < 1200 && this.isUpload) {
        this.pageNum++;
        if (this.pageNum < this.totalPage || this.pageNum === this.totalPage) {
          this.files = this.tableData.files.slice(0, this.pageSize * this.pageNum);
          this.isUpload = false;
          setTimeout(() => iscrollTable.refresh(), 0);
        }
      }
      this.$refs.tFixedLeft.style.transform = "translateY(" + iscrollTable.y + "px)";
      this.$refs.tFixedHead.style.transform = "translate(" + iscrollTable.x + "px, 0px)";
    },
    scrollStart() {
      this.startx = this.iscrollTable.x;
      this.starty = this.iscrollTable.y;
      this.iscrollTable.refresh();
    },
    scrollEnd() {
      let iscrollTable = this.iscrollTable;
      if (Math.abs(iscrollTable.maxScrollY) - Math.abs(iscrollTable.y) < 20) {
        this.pageNum++;
        if (this.pageNum < this.totalPage || this.pageNum === this.totalPage) {
          this.files = this.tableData.files.slice(
            0,
            this.pageSize * this.pageNum
          );
          setTimeout(() => iscrollTable.refresh(), 0);
        }
      }
    },
  }
};
</script>
<style lang="less" scoped>
.document {
  width: 100%;
  position: relative;
  overflow: hidden;
  .table-head {
    position: absolute;
    overflow: hidden;
    z-index: 99;
  }
  .scroll-table {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .table-body {
      overflow: hidden;
      position: relative;
      margin: 43px 0 0 53px;
    }
  }
  .top-left {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 52px;
    height: 42px;
    z-index: 100;
    background-color: #eee;
    border: 1px solid #ddd;
  }
  table {
    tr.header {
    }
    th {
      min-width: 100px;
      height: 40px;
      background-color: #eee;
      border: 1px solid #ddd;
      text-align: center;
      color: #888;
    }
    th:first-child {
      min-width: 50px;
    }
    tr td {
      min-width: 100px;
      border: 1px solid #eee;
      height: 50px;
    }
  }
  .table-left {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 99;
    padding-top: 43px;
    table#left-table {
      tr td:first-child {
        min-width: 50px;
        background-color: #eee;
        border: 1px solid #ddd;
        color: #888;
        text-align: center;
      }
    }
  }
  .table-header {
    position: absolute;
    overflow: hidden;
  }
}
</style>