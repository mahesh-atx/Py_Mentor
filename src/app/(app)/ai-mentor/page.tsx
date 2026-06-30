import { UserService } from "@/lib/services/user.service";
import { AIChatService } from "@/lib/services/ai-chat.service";
import AIMentorClient from "./ai-mentor-client";

export default async function AIMentorPage() {
  const user = await UserService.getLocalUser();
  const history = await AIChatService.getChatHistory(user.id);
  
  // Create a default chat if none exists, or just pass the most recent chat's messages
  let activeChat = history[0];
  if (!activeChat) {
    activeChat = await AIChatService.createChat(user.id, "General Session");
    // Insert initial AI message
    await AIChatService.addMessage(
      activeChat.id, 
      "assistant", 
      "Hello! I'm your AI Mentor. I can help you understand concepts, review your code, or debug errors. What are you working on today?"
    );
    // Refetch history
    const updatedHistory = await AIChatService.getChatHistory(user.id);
    activeChat = updatedHistory[0];
  }

  return (
    <AIMentorClient 
      chatId={activeChat.id} 
      initialMessages={activeChat.messages} 
    />
  );
}
