import { useState } from "react";
import SelectInput from "../ui/SelectInput";
import Input from "./Input";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");
import axios from "axios";

import { typeConvert } from "../../types/requestType";
import { authStorage } from "../../utils/authStorage";

export default function RequestForm({
    onSuccess,
}: {
    onSuccess: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [requestType, setRequestType] = useState("");
    const [note, setNote] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;
    const submit = async () => {
        if (!requestType || !startDate || !endDate) {
            Swal.fire({
                title: "กรุณากรอกข้อมูลให้ครบ",
                icon: "error",
            });
            return;
        }
        setLoading(true);
        try {
            let res = await axios.post(`${API_URL}/requests`, {
                type: requestType,
                startDate: startDate,
                endDate: endDate,
                note: note,
                userId: authStorage.getId(),
            });
            if (res.status === 201) {
                let html = `<div>
                <p><strong>ประเภทคำขอ:</strong> ${typeConvert[requestType as keyof typeof typeConvert]}</p>
                <p><strong>ตั้งแต่วันที่:</strong> ${dayjs(startDate).format("DD MMM YYYY")}</p>
                <p><strong>ถึงวันที่:</strong> ${dayjs(endDate).format("DD MMM YYYY")}</p>
                <p><strong>หมายเหตุ:</strong> ${note}</p>
            </div>`
                Swal.fire({
                    title: "ส่งคำขอสำเร็จ",
                    icon: "success",
                    text: "คำขอของคุณถูกส่งสำเร็จ",
                    html: html,
                    confirmButtonText: "ตกลง",
                }).then(() => {
                    setLoading(false);
                    onSuccess();
                    document.getElementById("fetch-requests")?.click();
                });
            } else {
                Swal.fire({
                    title: "แจ้งเตือน",
                    icon: "error",
                    text: res.data.message,
                });
                return;
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="form-group">
                <label className="block mb-1 text-sm">ประเภทคำขอ</label>
                <SelectInput
                    options={[{ label: "ลาป่วย", value: "SICK" }, { label: "ลากิจ", value: "BUSINESS" }, { label: "ลาพักร้อน", value: "VACATION" }]}
                    value={requestType}
                    onChange={(value) => setRequestType(value)}
                />
            </div>
            <div className="form-group">
                <label className="block mb-1 text-sm">ตั้งแต่วันที่</label>
                <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label className="block mb-1 text-sm">ถึงวันที่</label>
                <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label className="block mb-1 text-sm">หมายเหตุ</label>
                <textarea
                    className="w-full border rounded p-2"
                    placeholder="ระบุรายละเอียด"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>

            <button
                onClick={submit}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                {loading ? "กำลังส่ง..." : "ส่งคำขอ"}
            </button>
        </div>
    );
}