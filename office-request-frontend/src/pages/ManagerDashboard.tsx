import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");
import { typeConvert } from "../types/requestType";
import LogoutButton from "../components/LogoutButton";

export default function ManagerDashboard() {
  const requests = [
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
    <div>
      <div className="p-6 space-y-6">
        <div className="flex justify-between m-4">
          <h1 className="text-2xl font-bold">📋 รายการคำขอที่ต้องอนุมัติ</h1>
          <LogoutButton />
        </div>

        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">พนักงาน</th>
                <th className="p-3">ประเภท</th>
                <th className="p-3">ตั้งแต่</th>
                <th className="p-3">ถึง</th>
                <th className="p-3">สถานะ</th>
                <th className="p-3">จัดการ</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.user}</td>
                  <td className="p-3 text-center">{typeConvert[r.type as keyof typeof typeConvert]}</td>
                  <td className="p-3 text-center">{dayjs(r.start).format("DD MMM YYYY")}</td>
                  <td className="p-3 text-center">{dayjs(r.end).format("DD MMM YYYY")}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${badge(r.status)}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs">
                      อนุมัติ
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-xs">
                      ปฏิเสธ
                    </button>
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