"use client";

import { useGetAllUsersQuery, useGetMeQuery, useUpdateUserRoleMutation } from "@/redux/features/users/users.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManageUsers() {
  const { data: response, isLoading, isError } = useGetAllUsersQuery();

  const users = response?.data || [];

  const { data: meResponse } = useGetMeQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const currentUser = meResponse?.data;
  const isSuperAdmin = currentUser?.role === "super_admin" || currentUser?.role === "admin";

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage all registered users.</p>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-red-600">
                  Failed to load users.
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {isSuperAdmin ? (
                      <Select
                        defaultValue={user.role}
                        onValueChange={async (val) => {
                          try {
                            await updateUserRole({ id: user.id, role: val as any }).unwrap();
                            toast.success("Role updated");
                          } catch (err: any) {
                            toast.error(err?.data?.message || "Failed to update role");
                          }
                        }}
                      >
                        <SelectTrigger size="sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="instructor">Instructor</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      user.role
                    )}
                  </TableCell>
                  <TableCell>{user.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
