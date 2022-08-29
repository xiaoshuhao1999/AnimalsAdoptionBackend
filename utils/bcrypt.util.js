const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);



const generateHash = (val)=>{
  const hash = bcrypt.hashSync(val, salt);
  return hash;
}
function compareHash(val, hash){
  const isOk = bcrypt.compareSync(val, hash);
  return isOk;
};

module.exports = {generateHash,compareHash}