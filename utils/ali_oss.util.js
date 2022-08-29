const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: 'LTAI5tAVp8TPB2617BsLVYZm',
  accessKeySecret: 'iIKi76oOHb8tdFhckqDmoW3eIi4W4e',
});

const ali_oss = {
    bucket: 'animals-oss',
    endPoint: 'oss-cn-shanghai.aliyuncs.com',
}


module.exports = { client, ali_oss}