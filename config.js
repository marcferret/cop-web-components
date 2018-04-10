require('dotenv').config();

module.exports = {
  BUILD_SPECIFICS_NAME: process.env.BUILD_SPECIFICS_NAME || 'helloMNG',
  DEPLOY_PATH: process.env.DEPLOY_PATH || '',

  HELLO_MNG_URL: process.env.HELLO_MNG_URL || 'https://st.mngbcn.com',
};
