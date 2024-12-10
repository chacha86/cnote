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
    @Column(columnDefinition = "TEXT")
    private String content;
    @Column(columnDefinition = "boolean default false")
    private boolean published;
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
                .published(this.published)
                .build();
    }

    public Note update(String title, String content) {
        this.title = title;
        this.content = content;
        return this;
    }

    public Note update(boolean published) {
        this.published = published;
        return this;
    }
}
