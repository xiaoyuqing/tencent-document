//引入mockjs文件
let Mock  = require('mockjs');
let Random = Mock.Random;
module.exports = function() {
  var data = { 
      headers: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W"," X", "Y", "Z", "AA", "AB"],
      files: []
  };
//动态生成10条新闻数据
  for (var i = 0; i < 200; i++) {
    data.files[i] = [];
    for (var j = 0; j< 20; j++) {
      data.files[i].push({
        "id": i,
        "name": Random.word(1,5)
      })
    }
    
  }

  return data
}