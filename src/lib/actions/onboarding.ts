"use server";

import { db } from "@/lib/db/prisma";
import { UserService } from "@/lib/services/user.service";
import { revalidatePath } from "next/cache";
import { seedCurriculum } from "../../../prisma/seed";

export async function completeOnboarding(data: { name: string; avatarUrl: string; trackId: string }) {
  try {
    const user = await UserService.getLocalUser();

    // 1. Update User's basic profile
    await db.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        image: data.avatarUrl,
      },
    });

    // 2. Set the selected track
    await db.userMemory.upsert({
      where: {
        userId_key: {
          userId: user.id,
          key: "selected_track",
        }
      },
      update: {
        value: data.trackId,
      },
      create: {
        userId: user.id,
        key: "selected_track",
        value: data.trackId,
      }
    });

    // 3. Seed curriculum for the selected track
    try {
      await seedCurriculum(data.trackId as "python" | "javascript", true);
    } catch (seedError) {
      console.error("Failed to seed curriculum during onboarding:", seedError);
      // We don't fail the entire onboarding if seeding has a minor issue, 
      // but ideally we should let the user know. We'll proceed so they aren't stuck.
    }

    // 4. Mark onboarding as completed
    await db.userMemory.upsert({
      where: {
        userId_key: {
          userId: user.id,
          key: "onboarding_completed",
        }
      },
      update: {
        value: "true",
      },
      create: {
        userId: user.id,
        key: "onboarding_completed",
        value: "true",
      }
    });

    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error("Error saving onboarding state:", error);
    return { success: false, error: "Failed to complete onboarding." };
  }
}
