import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function AfterLoginLayout({ children }: Props) {
  return (
    <div>
      애프터 로그인 레이아웃
      {children}
    </div>
  );
}
