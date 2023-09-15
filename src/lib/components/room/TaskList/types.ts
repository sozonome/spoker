import type { Task } from '~/lib/types/RawDB';

export type UpsertStoryForm = Pick<Task, 'name' | 'description'>;

export type SortableTaskItem = Task & {
  selected?: boolean;
  chosen?: boolean;
  filtered?: boolean;
};
