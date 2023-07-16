import { Fragment } from "react";

export const metadata = {
  title: "Join Jiveify - Unlock Your Podcasting Potential",
  description: `Start your podcasting journey with Jiveify. Sign up now and gain access to a powerful suite of tools that will help you create, edit, and publish your podcasts effortlessly. Connect with a community of podcasters and take your passion to the next level.`,
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Fragment>{children}</Fragment>;
}
