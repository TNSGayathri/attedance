const students = require('../models/Students');

const getstudentbyroll = async (req, res) => {
    const { rollNo } = req.params; // Extract rollNo from params
    try {
        console.log(rollNo);
        const ans = await students.findOne({ rollNo: rollNo }); // Use findOne and query by rollNo
        if (!ans) {
            return res.status(404).send({ msg: 'Student not found' });
        }
        console.log(ans);
        res.status(200).send(ans);
    } catch (err) {
        res.status(400).send({ msg: err.message });
    }
};

module.exports = getstudentbyroll;
