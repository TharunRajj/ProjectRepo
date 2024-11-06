import { FormEvent, useRef } from 'react';

type goalValues = {
  onAddGoal: (goal: string, summary: string) => void;
};
export default function NewGoal({ onAddGoal }: goalValues) {
  const goalRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const goal = goalRef.current!.value;
    const summary = summaryRef.current!.value;

    event.currentTarget.reset();
    onAddGoal(goal, summary);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <p>
        <label htmlFor="goal">Your Goal</label>
        <input id="goal" type="text" ref={goalRef} />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input id="summary" type="text" ref={summaryRef} />
      </p>
      <button>Add Goal</button>
    </form>
  );
}
