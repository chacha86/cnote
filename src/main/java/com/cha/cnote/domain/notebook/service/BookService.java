package com.cha.cnote.domain.notebook.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    public List<BookDto> getGroupList() {
        List<Book> bookList = bookRepository.findByParentBookIsNull();

        List<BookDto> bookDtoList = new ArrayList<>();

        for (Book book : bookList) {
            bookDtoList.add(book.toDto());
        }

        return bookDtoList;
    }

    public Book write() {

        Book book = Book.builder()
                .name("book1")
                .build();

        return bookRepository.save(book);
    }
}
