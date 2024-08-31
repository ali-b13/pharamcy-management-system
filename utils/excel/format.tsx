import * as XLSX from "xlsx";

export const exportSalesReportToExcel = (reportData: any) => {
  // Format data for Excel
  const formattedData = reportData.map((row: any) => ({
    "Medicine Name": row.name,
    "Brand": row.brand,
    "Base Price": row.basePrice,
    "Sell Price": row.sellingPrice,
    "Total Sold": row.totalSold,
    "Total Price": row.totalPrice,
    "Total Profit": row.totalProfit,
    "Batch Number": row.batchNumber,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
  XLSX.writeFile(workbook, `sales-report.xlsx`);
};

const exportInventoryReportToExcel = (reportData: any) => {
  const formattedData = reportData.map((row: any) => ({
    "Medicine Name": row.name,
    "Quantity": row.quantity,
    "Expiry Date": row.expiryDate,
    "Batch Number": row.batchNumber,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Report");
  XLSX.writeFile(workbook, "inventory-report.xlsx");
};

const exportLowStockReportToExcel = (reportData: any) => {
  const formattedData = reportData.map((row: any) => ({
    "Medicine Name": row.name,
    "Quantity": row.quantity,
    "Reorder Level": row.reorderLevel,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Low Stock Report");
  XLSX.writeFile(workbook, "low-stock-report.xlsx");
};

export const exportToExcel = (reportType: string, reportData: any) => {
  if (reportType === "sales") {
    exportSalesReportToExcel(reportData);
  } else if (reportType === "inventory") {
    exportInventoryReportToExcel(reportData);
  } else if (reportType === "lowStock") {
    exportLowStockReportToExcel(reportData);
  }
};
