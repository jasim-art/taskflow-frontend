import { useEffect, useState } from "react";
import api from "../services/api";

import StatsCards from "./StatsCards";
import TaskChart from "./TaskChart";

function DashboardContent() {

  const [stats, setStats] =
    useState({
      total: 0,
      completed: 0,
      pending: 0,
      inProgress: 0
    });

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats = async () => {

    try {

      const response =
        await api.get(
          "/tasks/stats"
        );

      setStats(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div className="p-8 space-y-8">

      <StatsCards
        stats={stats}
      />

      <TaskChart
        stats={stats}
      />

    </div>

  );
}

export default DashboardContent;