//This is an example of a pinia store which works well for Composition-API

import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { Note } from "@/models";
import { ApiService } from "@/services";
const useNotesStore = defineStore("notesStore", () => {
  //the state
  const noteArr: Note[] = [];
  const notes = ref(noteArr);

  //the actions
  const addNote = (newNote: string) => {
    notes.value.push({ id: notes.value.length, title: newNote });
  };
  const deleteNote = (id) => {
    notes.value = notes.value.filter((note) => note.id !== id);
  };

  //this is just an example for using the apiservice
  const getArticles = async () => {
    const apiService: ApiService = new ApiService("http://www.example.com");
    try {
      const result = await apiService.getData("/json");
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  ///the getters
  const getFirstNote = computed(() => {
    return notes.value[0];
  });

  return {
    notes,
    deleteNote,
    addNote,
    getFirstNote,
    getArticles,
  };
});

export default useNotesStore;
