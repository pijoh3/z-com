import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import style from "./home.module.css";
import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import { Suspense } from "react";
import Loading from "@/app/(afterLogin)/home/loading";
import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspnse";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession()
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session}/>
        <Suspense fallback={<Loading />}>
          <TabDecider />
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
