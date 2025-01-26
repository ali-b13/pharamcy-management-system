import * as XLSX from "xlsx";

interface SalesReportRow {
  medicineName: string;
  brand: string;
  basePrice: number;
  sellingPrice: number;
  totalSold: number;
  totalPrice: number;
  totalProfit: number;
  batchNumber: string;
  timeFrame: string; // New field for time frame
}

interface InventoryReportRow {
  medicineName: string;
  quantity: number;
  expiryDate: string;
  batchNumber: string;
  supplierName: string; // New field for supplier
}

interface LowStockReportRow {
  medicineName: string;
  brand: string;
  quantity: number;
  batchNumber: string;
  expiryDate: string;
  supplierName: string; // New field for supplier
  medicineId: string; // New field for medicine ID
}

const applyStyles = (worksheet: XLSX.WorkSheet) => {
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "");
  const headerStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "4F81BD" } },
    alignment: { horizontal: "center", vertical: "center" },
  };

  const rowStyle = {
    fill: { fgColor: { rgb: "E6F3FF" } },
    alignment: { horizontal: "left", vertical: "center" },
  };

  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = worksheet[cellAddress];
      if (!cell) continue;

      if (R === 0) {
        // Header styling
        cell.s = headerStyle;
      } else {
        // Row styling
        cell.s = rowStyle;
      }
    }
  }

  // Adjust column widths for better readability
  worksheet["!cols"] = Array(range.e.c - range.s.c + 1).fill({ wch: 20 });
};

const exportStyledExcel = (
  sheetName: string,
  formattedData: object[],
  fileName: string
) => {
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  applyStyles(worksheet); // Apply custom styles

  XLSX.writeFile(workbook, fileName);
};

export const exportSalesReportToExcel = (reportData: SalesReportRow[]) => {
  const formattedData = reportData.map((row) => ({
    "Medicine Name": row.medicineName || "N/A",
    "Brand": row.brand || "N/A",
    "Base Price": row.basePrice ?? 0,
    "Sell Price": row.sellingPrice ?? 0,
    "Total Sold": row.totalSold ?? 0,
    "Total Price": row.totalPrice ?? 0,
    "Total Profit": row.totalProfit ?? 0,
    "Batch Number": row.batchNumber || "N/A",
    "Time Frame": row.timeFrame || "N/A", // Added time frame
  }));

  exportStyledExcel("Sales Report", formattedData, `sales-report.xlsx`);
};

export const exportInventoryReportToExcel = (
  reportData: InventoryReportRow[]
) => {
  const formattedData = reportData.map((row) => ({
    "Medicine Name": row.medicineName || "N/A",
    "Quantity": row.quantity ?? 0,
    "Expiry Date": row.expiryDate || "N/A",
    "Batch Number": row.batchNumber || "N/A",
    "Supplier Name": row.supplierName || "N/A", // Added supplier name
  }));

  exportStyledExcel("Inventory Report", formattedData, "inventory-report.xlsx");
};

export const exportLowStockReportToExcel = (
  reportData: LowStockReportRow[]
) => {
  const formattedData = reportData.map((row) => ({
    "Medicine Name": row.medicineName || "N/A",
    "Brand": row.brand || "N/A",
    "Quantity": row.quantity ?? 0,
    "Batch Number": row.batchNumber || "N/A",
    "Expiry Date": row.expiryDate || "N/A",
    "Supplier Name": row.supplierName || "N/A", // Added supplier name
    "Medicine ID": row.medicineId || "N/A", // Added medicine ID
  }));

  exportStyledExcel("Low Stock Report", formattedData, "low-stock-report.xlsx");
};

export const exportToExcel = (
  reportType: "sales" | "inventory" | "lowStock",
  reportData: any
) => {
  switch (reportType) {
    case "sales":
      exportSalesReportToExcel(reportData);
      break;
    case "inventory":
      exportInventoryReportToExcel(reportData);
      break;
    case "lowStock":
      exportLowStockReportToExcel(reportData);
      break;
    default:
      console.error("Invalid report type specified:", reportType);
  }
};
