"use client";
import React from "react";
import Form from "@/app/components/Form/Form";
import { useUsers } from "@/app/hooks/useUsers";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/navigation";

export default function IndexPage({ params }: { params: { id: number } }) {
  const { getUserById } = useUsers();
  const router = useRouter();

  const userData = getUserById(params.id);

  return (
    <Box sx={{ display: "flex" }}>
      <h1>User Details</h1>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>

              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Car</TableCell>
              <TableCell>Close Person</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{userData?.first_name}</TableCell>
              <TableCell>{userData?.last_name}</TableCell>
              <TableCell>{userData?.email}</TableCell>
              <TableCell>{userData?.phone}</TableCell>
              <TableCell>{userData?.address}</TableCell>
              <TableCell>{userData?.gender}</TableCell>
              <TableCell>{userData?.car}</TableCell>
              <TableCell>{userData?.close_person}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
}

// export const metadata = {
//   title: "Redux Toolkit",
// };
