import Main from "@/app/(beforeLogin)/_component/Main";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (session?.user) redirect("/home");

  return <Main />;
}
