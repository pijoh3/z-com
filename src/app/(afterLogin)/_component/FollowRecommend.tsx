"use client";

import { User } from "@/model/User";
import style from "./FollowRecommend.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import cx from "classnames";

type Props = { user: User };
export default function FollowRecommend({ user }: Props) {
  const { data: session } = useSession();
  const followed = !!user.Followers?.find(
    (v) => v.userId === session?.user?.email
  );
  const queryClient = useQueryClient();

  const follow = useMutation({
    mutationFn: (userId: string) =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: "include",
        method: "post",
      }),
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: [{ userId: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", "followRecommends"], shallow);
      }
    },
    onError(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: shallow[index].Followers.filter(
            (v) => v.userId !== session?.user?.email
          ),
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers - 1,
          },
        };
        queryClient.setQueryData(["users", "followRecommends"], shallow);
      }
    },
  });

  const unfollow = useMutation({
    mutationFn: (userId: string) =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: "include",
        method: "delete",
      }),
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: shallow[index].Followers.filter(
            (v) => v.userId !== session?.user?.email
          ),
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers - 1,
          },
        };
        queryClient.setQueryData(["users", "followRecommends"], shallow);
      }
    },
    onError(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: [{ userId: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers: shallow[index]._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", "followRecommends"], shallow);
      }
    },
  });
  const onFollow = () => {
    console.log("follow");
    followed ? unfollow.mutate(user.id) : follow.mutate(user.id);
  };

  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div
        className={cx(style.followButtonSection, followed && style.followed)}
      >
        <button onClick={onFollow}>{followed ? "팔로잉" : "팔로우"}</button>
      </div>
    </div>
  );
}
