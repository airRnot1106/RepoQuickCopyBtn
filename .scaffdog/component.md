---
name: "component"
root: "src"
output: ["**/components/{base,case,domain/*}", "**/_components"]
ignore: []
questions:
  granularity:
    message: "Please select a granularity of component"
    choices:
      - "atoms"
      - "molecules"
  component_name: "Please input a name of component"
  required_storybook:
    confirm: "Do you need to create a storybook?"
---

# Variables

- granularity: {{ inputs.granularity }}
- component_name: {{ inputs.component_name | pascal }}

# `{{ granularity }}/{{ component_name }}.tsx`

```tsx
type {{ component_name }}PresenterProps = {

};

export const {{ component_name}}Presenter = ({

}: {{ component_name }}PresenterProps) => {
  return (
    <div>

    </div>
  );
};

type {{ component_name }}Props = {

};

export const {{ component_name }} = ({

}: {{ component_name }}Props) => {
  return (
    <{{ component_name }}Presenter />
  );
};

```

# `{{ inputs.required_storybook || "!" }}{{ granularity }}/{{ component_name }}.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: {{ component_name }},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof {{ component_name }}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

```
