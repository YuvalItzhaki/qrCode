import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import useNotesStore from "../../../src/stores/notesStore";
describe("Notes Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it("addNote", () => {
    const noteStore = useNotesStore();

    expect(noteStore.notes.length).toBe(0);
    noteStore.addNote("firstnote");
    noteStore.addNote("secondnote");
    expect(noteStore.notes.length).toBe(2);
  });

  it("getFirstNote", () => {
    const noteStore = useNotesStore();
    noteStore.addNote("firstNote");
    expect(noteStore.getFirstNote === noteStore.notes[0]);
  });
  it("deleteNote", () => {
    const noteStore = useNotesStore();
    noteStore.addNote("firstNote");
    noteStore.addNote("secondNote");
    noteStore.addNote("thirdNote");
    noteStore.deleteNote(1);
    expect(noteStore.notes.length).toBe(2);
  });
});
