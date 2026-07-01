import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from './Entity/Note';
import { NoteService } from './Services/note.service';
import { AiService } from './Services/ai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  aiLoadingId: number | null = null;
  aiSummaries: Record<number, string> = {};
  notes: Note[] = [];

  noteForm!: FormGroup;

  searchControl = new FormControl('');

  editingId: number | null = null;

  loading = false;
  saving = false;
  errorMessage = '';

  constructor(
    private noteService: NoteService,
    private aiService: AiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(120)
        ]
      ],
      content: [
        '',
        [
          Validators.maxLength(5000)
        ]
      ]
    });

    this.loadNotes();
  }

  summarizeNote(note: Note): void {
  if (note.id === undefined) {
    return;
  }

  if (!note.content || !note.content.trim()) {
    this.errorMessage =
      'Cette note ne contient aucun contenu à résumer.';
    return;
  }

  this.aiLoadingId = note.id;
  this.errorMessage = '';

  this.aiService.summarizeNote(note).subscribe({
    next: (response) => {
      if (note.id !== undefined) {
        this.aiSummaries[note.id] = response.summary;
      }

      this.aiLoadingId = null;
    },

    error: (error) => {
      console.error('Erreur IA :', error);

      this.errorMessage =
        error?.error?.message ||
        'Impossible de générer le résumé avec l’IA.';

      this.aiLoadingId = null;
    }
  });
}
clearAiSummary(note: Note): void {
  if (note.id !== undefined) {
    delete this.aiSummaries[note.id];
  }
}

  loadNotes(): void {
    this.loading = true;
    this.errorMessage = '';

    const search = this.searchControl.value ?? '';

    this.noteService.getAllNotes(search).subscribe({
      next: (notes: Note[]) => {
        this.notes = notes;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);

        this.errorMessage =
          'Impossible de charger les notes. Vérifiez que le backend fonctionne.';

        this.loading = false;
      }
    });
  }

  saveNote(): void {
    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      return;
    }

    const note: Note = {
      title: this.noteForm.value.title.trim(),
      content: this.noteForm.value.content?.trim() ?? ''
    };

    this.saving = true;
    this.errorMessage = '';

    if (this.editingId === null) {
      this.noteService.createNote(note).subscribe({
        next: () => {
          this.resetForm();
          this.loadNotes();
          this.saving = false;
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'Erreur pendant l’ajout de la note.';
          this.saving = false;
        }
      });
    } else {
      this.noteService.updateNote(this.editingId, note).subscribe({
        next: () => {
          this.resetForm();
          this.loadNotes();
          this.saving = false;
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'Erreur pendant la modification.';
          this.saving = false;
        }
      });
    }
  }

  editNote(note: Note): void {
    if (note.id === undefined) {
      return;
    }

    this.editingId = note.id;

    this.noteForm.patchValue({
      title: note.title,
      content: note.content
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  deleteNote(note: Note): void {
    if (note.id === undefined) {
      return;
    }

    const confirmed = confirm(
      `Voulez-vous supprimer la note "${note.title}" ?`
    );

    if (!confirmed) {
      return;
    }

    this.noteService.deleteNote(note.id).subscribe({
      next: () => {
        if (this.editingId === note.id) {
          this.resetForm();
        }

        this.loadNotes();
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Impossible de supprimer la note.';
      }
    });
  }

  resetForm(): void {
    this.noteForm.reset({
      title: '',
      content: ''
    });

    this.editingId = null;
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.loadNotes();
  }
}
