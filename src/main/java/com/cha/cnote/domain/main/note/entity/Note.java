package com.cha.cnote.domain.main.note.entity;

import com.cha.cnote.domain.main.note.dto.NoteDto;
import com.cha.cnote.domain.main.notebook.entity.Book;
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
    private String title = "no title..";
    @Column(columnDefinition = "TEXT")
    private String content;
    @Column(columnDefinition = "boolean default false")
    private boolean published;

    @ManyToOne
    @Setter
    private Book book;

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

    public void publish() {
        this.published = true;
    }

    public void cancelPublish() {
        this.published = false;
    }
}
