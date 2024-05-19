"use client";

import { useContext } from "react";
import { tabContext } from "@/app/(afterLogin)/home/_component/TabProvider";
import PostRecommends from "./PostRecommends";
import FollowingPosts from "./followingPosts";

export default function TabDecider() {
  const { tab } = useContext(tabContext);
  if (tab === "rec") return <PostRecommends />;
  return <FollowingPosts />;
}
