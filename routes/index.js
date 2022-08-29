const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});



// I honestly copy and pasted this from the classwork. I don't think it counts as plagiarism just because it's all the same exact code/functions/variables as far as I can tell, but I'm just putting this here in case I'm wrong. If I am I will change it.

module.exports = router;