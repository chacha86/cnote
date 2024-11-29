package com.cha.cnote.domain.notebook.controller;

import com.cha.cnote.domain.notebook.dto.BookDto;
import com.cha.cnote.global.ResponseData;
import com.cha.cnote.domain.notebook.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor
public class BookApiV1Controller {

    private final BookService bookService;
    @GetMapping("")
    public ResponseData<List<BookDto>> list() {
        List<BookDto> books = bookService.getGroupList();
        return new ResponseData<>("노트북 목록 가져오기 성공", "200001", books);
    }

    @GetMapping("/{id}")
    public ResponseData<BookDto> getOneItem(@PathVariable Long id) {

        BookDto bookDto = bookService.getOne(id).toDto();
        return new ResponseData<>("노트북 가져오기 성공", "200002", bookDto);
    }
}
