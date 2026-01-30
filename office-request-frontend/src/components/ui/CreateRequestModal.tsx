import RequestForm from "./RequestForm";

type Props = {
    open: boolean;
    onClose: () => void;
  };
  
  export default function CreateRequestModal({ open, onClose }: Props) {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white w-full max-w-lg rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              สร้างคำขอ
            </h2>
            <button onClick={onClose}>✖</button>
          </div>
  
          <RequestForm onSuccess={onClose} />
        </div>
      </div>
    );
  }