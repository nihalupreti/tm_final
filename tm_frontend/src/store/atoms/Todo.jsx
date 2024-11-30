import { atom, selector } from "recoil";

export const todoAtom = atom({
  key: "TodoAtom",
  default: [],
});

export const filterAtom = atom({
  key: "filterAtom",
  default: "",
});

export const filterTodo = selector({
  key: "filterTodo",
  get: ({ get }) => {
    const todos = get(todoAtom);
    const filter = get(filterAtom);
    return todos.filter(
      (todo) => todo.status === false && todo.title.includes(filter)
    );
  },
});
