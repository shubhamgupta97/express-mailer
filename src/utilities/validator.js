module.exports = async (req, res, next) => {
    const {to, subject} = req.body;
    const errors = []
    
    if(!to || to == '') {
        errors.push('to field is missing');
    }

    if(!subject || subject == '') {
        errors.push('subject field is missing');
    }

    if(errors.length == 0) {
        next();
    } else {
        res.status(400).json({
            status: "fail",
            error: errors
        });
    }
};