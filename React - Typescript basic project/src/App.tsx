import { useState } from 'react';
import Header from './Components/Header';
import goalsImg from './assets/goals.jpg';
import CourseGoalList from './Components/CourseGoalList';
import NewGoal from './Components/NewGoal';

export type CourseGoal = {
  title: string;
  description: string;
  id: number;
};
export default function App() {
  const [goals, setGoals] = useState<CourseGoal[]>([]);

  const handleAddGoal = (goal: string, summary: string) => {
    const newGoal: CourseGoal = {
      id: Math.random(),
      title: goal,
      description: summary,
    };
    setGoals((prevGoal) => {
      return [...prevGoal, newGoal];
    });
  };

  const handleDeleteGoal = (id: number) => {
    const newGoals = goals.filter((goal) => goal.id !== id);
    setGoals(newGoals);
  };

  return (
    <main>
      <Header image={{ src: goalsImg, alt: 'To list the goals' }}>
        <h1>Your Course Goals </h1>
      </Header>
      <NewGoal onAddGoal={handleAddGoal} />
      <CourseGoalList goals={goals} onDeleteGoal={handleDeleteGoal} />
    </main>
  );
}
