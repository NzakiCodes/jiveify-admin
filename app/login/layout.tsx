import { Fragment } from "react";

export const metadata = {
  title: "Jiveify Admin",
  description: `Login in to Jiveify Admin Dashboard`,
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Fragment>{children}</Fragment>;
}
