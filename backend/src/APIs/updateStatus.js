const students = require('../models/Students');
const mongoose = require('mongoose');

const updateStudentStatus = async (req, res) => {
  const { status } = req.params;

  try {
    let studentsList;
    if (status === 'presentees') {
      studentsList = await students.find({ status: 'present' });
    } else if (status === 'absentees') {
      studentsList = await students.find({ status: 'absent' });
    } else {
      studentsList = await students.find({});
    }
    return res.status(200).json(studentsList);
  } catch (error) {
    console.error('Error occurred while fetching students', error.message);
    return res.status(500).json({ message: 'Error occurred while fetching students' });
  }
};

module.exports = updateStudentStatus;
