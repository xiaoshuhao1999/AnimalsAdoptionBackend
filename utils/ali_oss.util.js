const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: 'L******************m',
  accessKeySecret: 'i******************e',
});

const ali_oss = {
    bucket: 'animals-oss',
    endPoint: 'oss-cn-shanghai.aliyuncs.com',
}


module.exports = { client, ali_oss}
