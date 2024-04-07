interface TotalProps {
  totalExercises: number;
}

export const Total = (props: TotalProps) => {
  return (
    <div>
      <p>Number of exercises {props.totalExercises}</p>
    </div>
  );
};
