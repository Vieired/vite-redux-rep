export interface Lesson {
    id: string;
    title: string;
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface Video {
    activeLesson: number|null,
    activeModule: number|null;
    modules: Module[];
}
  