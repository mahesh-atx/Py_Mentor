import { db } from "@/lib/db";

export const MemoryService = {
  /**
   * Get a specific memory key for a user
   */
  async getMemory(userId: string, key: string) {
    const memory = await db.userMemory.findUnique({
      where: { userId_key: { userId, key } }
    });
    
    if (!memory) return null;
    
    try {
      return JSON.parse(memory.value);
    } catch (e) {
      return memory.value; // Return raw string if not JSON
    }
  },

  /**
   * Set a specific memory key for a user
   * Handles both creation and updating
   */
  async setMemory(userId: string, key: string, value: any) {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    
    return db.userMemory.upsert({
      where: { userId_key: { userId, key } },
      update: { value: stringValue },
      create: { userId, key, value: stringValue }
    });
  },
  
  /**
   * Get all memory for a user
   */
  async getAllMemories(userId: string) {
    const memories = await db.userMemory.findMany({
      where: { userId }
    });
    
    // Convert array of {key, value} to a single object map
    return memories.reduce((acc, curr) => {
      try {
        acc[curr.key] = JSON.parse(curr.value);
      } catch (e) {
        acc[curr.key] = curr.value;
      }
      return acc;
    }, {} as Record<string, any>);
  },
  
  /**
   * Delete a specific memory key
   */
  async deleteMemory(userId: string, key: string) {
    try {
      await db.userMemory.delete({
        where: { userId_key: { userId, key } }
      });
      return true;
    } catch (e) {
      return false; // Key didn't exist
    }
  }
};
