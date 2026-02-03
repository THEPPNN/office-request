import axios from "axios";
import AdminLayout from "../components/layout/AdminLayout";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { useEffect, useState } from "react";
dayjs.locale("th");

export default function AdminDashboard() {
  // const stats = [
  //   { label: "คำขอทั้งหมด", value: 128 },
  //   { label: "รออนุมัติ", value: 23 },
  //   { label: "อนุมัติแล้ว", value: 89 },
  //   { label: "ถูกปฏิเสธ", value: 16 },
  // ];
  const badge = (status: string) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
  };

  const API_URL = import.meta.env.VITE_API_URL;
  const [requests, setRequests] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_URL}/requests`);
      setRequests(res.data.requests);
      setStats(res.data.stats);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
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
            <div
              key={key}
              className="bg-white rounded shadow p-4 text-center"
            >
              <div className="text-gray-500 text-sm">{key}</div>
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
                      className={`px-2 py-1 rounded text-xs ${badge(r.status)}`}
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