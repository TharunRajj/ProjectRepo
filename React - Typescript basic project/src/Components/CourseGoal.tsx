import { ReactNode } from 'react';
export default function CourseGoal({
  id,
  title,
  deleteGoal,
  children,
}: {
  id: number;
  title: string;
  deleteGoal: (id: number) => void;
  children: ReactNode;
}) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button onClick={() => deleteGoal(id)}>Delete</button>
    </article>
  );
}
