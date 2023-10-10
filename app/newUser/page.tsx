"use client";

import Form from "@/app/components/Form/Form";
import { useUsers } from "@/app/hooks/useUsers";

export default function IndexPage({ params }: { params: { id: number } }) {
  const { loadUsers, users, addUser, updateUser } = useUsers();

  return (
    <>
      <Form newUser addUser={addUser} updateUser={updateUser} />
    </>
  );
}
