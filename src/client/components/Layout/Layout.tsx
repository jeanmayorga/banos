import { Footer, Header } from "client/components";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  const router = useRouter();
  const isDashboard = router.pathname.includes("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
