package com.cha.cnote.domain.main.notebook.service;

import com.cha.cnote.domain.main.note.service.NoteService;
import com.cha.cnote.domain.main.notebook.dto.BookDto;
import com.cha.cnote.domain.main.notebook.entity.Book;
import com.cha.cnote.domain.main.notebook.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final NoteService noteService;

    public List<BookDto> getGroupList() {
        List<Book> bookList = bookRepository.findByParentBookIsNull();

        List<BookDto> bookDtoList = new ArrayList<>();

        for (Book book : bookList) {
            bookDtoList.add(book.toDto());
        }

        return bookDtoList;
    }

    public Book writeDefault() {

        Book book = Book.builder().build();
        return bookRepository.save(book);
    }

    public Book getOne(Long id) {
        return bookRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 노트북이 존재하지 않습니다."));
    }
}
