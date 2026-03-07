import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/dashboard/users/data-table";
import { columns } from "@/components/dashboard/users/columns";

const UsersPage = () => {
  const query = useQuery({
    queryKey: ["dashboard/users"],
    queryFn: async () => {
      const response = await axios.get("/users");
      return response.data;
    },
  });
  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-4">
      <DataTable data={query.data.data} columns={columns} />
    </div>
  );
};

export default UsersPage;
