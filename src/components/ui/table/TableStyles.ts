import type { TableStyles } from "react-data-table-component";

export const commonTableStyles: TableStyles = {
  table: {
    style: {
      backgroundColor: "#FFFAF7",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#705295",
      minHeight: "52px",
      borderBottomWidth: "0px",
      borderRadius: "12px 12px 0 0",
    },
  },
  headCells: {
    style: {
      color: "#FFFFFF",
      fontSize: "14px",
      fontWeight: "600",
      whiteSpace: "normal", // Allows header text to wrap
    },
  },
  rows: {
    style: {
      minHeight: "60px",
      fontSize: "14px",
      color: "#666666",
      backgroundColor: "#FFFAF7",
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#D4CFCC",
      "&:hover": {
        backgroundColor: "#F9FAFB",
        cursor: "pointer !important",
      },
    },
  },
  cells: {
    style: {
      padding: "12px 16px",
      border: "none",
      cursor: "pointer",
      whiteSpace: "normal", // Prevents "..." truncation
      wordBreak: "break-word", // Ensures long content breaks correctly
    },
  },
};
