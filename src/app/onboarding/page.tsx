import { CurriculumService } from "@/lib/services/curriculum.service";
import OnboardingClient from "./onboarding-client";

export default async function OnboardingPage() {
  const tracks = [
    {
      id: "python",
      title: "Python Developer",
      description: "Learn Python from scratch. Master data structures, OOP, and more.",
    },
    {
      id: "javascript",
      title: "JavaScript Mastery",
      description: "Learn modern JavaScript. Master the DOM, async programming, and web APIs.",
    }
  ];

  return <OnboardingClient tracks={tracks} />;
}
