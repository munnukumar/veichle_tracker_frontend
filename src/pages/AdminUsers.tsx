import { useEffect, useState } from "react";
import { getAllUsers, updateUserStatus } from "../api/authApi";
import { toast } from "react-toastify";

type UserType = {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  kyc :{
    status: "PENDING" | "VERIFIED" | "REJECTED";
  }
  
};

export default function AdminUsers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      console.log("all users : ", res);
      setUsers(res.data.data);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, field: string, value: any) => {
    try {
      await updateUserStatus(id, { [field]: value });
      toast.success("User updated");
      loadUsers();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading)
    return <div className="text-center py-10 text-xl">Loading users...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Blocked</th>
              <th className="p-3">KYC Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>

                {/* Blocked Dropdown */}
                <td className="p-3">
                  <select
                    value={u.isBlocked ? "true" : "false"}
                    onChange={(e) =>
                      handleUpdate(
                        u._id,
                        "isBlocked",
                        e.target.value === "true"
                      )
                    }
                    className="p-2 border rounded"
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </td>

                {/* KYC Dropdown */}
                <td className="p-3">
                  <select
                    value={u.kyc?.status}
                    onChange={(e) =>
                      handleUpdate(u._id, "kyc", { status: e.target.value })
                    }
                    className="p-2 border rounded"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="VERIFIED">Verified</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
