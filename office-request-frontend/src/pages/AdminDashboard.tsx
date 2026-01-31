import LogoutButton from "../components/LogoutButton";
import AdminLayout from "../components/layout/AdminLayout";
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");

export default function AdminDashboard() {
  const stats = [
    { label: "คำขอทั้งหมด", value: 128 },
    { label: "รออนุมัติ", value: 23 },
    { label: "อนุมัติแล้ว", value: 89 },
    { label: "ถูกปฏิเสธ", value: 16 },
  ];

  const recentRequests = [
    {
      id: 1,
      user: "สมชาย ใจดี",
      type: "sick",
      start: "2026-01-10",
      end: "2026-01-12",
      status: "pending",
    },
    {
      id: 2,
      user: "สมหญิง งานดี",
      type: "sick",
      start: "2026-01-16",
      end: "2026-01-16",
      status: "approved",
    },
    {
      id: 3,
      user: "สมใจ ใจดี",
      type: "business",
      start: "2026-01-15",
      end: "2026-01-17",
      status: "approved",
    },
    {
      id: 4,
      user: "สมงาน งานดี",
      type: "business",
      start: "2026-01-15",
      end: "2026-01-18",
      status: "approved",
    },
    {
      id: 5,
      user: "สมหญิง งานงาม",
      type: "business",
      start: "2026-01-15",
      end: "2026-01-19",
      status: "approved",
    },
  ];

  const badge = (status: string) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
  };

  return (
    <AdminLayout>
      <div className="px-6">
        <div className="flex justify-between m-4">
          <h1 className="text-2xl font-bold">👑 Admin Dashboard</h1>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded shadow p-4 text-center"
            >
              <div className="text-gray-500 text-sm">{s.label}</div>
              <div className="text-2xl font-bold mt-1">{s.value}</div>
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
              {recentRequests.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.user}</td>
                  <td className="p-3 text-center">{r.type}</td>
                  <td className="p-3 text-center">{dayjs(r.start).format("DD MMM YYYY")}</td>
                  <td className="p-3 text-center">{dayjs(r.end).format("DD MMM YYYY")}</td>
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