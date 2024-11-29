package com.cha.cnote.domain.note.entity;

import com.cha.cnote.domain.note.dto.NoteDto;
import com.cha.cnote.domain.notebook.entity.Book;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;

    @ManyToOne
    private Book book;

    public void setBook(Book book) {
        this.book = book;
    }

    public NoteDto toDto() {
        return NoteDto.builder()
                .id(this.id)
                .title(this.title)
                .content(this.content)
                .build();
    }
}
