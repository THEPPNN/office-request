// components/ui/UserModal.tsx
type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    editingUser: any | null;
  };
  
  export default function UserModal({ open, onClose, children, editingUser }: Props) {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
            ✕
          </button>
  
          <h2 className="text-lg font-bold mb-4">{editingUser ? "✏️ แก้ไขผู้ใช้งาน" : "➕ เพิ่มผู้ใช้งาน"}</h2>
  
          {children}
        </div>
      </div>
    );
  }