"use client";
import React from "react";
import Form from "@/app/components/Form/Form";
import { useUsers } from "@/app/hooks/useUsers";

export default function IndexPage({ params }: { params: { id: number } }) {
  const { addUser, updateUser } = useUsers();

  return (
    <>
      <h1>Create New User</h1>

      <Form newUser addUser={addUser} updateUser={updateUser} />
    </>
  );
}
