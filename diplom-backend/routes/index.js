const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/', require('./authorization'))
router.use('/bag', require('./bag'))
router.use('/settings', require('./settings'))
router.use('/products', require('./products'))


module.exports = router