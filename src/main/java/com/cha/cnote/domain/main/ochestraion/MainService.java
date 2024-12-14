package com.cha.cnote.domain.main.ochestraion;

import com.cha.cnote.domain.main.note.entity.Note;
import com.cha.cnote.domain.main.note.service.NoteService;
import com.cha.cnote.domain.main.notebook.entity.Book;
import com.cha.cnote.domain.main.notebook.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {
    private final BookService bookService;
    private final NoteService noteService;

    public Note saveDefaultNote(long bookId) {
        Book book = bookService.getOne(bookId);
        return noteService.writeDefault(book);
    }

    public List<Note> getNoteList(long bookId) {
        return noteService.getListByBookId(bookId);
    }
}
