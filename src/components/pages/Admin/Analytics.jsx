import { useEffect, useState } from "react";
import AdminLayout from "../../Admin/AdminLayout";
import AnalyticsChart from "../../Admin/AnalyticsChart";
import { getAnalytics } from "../../../services/admin/adminAnalyticsService";  

const Analytics = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setChartData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AnalyticsChart data={chartData} />
      )}
    </AdminLayout>
  );
};

export default Analytics;
