package com.cha.cnote.domain.main.note.controller;

import com.cha.cnote.domain.main.note.dto.NoteDto;
import com.cha.cnote.domain.main.note.entity.Note;
import com.cha.cnote.domain.main.note.service.NoteService;
import com.cha.cnote.global.ResData;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notes")
public class NoteApiV1Controller {

    private final NoteService noteService;

    public record UpdateReqDto(String title, String content, boolean published){}
    @PutMapping("/{id}")
    public ResData<NoteDto> update(@PathVariable long id, @RequestBody UpdateReqDto updateReqDto) {

        Note note = noteService.update(id, updateReqDto.title, updateReqDto.content);
        return new ResData<>("노트 수정 성공", "200002", note.toDto());
    }

    @PatchMapping("/{id}")
    public ResData<NoteDto> publish(@PathVariable long id, @RequestBody UpdateReqDto updateReqDto) {

        Note note = noteService.handlePublish(id, updateReqDto.published);
        return new ResData<>("노트를 게시 했습니다.", "200003", note.toDto());
    }

    @GetMapping("")
    public ResData<List<NoteDto>> getItems() {
        List<Note> noteList = noteService.getPublishedList();
        List<NoteDto> noteDtoList = noteList.stream().map(Note::toDto).toList();

        return new ResData<>("노트 목록 가져오기 성공", "200000", noteDtoList);
    }

    @GetMapping("/{id}")
    public ResData<NoteDto> getItems(@PathVariable long id) {
        Note note = noteService.getOne(id);
        return new ResData<>("노트 가져오기 성공", "200000", note.toDto());
    }
}
