package com.cha.cnote.domain.notebook.dto;

import com.cha.cnote.domain.note.dto.NoteDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class BookDto {
    private Long id;
    private String name;
    private List<BookDto> subBooks;
    private List<NoteDto> notes;
}
