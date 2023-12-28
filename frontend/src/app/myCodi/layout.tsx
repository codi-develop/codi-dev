"use client";
import React, { useState } from "react";
import SideBar, {
  MobileMenuButton,
  SideBarOverlay,
} from "@/components/NavBar/SideBar/SideBar";
import Profile from "@icons/common/profile.svg";
import Verified from "@icons/common/verified.svg";
import theme from "@/ui/theme";
import FlexBox from "@/ui/atoms/FlexBox";
import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import Typography from "@/ui/atoms/Typography";
import Button from "@/ui/atoms/Button";
import Menu from "@icons/mobile/mobile-menu.svg";
import { useRouter } from "next/navigation";

export default function MyCodiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = useSelector(selectUser).id;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <FlexBox justifyContent="flex-start" alignItems="flex-start">
      <>
        <SideBarOverlay open={open} onClick={() => setOpen(false)} />
        <MobileMenuButton
          variant="square"
          onClick={() => setOpen((prev) => !prev)}
          color={theme.colors.gray.main}
        >
          <Menu />
        </MobileMenuButton>
      </>
      <SideBar navigators={navigators} open={open} setOpen={setOpen} />
      <LayoutWithSideBar>
        {userId ? (
          children
        ) : (
          <FlexBox direction="column" rowGap="20px">
            <Typography
              variant="span"
              color={theme.colors.gray.dark}
              {...{ marginRight: "10px" }}
            >
              로그인이 필요해요.
            </Typography>
            <Button
              size="small"
              onClick={() => router.push("/signin")}
              variant="default"
            >
              로그인 하러 가기
            </Button>
          </FlexBox>
        )}
      </LayoutWithSideBar>
    </FlexBox>
  );
}

const navigators = [
  {
    iconComponent: <Profile fill={theme.colors.gray.main} />,
    currentIconComponent: <Profile fill={theme.colors.white} />,
    name: "일정 관리",
    href: "/myCodi/",
  },
  {
    iconComponent: <Verified fill={theme.colors.gray.main} />,
    currentIconComponent: <Verified fill={theme.colors.white} />,
    name: "관심 멘토",
    href: "/myCodi/favorites/",
  },
  // {
  //   iconComponent: <Verified fill={theme.colors.gray.main} />,
  //   currentIconComponent: <Verified fill={theme.colors.white} />,
  //   name: "코디 뱃지",
  //   href: "/myInfo/badges/",
  // },
];
