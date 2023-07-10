import React from 'react'

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
      {content.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises}/>
      ))}
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

const Course = ({course}) => {
  return (
    <>
      <Header title={course.name} />
      <Content content={course.parts}/>
      <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </>
  )
}

export default Course
