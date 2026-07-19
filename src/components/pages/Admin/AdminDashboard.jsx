import { useEffect, useState } from "react";
import AdminLayout from "../../Admin/AdminLayout";
import StatsCard from "../../Admin/StatsCard";
import AnalyticsChart from "../../Admin/AnalyticsChart";
import { getDashboardStats } from "../../../services/admin/adminDashboardService";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    jobs: 0,
    applications: 0,
    resumes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <h2 className="text-xl font-semibold p-6">Loading Dashboard...</h2>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Users"
          value={stats.users}
          icon="👤"
        />
        <StatsCard
          title="Jobs"
          value={stats.jobs}
          icon="💼"
        />
        <StatsCard
          title="Applications"
          value={stats.applications}
          icon="📄"
        />
        <StatsCard
          title="Resume Analysis"
          value={stats.resumes}
          icon="📊"
        />
      </div>

      <div className="mt-8">
        <AnalyticsChart />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
