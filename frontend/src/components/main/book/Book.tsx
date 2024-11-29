"use client";
import { Book } from "@/types/Book";
import { useEffect, useState } from "react";

export default function BookComponent({
  books,
  selectedBook,
  changeBook,
}: {
  books: Book[];
  selectedBook: Book;
  changeBook: (book: Book) => void;
}) {
  return (
    <div className="w-[15%] border-r-2 h-full">
      <ul>
        {books.map((book) => {
          const isSelected = selectedBook.id === book.id;

          return (
            <li
              key={book.id}
              onClick={() => {
                changeBook(book);
              }}
            >
              <div
                className={`p-4 mb-2 border rounded shadow hover:bg-gray-400 hover:cursor-pointer ${
                  isSelected ? "bg-gray-300" : ""
                }`}
              >
                {book.name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
