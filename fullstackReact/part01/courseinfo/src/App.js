const Header = ({title}) => {
  return (
    <>
      <h1>
        {title}
      </h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.name}: {props.exercises}
      </p>
    </>
  )
}

const Content = ({content}) => {
  return (
    <>
      <Part name={content[0].name} exercises={content[0].exercises}/>
      <Part name={content[1].name} exercises={content[1].exercises}/>
      <Part name={content[2].name} exercises={content[2].exercises}/>
    </>
  )
}


const Total = ({total}) => {
  return (
    <>
      <p>Number of exercises: {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header title={course.name} />
      <Content content={course.parts}/>
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

export default App
