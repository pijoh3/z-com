import style from "./photoModal.module.css";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import getSinglePost from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import getComments from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import dynamic from "next/dynamic";

type Props = { params: { id: string } };
export default async function Default({ params }: Props) {
  
  const ImageZone = dynamic(
    () =>
      import(
        "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/ImageZone"
      ),
    { ssr: false }
  );
  const PhotoModalCloseButton = dynamic(
    () =>
      import(
        "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/PhotoModalCloseButton"
      ),
    { ssr: false }
  );

  const Comments = dynamic(
    () =>
      import("@/app/(afterLogin)/[username]/status/[id]/_component/Comments"),
    { ssr: false }
  );

  const SinglePost = dynamic(
    () =>
      import("@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost"),
    { ssr: false }
  );

  const CommentForm = dynamic(
    () =>
      import(
        "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm"
      ),
    { ssr: false }
  );

  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />

        <div className={style.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm />
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
