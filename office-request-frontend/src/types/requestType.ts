export const typeConvert = {
    SICK: "ลาป่วย",
    BUSINESS: "ลากิจ",
    VACATION: "ลาพักร้อน",
}

export type RequestType = keyof typeof typeConvert;