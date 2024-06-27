const students = require('../models/Students'); // Assuming you have defined the Student model in '../models/Students'

const updateStudent = async (req, res) => {
    // Use newData instead of data to directly use req.body as the update payload
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
          req.params.id,
          { rollNo, name, course, status },
          { new: true, runValidators: true }
        );
    
        if (!updatedStudent) {
          return res.status(404).json({ error: 'Student not found' });
        }
    
        res.json(updatedStudent);
      } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ error: 'Failed to update student' });
      }
    }
    

module.exports = updateStudent;
