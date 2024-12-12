package com.cha.cnote.domain.notebook.controller;

import com.cha.cnote.domain.MainService;
import com.cha.cnote.domain.note.dto.NoteDto;
import com.cha.cnote.domain.note.entity.Note;
import com.cha.cnote.domain.notebook.dto.BookDto;
import com.cha.cnote.global.ResData;
import com.cha.cnote.domain.notebook.service.BookService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor
public class BookApiV1Controller {

    private final BookService bookService;
    private final MainService mainService;

    @GetMapping("")
    public ResData<List<BookDto>> list() {
        List<BookDto> books = bookService.getGroupList();
        return new ResData<>("노트북 목록 가져오기 성공", "200000", books);
    }

    @GetMapping("/{id}")
    public ResData<BookDto> getBook(@PathVariable Long id) {

        BookDto bookDto = bookService.getOne(id).toDto();
        return new ResData<>("노트북 가져오기 성공", "200000", bookDto);
    }
    @PostMapping("")
    public ResData<BookDto> writeDefaultBook() {
        return new ResData<>("기본 노트북 생성 성공", "200001", bookService.writeDefault().toDto());
    }

    @GetMapping("/{bookId}/notes")
    public ResData<List<NoteDto>> getNoteList(@PathVariable long bookId) {
        List<Note> noteList = mainService.getNoteList(bookId);
        List<NoteDto> noteDtoList = noteList.stream().map(Note::toDto).toList();

        return new ResData<>("노트 가져오기 성공", "200000", noteDtoList);
    }

    @PostMapping("/{bookId}/notes")
    public ResData<NoteDto> writeDefaultNote(@PathVariable long bookId) {
        return new ResData<>("기본 노트 생성 성공", "200001", mainService.saveDefaultNote(bookId).toDto());
    }
}

