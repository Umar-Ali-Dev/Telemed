import type { TableStyles } from "react-data-table-component";

export const commonTableStyles: TableStyles = {
  table: {
    style: {
      backgroundColor: "#D4CFCC", // Table background color
    },
  },
  headRow: {
    style: {
      backgroundColor: "#705295", // Purple header
      minHeight: "52px",
      borderBottomWidth: "0px",
      borderRadius: "12px 12px 0 0",
    },
  },
  headCells: {
    style: {
      color: "#FFFFFF", // White header text
      fontSize: "14px",
      fontWeight: "600",
    },
  },
  rows: {
    style: {
      minHeight: "60px",
      fontSize: "14px",
      color: "#666666",
      backgroundColor: "#FFFFFF",
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#D4CFCC",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#F9FAFB",
        cursor: "pointer !important",
      },
    },
  },
  cells: {
    style: {
      padding: "8px 16px",
      border: "none",
      cursor: "pointer",
    },
  },
};
