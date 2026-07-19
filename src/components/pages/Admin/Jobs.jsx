import { useEffect, useState } from "react";
import AdminLayout from "../../Admin/AdminLayout";
import JobTable from "../../Admin/JobTable";
import { getJobs } from "../../../services/admin/adminJobService";
import JobForm from "./JobForm";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const loadJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error("Failed to load jobs:", error);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Job Management</h1>

      <JobForm
        selectedJob={selectedJob}
        refreshJobs={loadJobs}
        setSelectedJob={setSelectedJob}
      />

      <div className="mt-8">
        <JobTable
          jobs={jobs}
          refreshJobs={loadJobs}
          setSelectedJob={setSelectedJob}
        />
      </div>
    </AdminLayout>
  );
};

export default Jobs;
