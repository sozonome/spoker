import type { Task } from "lib/types/RawDB";

export type SubmitStoryForm = Pick<Task, "name" | "description">;
