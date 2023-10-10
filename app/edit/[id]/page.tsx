"use client";

import Form from "@/app/components/Form/Form";
import { useUsers } from "@/app/hooks/useUsers";
import { useRouter } from "next/navigation";

export default function IndexPage({ params }: { params: { id: number } }) {
  const { loadUsers, users, addUser, updateUser } = useUsers();
  const router = useRouter();

  return (
    <>
      <h1>Condo Users</h1>

      <Form
        newUser={false}
        id={params.id}
        addUser={addUser}
        updateUser={(values) => {
          updateUser(values);
          router.push("/");
        }}
      />
    </>
  );
}

// export const metadata = {
//   title: "Redux Toolkit",
// };
