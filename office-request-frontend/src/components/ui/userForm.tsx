// userForm.tsx
import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import Input from "./Input";
import Swal from "sweetalert2";
import axios from "axios";

export default function UserForm({
    onSuccess,
    initialData,
}: {
    onSuccess: () => void;
    initialData?: any;
}) {

    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");

    const [error, setError] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;


    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "",
        password: ""
    });

    const isEdit = !!initialData;
    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name,
                email: initialData.email,
                role: initialData.role,
                password: "",
            });
        }
    }, [initialData]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                // 🔵 EDIT
                let res = await axios.put(`${API_URL}/users/${initialData.id}`, form);
                if (res.status === 200) {
                    onSuccess?.();
                    Swal.fire({
                        title: "แจ้งเตือน",
                        icon: "success",
                        text: "บันทึกการแก้ไขสำเร็จ 🎉",
                    });
                } else {
                    setError(res.data.message);
                }
            } else {
                // 🟢 CREATE
                let res = await axios.post(`${API_URL}/users`, form);
                if (res.status === 201) {
                    onSuccess?.();
                    Swal.fire({
                        title: "แจ้งเตือน",
                        icon: "success",
                        text: "สร้างผู้ใช้สำเร็จ 🎉",
                    });
                    setForm({
                        name: "",
                        email: "",
                        role: "",
                        password: ""
                    });
                } else {
                    setError(res.data.message);
                }
            }

            onSuccess();
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-4">
                <div className="form-group">
                    <label className="block mb-1 text-sm">ชื่อ</label>
                    <Input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label className="block mb-1 text-sm">อีเมล</label>
                    <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                            const value = e.target.value;
                            setForm({ ...form, email: value })

                            if (!isValidEmail(value)) {
                                setEmailError("รูปแบบอีเมลไม่ถูกต้อง");
                            } else {
                                setEmailError("");
                            }
                        }}
                    />
                    {emailError && (
                        <p className="text-red-500 text-xs mt-1">{emailError}</p>
                    )}
                </div>
                <div className="form-group">
                    <label className="block mb-1 text-sm">รหัสผ่าน

                        {isEdit && <small className="text-gray-500 text-xs"> หากต้องการเปลี่ยนรหัสผ่าน กรอกรหัสผ่านใหม่</small>}
                    </label>
                    <Input
                        type="password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label className="block mb-1 text-sm">สิทธิ์</label>
                    <SelectInput
                        options={[
                            { label: "พนักงาน", value: "USER" },
                            { label: "ผู้จัดการ", value: "MANAGER" },
                            { label: "ผู้ดูแลระบบ", value: "ADMIN" },
                        ]}
                        value={form.role}
                        onChange={(value) => setForm({ ...form, role: value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    {isEdit ? "บันทึกการแก้ไข" : "สร้างผู้ใช้งาน"} {loading ? "กำลังดำเนินการ..." : ""}
                </button>
                {error && <p className="text-red-500 text-center text-xs mt-1">{error}</p>}
            </div>
        </form>
    );
}