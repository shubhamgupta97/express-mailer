const express = require('express');
const router = express.Router();
const sendMail = require('../src/send-mail');

const validator = require('../src/utilities/validator')

// router.use(validator);
router.post("/sendemail", async (req, res, next) => {
    try {
        const type = req.body.type;
        const result = await sendMail(req.body, type);
        res.status(200).json({status: true, payload: result});
    } catch (err) {
        res.status(500).json({status: false, error: err.message});
    }
});

module.exports = router;