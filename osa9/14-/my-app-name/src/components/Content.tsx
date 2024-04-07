import { Part } from './Part';
import { CoursePart } from '../types';

interface CourseProps {
  courseParts: CoursePart[];
}

export const Content = ({ courseParts }: CourseProps) => {
  return (
    <div>
      {courseParts.map((course, index) => {
        return <Part coursePart={course} key={index} />;
      })}
    </div>
  );
};
