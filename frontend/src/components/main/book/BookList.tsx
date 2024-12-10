"use client";
import { Book } from "@/types/Book";

export default function BookComponent({
  books,
  createDefaultBook,
  selectedBook,
  changeBook,
}: {
  books: Book[];
  createDefaultBook: () => void;
  selectedBook: Book;
  changeBook: (book: Book) => void;
}) {

  return (
    <div className="min-w-min w-[15%] border-r-2 h-full overflow-auto">
      <div className="my-1 ml-1">
        <button className="px-3 rounded hover:bg-gray-300 bg-gray-200 border border-gray-400"
                onClick={createDefaultBook}>노트북 추가</button>
      </div>
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
                className={`p-4 mb-2 border rounded shadow overflow-hidden hover:bg-gray-400 hover:cursor-pointer ${
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
