const express = require('express')
const router = express.Router()

module.exports = router


router.get('/bank', async (req,res) => {

    res.send('bank');

});

