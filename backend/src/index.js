import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import residentsRoutes from './routes/residents.js'
import incidentsRoutes from "./routes/incidents.js";
import householdsRoutes from "./routes/households.js";
import documentsRoutes from "./routes/documents.js";
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';

dotenv.config()

const app = express() 
app.use(cors())
app.use(express.json())

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/incidents", incidentsRoutes);
app.use("/api/households", householdsRoutes);
app.use("/api/documents", documentsRoutes);
app.use('/api/residents', residentsRoutes);

// Root test
app.get('/', (req, res) => {
  res.send('Barangay Information System API is running ✅')
})

// Handle 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }))

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ message: 'Internal server error' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
