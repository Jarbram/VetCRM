
import { LandingHeader } from "@/components/landing-header";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LandingHeader />
      {children}
    </div>
  );
}
