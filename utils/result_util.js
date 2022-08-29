function callResult(data,msg,code) { 
  if(!data) data = {};
  if(!msg) msg = 'ok';
  if(!code) code = 200;
  return {
    data:data,
    msg,
    code,
  }
}

module.exports ={callResult}