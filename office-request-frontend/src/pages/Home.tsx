import { useEffect, useState } from "react";
import CreateRequestModal from "../components/ui/CreateRequestModal";
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");

import { typeConvert } from "../types/requestType";
import LogoutButton from "../components/LogoutButton";
import axios from "axios";
import { authStorage } from "../utils/authStorage";
export default function Home() {
  const [open, setOpen] = useState(false);

  const statusStyle = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };
  const API_URL = import.meta.env.VITE_API_URL;
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
      const res = await axios.get(`${API_URL}/requests?userId=${authStorage.getId()}`);
      setRequests(res.data.requests);
      setStats(res.data.stats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const requestStatus = (status: string) => {
    if (status === "PENDING") return "bg-yellow-100 text-yellow-700";
    if (status === "APPROVED") return "bg-green-100 text-green-700";
    if (status === "REJECTED") return "bg-red-100 text-red-700";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">👋 Welcome</h1>
          <p className="text-gray-500">Today: {dayjs().format("DD MMM YYYY")}</p>
        </div>
        <LogoutButton />
      </div>
      <button onClick={fetchRequests} id="fetch-requests" className="hidden">Fetch Requests</button>
      <div className="flex justify-center">
        <button onClick={() => setOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md">+ สร้างคำขอ</button>
      </div>
      <CreateRequestModal
        open={open}
        onClose={() => setOpen(false)}
      />

      {/* My Requests */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-3">ประวัติคำขอของคุณ</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold">ลำดับ</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">ประเภทคำขอ</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">ตั้งแต่วันที่</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">ถึงวันที่</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{typeConvert[request.type as keyof typeof typeConvert]}</td>
                  <td className="px-4 py-2">{dayjs(request.startDate).format("DD MMM YYYY")}</td>
                  <td className="px-4 py-2">{dayjs(request.endDate).format("DD MMM YYYY")}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-sm rounded ${requestStatus(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
