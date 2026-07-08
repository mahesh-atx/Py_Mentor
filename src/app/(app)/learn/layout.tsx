import { LearnLayout } from "./learn-layout";

export default async function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <LearnLayout>
      {children}
    </LearnLayout>
  );
}
