package com.cha.cnote.domain.note.dto;

import com.cha.cnote.domain.notebook.dto.BookDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoteDto {
    private Long id;
    private String title;
    private String content;
    private boolean published;
}
