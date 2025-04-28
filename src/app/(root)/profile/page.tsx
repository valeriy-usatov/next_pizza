import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "../../../../prisma/prismaClient";
import { ProfileForm } from "@/components/shared/ProfileForm";

const Profilepage = async () => {
  const session = await getUserSession();
  console.log("session", session);
  if (!session) {
    return redirect("/not-auth");
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  if (!user) {
    return redirect("/not-auth"); // или показать заглушку
  }

  return <ProfileForm data={user} />;
};

export default Profilepage;
