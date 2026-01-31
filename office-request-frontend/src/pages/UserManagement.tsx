import AdminLayout from "../components/layout/AdminLayout";
import UserForm from "../components/ui/userForm";
import UserModal from "../components/ui/userModal";
import { useState } from "react";

export default function UserManagement() {
    const [open, setOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any | null>(null);
    const users = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            role: "user",
            status: "active",
        },
        {
            id: 2,
            name: "Jane Doe",
            email: "jane.doe@example.com",
            role: "admin",
            status: "active",
        },
        {
            id: 3,
            name: "Jim Doe",
            email: "jim.doe@example.com",
            role: "manager",
            status: "active",
        },
    ];
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

                {/* table เหมือนเดิม */}
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">พนักงาน</th>
                            <th className="p-3">ประเภท</th>
                            <th className="p-3">วันที่</th>
                            <th className="p-3">สถานะ</th>
                            <th className="p-3">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((r) => (
                            <tr key={r.id} className="border-t">
                                <td className="p-3">{r.name}</td>
                                <td className="p-3 text-center">{r.email}</td>
                                <td className="p-3 text-center">{r.role.toUpperCase()}</td>
                                <td className="p-3 text-center">{r.status === "active" ? "ใช้งาน" : "ปิดใช้งาน"}</td>
                                <td className="p-3 text-center space-x-2">
                                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                                     onClick={() => {
                                        setEditingUser(r);
                                        setOpen(true);
                                      }}
                                    >แก้ไข</button>
                                    <button className="px-3 py-1 bg-red-600 text-white rounded text-xs">ลบ</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* ✅ Modal */}
            <UserModal open={open} onClose={() => setOpen(false)} editingUser={editingUser}>
                <UserForm onSuccess={() => setOpen(false)} initialData={editingUser} />
            </UserModal>
        </AdminLayout>
    );
}