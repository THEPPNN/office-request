import AdminLayout from "../components/layout/AdminLayout";
import UserForm from "../components/ui/userForm";
import UserModal from "../components/ui/userModal";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserManagement() {
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "แจ้งเตือน!",
      text: "คุณต้องการลบผู้ใช้งานนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/users/${id}`);
        fetchUsers();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonText: "OK"
        });
      }
    });
  };

  return (
    <AdminLayout>
      <div className="px-6">
        <div className="flex justify-between m-4">
          <h1 className="text-2xl font-bold">👑 User Management</h1>

          <button
            className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
            onClick={() => {
              setEditingUser(null);
              setOpen(true);
            }}
          >
            + เพิ่มผู้ใช้งาน
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">พนักงาน</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.name}</td>
                  <td className="p-3 text-center">{r.email}</td>
                  <td className="p-3 text-center">{r.role.toUpperCase()}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                      onClick={() => {
                        setEditingUser(r);
                        setOpen(true);
                      }}
                    >
                      แก้ไข
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-xs" onClick={() => {
                      handleDelete(r.id);
                    }}>
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      <UserModal open={open} onClose={() => setOpen(false)} editingUser={editingUser}>
        <UserForm
          initialData={editingUser}
          onSuccess={() => {
            setOpen(false);
            fetchUsers(); // 🔥 refresh list หลัง create / edit
          }}
        />
      </UserModal>
    </AdminLayout>
  );
}