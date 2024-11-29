export interface Book {
    id: number;
    name: string;
    children?: Book[];
    notes: Note[];
}

export interface Note {
    id: number;
    title: string;
    book: Book;
}