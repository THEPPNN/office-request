import axios from "axios";
import AdminLayout from "../components/layout/AdminLayout";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { useEffect, useState } from "react";
dayjs.locale("th");

export default function AdminDashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [requests, setRequests] = useState<any[]>([]);
  
  const [stats, setStats] = useState<any>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const statsColor = {
    total: "bg-gray-500",
    pending: "bg-yellow-500",
    approved: "bg-green-500",
    rejected: "bg-red-500",
  };
  
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_URL}/requests`);
      setRequests(res.data.requests);
      setStats(res.data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  const requestStatus = (status: string) => {
    if (status === "PENDING") return "bg-yellow-100 text-yellow-700";
    if (status === "APPROVED") return "bg-green-100 text-green-700";
    if (status === "REJECTED") return "bg-red-100 text-red-700";
  };

  return (
    <AdminLayout>
      <div className="px-6">
        <div className="flex justify-between m-4">
          <h1 className="text-2xl font-bold">👑 Admin Dashboard</h1>
        </div>
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(stats).map(([key, value]) => (
            <div className={`text-sm text-white rounded shadow p-4 text-center ${statsColor[key as keyof typeof statsColor]}`}>
              <b className="text-lg">{key.charAt(0).toUpperCase() + key.slice(1)}</b>
              <div className="text-2xl font-bold mt-1">{typeof value === "number" ? value : 0}</div>
            </div>
          ))}
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded shadow">
          <div className="p-4 border-b font-semibold">
            📋 คำขอล่าสุด
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">พนักงาน</th>
                <th className="p-3">ประเภท</th>
                <th className="p-3">วันที่</th>
                <th className="p-3">ถึงวันที่</th>
                <th className="p-3">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.user.name}</td>
                  <td className="p-3 text-center">{r.type}</td>
                  <td className="p-3 text-center">{dayjs(r.startDate).format("DD MMM YYYY")}</td>
                  <td className="p-3 text-center">{dayjs(r.endDate).format("DD MMM YYYY")}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${requestStatus(r.status)}`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  );
}