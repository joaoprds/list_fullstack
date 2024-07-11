import React, { useEffect, useState } from "react";
import axios from "axios";

const Logs = ({ token }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/logs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(response.data);
      } catch (error) {
        console.error("Error while search logs:", error);
      }
    };

    fetchLogs();
  }, [token]);

  return (
    <div>
      <h2>Logs of Deleted Products</h2>
      {logs.map((log) => (
        <div key={log.id}>
          <p>Product: {log.productName}</p>
          <p>Deleted in: {new Date(log.deletedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Logs;
