package com.cha.cnote.domain.notebook.service;

import com.cha.cnote.domain.notebook.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;
}
