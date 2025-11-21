import React, { useEffect, useState } from "react";
import { getHouseholds, createHousehold, deleteHousehold } from "../../api/householdsApi";
import { Button, Typography, Container, Box } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils/auth";
import HouseholdTable from "../../components/management/households/HouseholdsTable";
import HouseholdFormDialog from "../../components/management/households/householdFormDialog";
import { verifyToken } from "../../utils/auth";
import { HouseholdProvider } from "../../components/management/households/HouseholdFormContext";

const HouseholdsPage = () => {
  const navigate = useNavigate();
  const [households, setHouseholds] = useState([]);
  const [adding, setAdding] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const handleBack = () => {
    navigate(isAdmin() ? '/dashboard/admin' : '/dashboard/staff');
  };

  const loadData = async () => {
    const res = await getHouseholds();
    console.log(res)
    setHouseholds(res.data.households);
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
    const isExpired = verifyToken(); 
         
    if (isExpired)
      navigate("/", { replace: true });

    loadData();
  }, []);

  return (
    <Container 
      maxWidth="lg"
      sx={{
        mt: 5
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 2 }}
      >
        Back to Dashboard
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h4" sx={{ my: 2 }}>Household & Demographic Profiling</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <Button variant="contained" onClick={() => setOpenFormDialog(true)}>Add Household</Button>
        </Box>
      </Box>

      <HouseholdTable 
        households={households}
        handleDelete={handleDelete}
      />

      <HouseholdFormDialog 
        openFormDialog={openFormDialog} 
        setOpenFormDialog={setOpenFormDialog} 
        setHouseholds={setHouseholds}
      />
    </Container>
  );
};

export default HouseholdsPage;
