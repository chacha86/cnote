package com.cha.cnote.domain.note.controller;

import com.cha.cnote.domain.note.dto.NoteDto;
import com.cha.cnote.domain.note.entity.Note;
import com.cha.cnote.domain.note.service.NoteService;
import com.cha.cnote.global.ResData;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class NoteApiV1Controller {

    private final NoteService noteService;

    public record UpdateReqDto(String title, String content){}
    @PutMapping("/{id}")
    public ResData<NoteDto> update(@PathVariable long id, @RequestBody UpdateReqDto updateReqDto) {

        Note note = noteService.update(id, updateReqDto.title, updateReqDto.content);
        return new ResData<>("노트 수정 성공", "200003", note.toDto());
    }
}
