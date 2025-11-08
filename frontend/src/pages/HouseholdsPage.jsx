import React, { useEffect, useState } from "react";
import { getHouseholds, createHousehold, deleteHousehold } from "../api/householdsApi";
import HouseholdForm from "../components/HouseholdForm";
import { Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, Container } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

const HouseholdsPage = () => {
  const navigate = useNavigate();
  const [households, setHouseholds] = useState([]);
  const [adding, setAdding] = useState(false);

  const handleBack = () => {
    navigate(isAdmin() ? '/dashboard/admin' : '/dashboard/staff');
  };

  const loadData = async () => {
    const res = await getHouseholds();
    setHouseholds(res.data);
  };

  const handleAdd = async (data) => {
    await createHousehold(data);
    setAdding(false);
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteHousehold(id);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 2 }}
      >
        Back to Dashboard
      </Button>
      <Typography variant="h4" sx={{ my: 2 }}>Household & Demographic Profiling</Typography>

      {adding ? (
        <HouseholdForm onSubmit={handleAdd} />
      ) : (
        <Button variant="contained" onClick={() => setAdding(true)}>Add Household</Button>
      )}

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Household No</TableCell>
            <TableCell>Head of Family</TableCell>
            <TableCell>Socio-Economic Class</TableCell>
            <TableCell>Senior</TableCell>
            <TableCell>PWDs</TableCell>
            <TableCell>Solo Parents</TableCell>
            <TableCell>Indigents</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {households.map((h) => (
            <TableRow key={h.id}>
              <TableCell>{h.household_no}</TableCell>
              <TableCell>{h.head_of_family}</TableCell>
              <TableCell>{h.socio_economic_classification}</TableCell>
              <TableCell>{h.senior_citizens}</TableCell>
              <TableCell>{h.pwds}</TableCell>
              <TableCell>{h.solo_parents}</TableCell>
              <TableCell>{h.indigents}</TableCell>
              <TableCell>
                {isAdmin() && (
                  <Button color="error" onClick={() => handleDelete(h.id)}>Delete</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default HouseholdsPage;
