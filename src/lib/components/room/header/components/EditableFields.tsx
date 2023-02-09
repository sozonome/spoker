import type React from 'react';

import AutoResizeTextarea from '~/lib/components/shared/AutoResizeTextarea';
import type { Task } from '~/lib/types/RawDB';

type EditableFieldsProps = {
  name?: string;
  description?: string;
  handleUpdateTask: (
    field: keyof Task
  ) => (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const EditableFields = ({
  name,
  description,
  handleUpdateTask,
}: EditableFieldsProps) => {
  return (
    <>
      <AutoResizeTextarea
        label="Name"
        value={name}
        onChange={handleUpdateTask('name')}
        placeholder="Going to Mars"
      />
      <AutoResizeTextarea
        label="Description"
        value={description}
        onChange={handleUpdateTask('description')}
        placeholder="Land to Moon first"
      />
    </>
  );
};

export default EditableFields;
