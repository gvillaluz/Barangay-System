import React, { useEffect, useState } from "react";
import { getDocuments, deleteDocument } from "../../api/documentsApi";
import DocumentForm from "../../components/forms/DocumentForm";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Container,
  Dialog
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils/auth";

export default function DocumentsPage() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);

  const handleBack = () => {
    navigate(isAdmin() ? '/dashboard/admin' : '/dashboard/staff');
  };

  const loadDocs = async () => {
    const res = await getDocuments();
    setDocuments(res.data.records);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleDelete = async (id) => {
    await deleteDocument(id);
    loadDocs();
  };

  return (
    <Container maxWidth="lg">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 2 }}
      >
        Back to Dashboard
      </Button>
      <Typography variant="h4" gutterBottom>
        Document and Certification Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Document
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DocumentForm onClose={() => setOpen(false)} reload={loadDocs} />
      </Dialog>

      <Table>
        <TableHead sx={{ bgcolor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Resident</TableCell>
            <TableCell>Purpose</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.doc_type}</TableCell>
              <TableCell>{d.resident_name}</TableCell>
              <TableCell>{d.purpose}</TableCell>
              <TableCell>{d.status}</TableCell>
              <TableCell>
                {isAdmin() && (
                  <Button color="error" onClick={() => handleDelete(d.id)}>
                    Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
