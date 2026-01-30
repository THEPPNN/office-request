export const typeConvert = {
    sick: "ลาป่วย",
    business: "ลากิจ",
    vacation: "ลาพักร้อน",
}

export type RequestType = keyof typeof typeConvert;