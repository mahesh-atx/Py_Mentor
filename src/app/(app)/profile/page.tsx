import { UserService } from "@/lib/services/user.service";
import { ProgressService } from "@/lib/services/progress.service";
import { ProfileClient } from "./profile-client";

export default async function ProfilePage() {
  const user = await UserService.getLocalUser();
  const stats = await ProgressService.getStats(user.id);

  return (
    <ProfileClient 
      user={user}
      stats={{
        level: stats.level,
        totalXp: stats.totalXp,
        completedLessons: stats.completedLessons,
        currentStreak: stats.currentStreak
      }}
    />
  );
}

