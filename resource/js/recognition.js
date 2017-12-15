
const watson = require('watson-developer-cloud')

const visual_recognition = watson.visual_recognition({
  api_key: '4c2de96e43654826b0383d00229de2e9d5e9d38c',
  version: 'v3',
  version_date: '2016-05-20'
});

module.exports= visual_recognition