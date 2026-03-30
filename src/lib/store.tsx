"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, Book } from "@/types";
import { generateUsers, generateBooks } from "@/lib/data";

interface StoreCtx {
  users: User[];
  books: Book[];
  addUser: (u: Omit<User, "id" | "joined" | "books">) => void;
  updateUser: (id: number, patch: Partial<User>) => void;
  deleteUser: (id: number) => void;
  addBook: (b: Omit<Book, "id" | "created">) => void;
  deleteBook: (id: number) => void;
  toast: string;
  showToast: (msg: string) => void;
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const u = generateUsers();
    setUsers(u);
    setBooks(generateBooks(u));
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }, []);

  const addUser = useCallback((u: Omit<User, "id" | "joined" | "books">) => {
    const newUser: User = {
      ...u,
      id: Date.now(),
      joined: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      books: 0,
    };
    setUsers(prev => [newUser, ...prev]);
    showToast(`${u.fname} ${u.lname} added successfully`);
  }, [showToast]);

  const updateUser = useCallback((id: number, patch: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...patch } : u));
  }, []);

  const deleteUser = useCallback((id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    setBooks(prev => prev.filter(b => b.userId !== id));
    showToast("User deleted");
  }, [showToast]);

  const addBook = useCallback((b: Omit<Book, "id" | "created">) => {
    const newBook: Book = {
      ...b,
      id: Date.now(),
      created: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setBooks(prev => [newBook, ...prev]);
    setUsers(prev => prev.map(u => u.id === b.userId ? { ...u, books: u.books + 1 } : u));
    showToast(`Book "${b.title}" created successfully`);
  }, [showToast]);

  const deleteBook = useCallback((id: number) => {
    const book = books.find(b => b.id === id);
    if (book) setUsers(prev => prev.map(u => u.id === book.userId ? { ...u, books: Math.max(0, u.books - 1) } : u));
    setBooks(prev => prev.filter(b => b.id !== id));
    showToast("Book deleted");
  }, [books, showToast]);

  return (
    <Ctx.Provider value={{ users, books, addUser, updateUser, deleteUser, addBook, deleteBook, toast, showToast }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
