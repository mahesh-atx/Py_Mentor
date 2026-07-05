// Mock auth module to resolve the "@/auth" import error
// Replace this with actual NextAuth implementation when ready

export const auth = async () => {
  // Return a mock session for development purposes
  return {
    user: {
      id: "clq3p6f4w000008l4f6d4d1d1", // Example CUID matching Prisma schema format
      name: "Test User",
      email: "test@example.com"
    }
  };
};
