import express from 'express'
import { authenticate } from '../middlewares/authenticate.js'
import { createResident, deleteResident, getResidents, updateResident } from '../controllers/residentsController.js';
import { createUpload } from '../config/multer.js'

const router = express.Router()

const upload = createUpload('residents');

// ❌ REMOVE this line — you already serve /uploads globally in index.js
// router.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

router.get('/', authenticate, getResidents);
router.post('/', authenticate, upload.single('photo'), createResident);
router.put('/:id', authenticate, upload.single('photo'), updateResident);
router.delete('/:id', authenticate, deleteResident);

// // ✅ Get single resident
// router.get('/:id', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM residents WHERE id = ?', [req.params.id])
//     if (rows.length === 0) return res.status(404).json({ message: 'Resident not found' })

//     const resident = rows[0]
//     if (resident.photo) {
//       resident.photo = `${req.protocol}://${req.get('host')}${resident.photo}`
//     }

//     res.json(resident)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

// // ✅ Create new resident with optional photo
// router.post('/', upload.single('photo'), async (req, res) => {
//   try {
//     const {
//       first_name,
//       middle_name,
//       last_name,
//       dob,
//       gender,
//       civil_status,
//       place_of_birth,
//       address,
//       household_no,
//       phone,
//       email
//     } = req.body

//     // ✅ Save path to /uploads/residents/<filename>
//     const photo = req.file ? `/uploads/residents/${req.file.filename}` : null

//     const [result] = await pool.query(
//       `INSERT INTO residents 
//         (first_name, middle_name, last_name, dob, gender, civil_status, place_of_birth, address, household_no, phone, email, photo)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [first_name, middle_name, last_name, dob, gender, civil_status, place_of_birth, address, household_no, phone, email, photo]
//     )

//     const fullPhotoUrl = photo ? `${req.protocol}://${req.get('host')}${photo}` : null

//     res.status(201).json({ id: result.insertId, message: 'Resident added successfully', photo: fullPhotoUrl })
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

// // ✅ Update resident with optional new photo
// router.put('/:id', upload.single('photo'), async (req, res) => {
//   try {
//     const {
//       first_name,
//       middle_name,
//       last_name,
//       dob,
//       gender,
//       civil_status,
//       place_of_birth,
//       address,
//       household_no,
//       phone,
//       email
//     } = req.body

//     // ✅ Correct photo path
//     const photo = req.file ? `/uploads/residents/${req.file.filename}` : null

//     let query = `
//       UPDATE residents 
//       SET first_name=?, middle_name=?, last_name=?, dob=?, gender=?, civil_status=?, place_of_birth=?, address=?, household_no=?, phone=?, email=?`
//     const params = [first_name, middle_name, last_name, dob, gender, civil_status, place_of_birth, address, household_no, phone, email]

//     if (photo) {
//       query += `, photo=?`
//       params.push(photo)
//     }

//     query += ` WHERE id=?`
//     params.push(req.params.id)

//     await pool.query(query, params)
//     res.json({ message: 'Resident updated successfully' })
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

export default router
