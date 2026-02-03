import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");
import { typeConvert } from "../types/requestType";
import LogoutButton from "../components/LogoutButton";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { authStorage } from "../utils/authStorage";
export default function ManagerDashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [requests, setRequests] = useState<any[]>([]);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_URL}/requests`);
      console.log('res', res.data.requests);
      setRequests(res.data.requests);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const badge = (status: string) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
  };

  const handleApprove = async (id: number) => {
    try {
      const res = await axios.put(`${API_URL}/managers/${id}`, { approveId: authStorage.getId(), status: "APPROVED" });
      if (res.status === 200) {
        Swal.fire({
          title: "อนุมัติคำขอสำเร็จ",
          icon: "success",
          text: "คำขอถูกอนุมัติสำเร็จ",
        });
        fetchRequests();
      } else {
        Swal.fire({
          title: "แจ้งเตือน",
          icon: "error",
          text: res.data.message,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: number) => {
    Swal.fire({
      title: "ยืนยัน",
      icon: "warning",
      text: "คุณต้องการปฏิเสธคำขอหรือไม่?",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.put(`${API_URL}/managers/${id}`, { approveId: authStorage.getId(), status: "REJECTED" });
          if (res.status === 200) {
            Swal.fire({
              title: "ปฏิเสธคำขอสำเร็จ",
              icon: "success",
              text: "คำขอถูกปฏิเสธสำเร็จ",
            });
            fetchRequests();
          } else {
            Swal.fire({
              title: "แจ้งเตือน",
              icon: "error",
              text: res.data.message,
            });
          }
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: "แจ้งเตือน",
            icon: "error",
            text: "Something went wrong",
          });
        }
      }
    });
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
                  <td className="p-3">{r.user.name}</td>
                  <td className="p-3 text-center">{typeConvert[r.type as keyof typeof typeConvert]}</td>
                  <td className="p-3 text-center">{dayjs(r.startDate).format("DD MMM YYYY")}</td>
                  <td className="p-3 text-center">{dayjs(r.endDate).format("DD MMM YYYY")}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${badge(r.status)}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    {r.status === "PENDING" && (
                      <>
                        <button onClick={() => handleApprove(r.id)} className="px-3 py-1 bg-green-600 text-white rounded text-xs">
                          อนุมัติ
                        </button>
                        <button onClick={() => handleReject(r.id)} className="px-3 py-1 bg-red-600 text-white rounded text-xs">
                          ปฏิเสธ
                        </button>
                      </>
                    )}
                    {r.status === "APPROVED" && (
                      <span className="text-green-600">
                        อนุมัติ
                      </span>
                    )}
                    {r.status === "REJECTED" && (
                      <span className="text-red-600">
                        ปฏิเสธ
                      </span>
                    )}
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