import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

function AdminLayout({
  children,
}) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;