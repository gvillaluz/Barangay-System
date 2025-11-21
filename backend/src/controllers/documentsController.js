import pool from "../config/db.js";
import documentsService from "../services/documentsService.js";

export const getDocuments = async (req, res) => {
  try {
    const records = await documentsService.getDocumentRecords();

    return res.status(200).json({
      success: true,
      message: "Document records fetched successfully",
      records
    });
  } catch (err) {
    return res.status(err.message || 500).json({
      success: false,
      message: err.message
    });
  }
};

// export const getDocument = async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM documents WHERE id = ?", [req.params.id]);
//     if (rows.length === 0) return res.status(404).json({ message: "Document not found" });
//     res.json(rows[0]);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const createDocument = async (req, res) => {
  try {
    const documentId = await documentsService.createRecord(req.body);

    return res.status(201).json({
      success: true,
      message: "Document record created successfully.",
      documentId
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const recordId = await documentsService.updateDocumentRecord(req.body, req.params.id);
    
    return res.status(200).json({
      success: true,
      message: "Document record updated successfully.",
      recordId
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    await documentsService.deleteDocumentRecord(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Document record deleted successfully."
    });
  } catch (err) {
    return res.status(err.status).json({
      success: false,
      message: err.message
    });
  }
};
