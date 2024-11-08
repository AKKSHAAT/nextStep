import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js'; // Path to the Student model
import { verifyToken } from '../middleware/auth.js'; 

const router = express.Router();

// Register route (without bcrypt)
router.post('/register', async (req, res) => {
  const { email, password, jobRole, profilePicture } = req.body;

  try {
    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Create new student (store password as plain text, not recommended for real applications)
    const student = new Student({
      email,
      password, // Store password in plaintext (not secure)
      jobRole,
      profilePicture,
    });

    // Save the student to the database
    await student.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Error registering student' });
  }
});

// Login route (without bcrypt)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Compare passwords (no bcrypt for comparison)
    if (student.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiry time
    });

    res.status(200).json({ token , id: student._id, email: student.email});
  } catch (error) {
    console.error('Error logging in student:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// CRUD: Get all students (for example)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// CRUD: Get a single student
router.get('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  console.log(studentId);
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      console.log("Student not found");
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Error fetching student' });
  }
});

// CRUD: Update student details
router.put('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const { jobRole, profilePicture } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { jobRole, profilePicture },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Error updating student' });
  }
});

// CRUD: Delete a student
router.delete('/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Error deleting student' });
  }
});

export default router;
