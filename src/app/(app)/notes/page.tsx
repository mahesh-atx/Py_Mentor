import { UserService } from "@/lib/services/user.service";
import { NotesService } from "@/lib/services/notes.service";
import NotesClient from "./notes-client";

export default async function NotesPage() {
  const user = await UserService.getLocalUser();
  const notes = await NotesService.getNotes(user.id);
  const bookmarks = await NotesService.getBookmarks(user.id);

  return (
    <NotesClient initialNotes={notes} initialBookmarks={bookmarks} />
  );
}
