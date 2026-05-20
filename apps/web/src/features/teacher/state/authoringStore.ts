import { useSyncExternalStore } from "react";
import {
  INITIAL_ASSIGNMENTS,
  INITIAL_COURSES,
  INITIAL_QUIZZES,
  type Assignment,
  type Course,
  type Quiz,
} from "../data/authoring";

const STORAGE_KEY = "sols.teacher.authoring.v1";

type State = {
  courses: Course[];
  quizzes: Quiz[];
  assignments: Assignment[];
};

const defaultState: State = {
  courses: INITIAL_COURSES,
  quizzes: INITIAL_QUIZZES,
  assignments: INITIAL_ASSIGNMENTS,
};

function load(): State {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      courses: parsed.courses ?? defaultState.courses,
      quizzes: parsed.quizzes ?? defaultState.quizzes,
      assignments: parsed.assignments ?? defaultState.assignments,
    };
  } catch {
    return defaultState;
  }
}

let state: State = load();
const listeners = new Set<() => void>();

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => state;

export function useAuthoringStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(getSnapshot()),
    () => selector(defaultState)
  );
}

const uid = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const authoringActions = {
  addCourse(input: Omit<Course, "id" | "createdAt">): Course {
    const c: Course = { ...input, id: uid("c"), createdAt: Date.now() };
    state = { ...state, courses: [c, ...state.courses] };
    emit();
    return c;
  },
  removeCourse(id: string) {
    state = { ...state, courses: state.courses.filter((c) => c.id !== id) };
    emit();
  },

  addQuiz(input: Omit<Quiz, "id" | "createdAt">): Quiz {
    const q: Quiz = { ...input, id: uid("q"), createdAt: Date.now() };
    state = { ...state, quizzes: [q, ...state.quizzes] };
    emit();
    return q;
  },
  toggleQuizPublished(id: string) {
    state = {
      ...state,
      quizzes: state.quizzes.map((q) =>
        q.id === id ? { ...q, published: !q.published } : q
      ),
    };
    emit();
  },
  removeQuiz(id: string) {
    state = { ...state, quizzes: state.quizzes.filter((q) => q.id !== id) };
    emit();
  },

  addAssignment(input: Omit<Assignment, "id" | "createdAt">): Assignment {
    const a: Assignment = { ...input, id: uid("a"), createdAt: Date.now() };
    state = { ...state, assignments: [a, ...state.assignments] };
    emit();
    return a;
  },
  toggleAssignmentPublished(id: string) {
    state = {
      ...state,
      assignments: state.assignments.map((a) =>
        a.id === id ? { ...a, published: !a.published } : a
      ),
    };
    emit();
  },
  removeAssignment(id: string) {
    state = {
      ...state,
      assignments: state.assignments.filter((a) => a.id !== id),
    };
    emit();
  },
};
