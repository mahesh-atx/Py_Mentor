/**
 * NotesService
 * 
 * Manages user notes and bookmarks.
 */

import { db } from "@/lib/db";

export const NotesService = {
  /** Create a note */
  async createNote(userId: string, content: string, module?: string, lessonRef?: string) {
    return db.note.create({
      data: { userId, content, module, lessonRef },
    });
  },

  /** Get all notes for a user */
  async getNotes(userId: string) {
    return db.note.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  /** Update a note */
  async updateNote(noteId: string, content: string) {
    return db.note.update({
      where: { id: noteId },
      data: { content },
    });
  },

  /** Delete a note */
  async deleteNote(noteId: string) {
    return db.note.delete({ where: { id: noteId } });
  },

  /** Toggle a bookmark */
  async toggleBookmark(userId: string, title: string, type: string, targetId: string, module?: string) {
    const existing = await db.bookmark.findUnique({
      where: { userId_targetId: { userId, targetId } },
    });

    if (existing) {
      await db.bookmark.delete({ where: { id: existing.id } });
      return { bookmarked: false };
    }

    await db.bookmark.create({
      data: { userId, title, type, targetId, module },
    });
    return { bookmarked: true };
  },

  /** Get all bookmarks for a user */
  async getBookmarks(userId: string) {
    return db.bookmark.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },
};
