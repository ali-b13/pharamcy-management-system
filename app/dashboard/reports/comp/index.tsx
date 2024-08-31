"use client"
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SelectFilter from '@/components/inputs/SelectFilter';
import { getInventoryReport, getLowStockReport, getSalesReport } from '@/app/actions/report/queries';
import { exportToExcel } from '@/utils/excel/format';
import { exportToPDF } from '@/utils/pdf/format';
import Loading from '@/components/LoadingSpinner'; // Assuming you have a loading component

const ReportsPage = () => {
  const [salesReport, setSalesReport] = useState([]);
  const [inventoryReport, setInventoryReport] = useState([]);
  const [lowStockReport, setLowStockReport] = useState([]);
  const [reportType, setReportType] = useState('sales');
  const [timeFrame, setTimeFrame] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [totalSold, setTotalSold] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    setShowDownloadButton(false);
    setDataFetched(false);
  }, [reportType, timeFrame, startDate, endDate]);

  useEffect(() => {
    if (reportType !== 'lowStock') {
      setTimeFrame('');
    }
  }, [reportType]);

  const fetchReport = async () => {
    setIsLoading(true);
    try {
      if (reportType === 'sales') {
        const res = await getSalesReport({ startDate, endDate, timeFrame });
        setSalesReport(res.data);
        setTotalSold(res.totalSoldProducts);
        setTotalPrice(res.totalPrice);
        setTotalProfit(res.totalProfit);
      } else if (reportType === 'inventory') {
        const res = await getInventoryReport({ type: timeFrame });
        setInventoryReport(res.data);
      } else if (reportType === 'lowStock') {
        const res = await getLowStockReport({ type: timeFrame });
        setLowStockReport(res.data);
      }
      setShowDownloadButton(true);
      setDataFetched(true);
    } catch (error) {
      setShowDownloadButton(false);
      console.error('Error fetching report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const reportOptions = [
    { name: 'تقرير المبيعات', id: 'sales' },
    { name: 'تقرير المخزون', id: 'inventory' },
    { name: 'تقرير المخزون المنخفض', id: 'lowStock' },
  ];

  const timeFrameOptions = [
    { name: 'اسبوعيا', id: 'weekly' },
    { name: 'شهريا', id: 'monthly' },
    { name: 'سنويا', id: 'annual' },
  ];

  const inventoryOptions = [
    { name: 'الادوية الصالحة', id: 'valid' },
    { name: 'الادوية القريبة من الانتهاء', id: 'aboutToExpire' },
    { name: 'الادوية المنتهية', id: 'expired' },
  ];

  const lowStockOptions = [
    { name: 'الكميه الاقل من 10', id: 'quantity' },
    { name: 'مستوئ اعاده الطلب', id: 'reorder' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-teal-800">إصدار التقارير</h1>

        <div className="mb-6">
          <SelectFilter
            label="اختر نوع التقرير"
            options={reportOptions}
            value={reportType}
            onChange={setReportType}
          />
        </div>

        {reportType === 'sales' && (
          <>
            <div className="mb-6">
              <SelectFilter
                label="اختر الإطار الزمني"
                options={timeFrameOptions}
                value={timeFrame}
                onChange={setTimeFrame}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 font-semibold mb-2">
                تاريخ البدء
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 font-semibold mb-2">
                تاريخ الانتهاء
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date as Date)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </>
        )}

        {reportType === 'inventory' && (
          <div className="mb-6">
            <SelectFilter
              label="اختر نوع المخزون"
              options={inventoryOptions}
              value={timeFrame}
              onChange={setTimeFrame}
            />
          </div>
        )}

        {reportType === 'lowStock' && (
          <div className="mb-6">
            <SelectFilter
              label="اختر نوع المخزون"
              options={lowStockOptions}
              value={timeFrame}
              onChange={setTimeFrame}
            />
          </div>
        )}

        {!dataFetched && (
          <button
            onClick={fetchReport}
            disabled={!timeFrame || isLoading}
            className={`w-full flex items-center justify-center bg-teal-600 text-white p-4 rounded-lg font-semibold hover:bg-teal-700 transition duration-200 ${
              !timeFrame || isLoading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {isLoading ? <Loading /> : 'استخراج'}
          </button>
        )}

        {(salesReport.length > 0 || inventoryReport.length > 0 || lowStockReport.length > 0) &&
          showDownloadButton && (
            <div className="mt-8 space-y-4">
              {reportType === 'sales' && (
                <>
                  <button
                    onClick={() => exportToPDF({reportType:'sales',reportData: salesReport, totalSold, totalPrice, totalProfit})}
                    className="w-full bg-red-500 text-white p-4 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
                  >
                    تحميل تقرير المبيعات PDF
                  </button>
                  <button
                    onClick={() => exportToExcel('sales', salesReport)}
                    className="w-full bg-green-500 text-white p-4 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
                  >
                    تحميل تقرير المبيعات EXCEL
                  </button>
                </>
              )}

              {reportType === 'inventory' && (
                <>
                  <button
                    onClick={() => exportToPDF({reportType:'inventory', reportData:inventoryReport})}
                    className="w-full bg-red-500 text-white p-4 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
                  >
                    تحميل تقرير المخزون PDF
                  </button>
                  <button
                    onClick={() => exportToExcel('inventory', inventoryReport)}
                    className="w-full bg-green-500 text-white p-4 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
                  >
                    تحميل تقرير المخزون EXCEL
                  </button>
                </>
              )}

              {reportType === 'lowStock' && (
                <>
                  <button
                    onClick={() => exportToPDF({reportType:'lowStock', reportData:lowStockReport})}
                    className="w-full bg-red-500 text-white p-4 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
                  >
                    تحميل تقرير المخزون المنخفض PDF
                  </button>
                  <button
                    onClick={() => exportToExcel('lowStock', lowStockReport)}
                    className="w-full bg-green-500 text-white p-4 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
                  >
                    تحميل تقرير المخزون المنخفض EXCEL
                  </button>
                </>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default ReportsPage;
