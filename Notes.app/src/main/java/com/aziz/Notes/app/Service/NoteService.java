package com.aziz.Notes.app.Service;

import com.aziz.Notes.app.Entity.Note;
import com.aziz.Notes.app.Repository.NoteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getAllNotes(String search) {
        if (search == null || search.isBlank()) {
            return noteRepository.findAllByOrderByUpdatedAtDesc();
        }

        String keyword = search.trim();

        return noteRepository
                .findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByUpdatedAtDesc(
                        keyword,
                        keyword
                );
    }

    public Note getNoteById(Long id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Note introuvable avec l'identifiant : " + id
                ));
    }

    public Note createNote(Note note) {
        note.setId(null);
        return noteRepository.save(note);
    }

    public Note updateNote(Long id, Note newNote) {
        Note existingNote = getNoteById(id);

        existingNote.setTitle(newNote.getTitle());
        existingNote.setContent(newNote.getContent());

        return noteRepository.save(existingNote);
    }

    public void deleteNote(Long id) {
        Note existingNote = getNoteById(id);
        noteRepository.delete(existingNote);
    }
}