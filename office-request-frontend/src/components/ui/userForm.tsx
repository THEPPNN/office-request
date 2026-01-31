// userForm.tsx
import { useState } from "react";
import SelectInput from "./SelectInput";
import Input from "./Input";
import Swal from "sweetalert2";

export default function UserForm({
    onSuccess,
    initialData,
}: {
    onSuccess: () => void;
    initialData?: any;
}) {
    const [name, setName] = useState(initialData?.name || "");
    const [email, setEmail] = useState(initialData?.email || "");
    const [role, setRole] = useState(initialData?.role || "");

    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");

    const submit = async () => {
        if (!name || !email || !role) {
            Swal.fire({
                title: "กรุณากรอกข้อมูลให้ครบ",
                icon: "error",
            });
            return;
        }

        if (!isValidEmail(email)) {
            Swal.fire({
                title: "อีเมลไม่ถูกต้อง",
                text: "กรุณากรอกอีเมลให้ถูกต้อง เช่น user@email.com",
                icon: "warning",
            });
            return;
        }

        setLoading(true);

        if (initialData) {
            // ✏️ EDIT
            Swal.fire({
                title: "แก้ไขสำเร็จ",
                text: "อัปเดตข้อมูลผู้ใช้งานแล้ว",
                html: `<div>
                    <p><strong>ID:</strong> ${initialData.id}</p>
                    <p><strong>ชื่อ:</strong> ${name}</p>
                    <p><strong>อีเมล:</strong> ${email}</p>
                    <p><strong>สิทธิ์:</strong> ${role}</p>
                </div>`,
                icon: "success",
            }).then(() => {
                setLoading(false);
                onSuccess();
            });
        } else {
            // ➕ CREATE
            Swal.fire({
                title: "สร้างผู้ใช้งานสำเร็จ",
                text: "ผู้ใช้งานของคุณถูกสร้างสำเร็จ",
                html: `<div>
                    <p><strong>ชื่อ:</strong> ${name}</p>
                    <p><strong>อีเมล:</strong> ${email}</p>
                    <p><strong>สิทธิ์:</strong> ${role}</p>
                </div>`,
                icon: "success",
            }).then(() => {
                setLoading(false);
                onSuccess();
            });
        }
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className="space-y-4">
            <div className="form-group">
                <label className="block mb-1 text-sm">ชื่อ</label>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label className="block mb-1 text-sm">อีเมล</label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        const value = e.target.value;
                        setEmail(value);

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
                <label className="block mb-1 text-sm">สิทธิ์</label>
                <SelectInput
                    options={[
                        { label: "พนักงาน", value: "user" },
                        { label: "ผู้จัดการ", value: "manager" },
                        { label: "ผู้ดูแลระบบ", value: "admin" },
                    ]}
                    value={role}
                    onChange={(value) => setRole(value)}
                />
            </div>

            <button
                onClick={submit}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                {loading ? "กำลังส่ง..." : "สร้างผู้ใช้งาน"}
            </button>
        </div>
    );
}