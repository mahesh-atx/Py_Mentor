import { db } from "@/lib/db";

export const AIChatService = {
  async getChatHistory(userId: string) {
    return db.aIChat.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "asc" }
        }
      }
    });
  },

  async getChat(chatId: string) {
    return db.aIChat.findUnique({
      where: { id: chatId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" }
        }
      }
    });
  },

  async createChat(userId: string, title?: string, context?: string) {
    return db.aIChat.create({
      data: {
        userId,
        title: title || "New Chat",
        context
      }
    });
  },

  async addMessage(chatId: string, role: string, content: string, code?: string) {
    const message = await db.aIChatMessage.create({
      data: {
        chatId,
        role,
        content,
        code
      }
    });

    // Update the chat's updatedAt timestamp
    await db.aIChat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() }
    });

    return message;
  },
  
  async deleteChat(chatId: string) {
    return db.aIChat.delete({
      where: { id: chatId }
    });
  }
};
