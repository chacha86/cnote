package com.cha.cnote.domain.notebook.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookApiController {

    private final BookService bookService;


    @PostMapping("")
    public ResponseData<Book> create() {
        Book newBook = bookService.create();
        return new ResponseData<>("", "", newBook);
    }

    @GetMapping("")
    public ResponseData<List<Book>> list() {
        List<Book> books = bookService.getItems();
        return new ResponseData<>("", "", books);
    }
}
