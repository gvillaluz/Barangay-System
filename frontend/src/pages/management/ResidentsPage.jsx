import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Button,
  Box
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { getResidents, deleteResident } from '../../api/residentsApi'
import ResidentForm from '../../components/management/residents/forms/residentForm'
import { isAdmin } from '../../utils/auth'
import ResidentTable from '../../components/management/residents/ResidentsTable'
import { ErrorMessage } from '../../components/ui/ErrorMessage'

export default function ResidentsPage() {
  const navigate = useNavigate()
  const [residents, setResidents] = useState([])
  const [editing, setEditing] = useState(null)
  const [openForm, setOpenForm] = useState(false)
  const [error, setError] = useState('');

  const handleBack = () => {
    navigate(isAdmin() ? '/dashboard/admin' : '/dashboard/staff')
  }

  const loadResidents = async () => {
    try {
      const res = await getResidents()
      setResidents(res.data.residentsWithPhoto)
    } catch (err) {
      console.error('Error loading residents:', err)
    }
  }

  useEffect(() => {
    loadResidents()
  }, [])

  const onDelete = (id) => {
    setOpenDia
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resident?')) return
    
    try {
      await deleteResident(id);

      setResidents(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Container
      sx={{
        mt: 5
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ 
          mb: 2 
        }}
      >
        Back to Dashboard
      </Button>

      {error && <ErrorMessage message={error} />}
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h4" my={2}>
          Residents
        </Typography>

        <Box
          sx={{
            height: "inherit",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setEditing(null)
              setOpenForm(true)
            }}
          >
            Add Resident
          </Button>
        </Box>
      </Box>

      <ResidentTable 
        residents={residents} 
        setEditing={setEditing}
        handleDelete={handleDelete}
        setOpenForm={setOpenForm}
      />

      <ResidentForm
        open={openForm}
        resident={editing}
        onClose={() => {
          setOpenForm(false)
          loadResidents()
        }}
      />
    </Container>
  )
}
