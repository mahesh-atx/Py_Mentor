import OnboardingClient from "./onboarding-client";

export default async function OnboardingPage() {
  const tracks = [
    {
      id: "python",
      title: "Python Developer",
      description: "Learn Python from scratch. Master data structures, OOP, and more.",
    }
  ];

  return <OnboardingClient tracks={tracks} />;
}
