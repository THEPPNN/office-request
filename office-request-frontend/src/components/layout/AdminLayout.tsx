import Navbar from "../ui/Navbar";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}