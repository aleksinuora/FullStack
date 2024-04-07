import { CoursePart } from '../types';

interface PartProps {
  coursePart: CoursePart;
}

export const Part = (props: PartProps) => {
  const course: CoursePart = props.coursePart;
  const renderSwitch = () => {
    switch (course.kind) {
      case 'basic':
        return (
          <p>
            <b>
              {course.name} {course.exerciseCount}
            </b>
            <br />
            <i>{course.description}</i>
          </p>
        );
      case 'group':
        return (
          <p>
            <b>
              {course.name} {course.exerciseCount}
            </b>
            <br />
            group exercises: {course.groupProjectCount}
          </p>
        );
      case 'background':
        return (
          <p>
            <b>
              {course.name} {course.exerciseCount}
            </b>
            <br />
            <i>{course.description}</i>
            <br />
            background material: {course.backgroundMaterial}
          </p>
        );
      case 'special':
        return (
          <p>
            <b>
              {course.name} {course.exerciseCount}
            </b>
            <br />
            <i>{course.description}</i>
            <br />
            course requirements: {course.requirements.join(', ')}
          </p>
        );
    }
  };
  return <div>{renderSwitch()}</div>;
};
