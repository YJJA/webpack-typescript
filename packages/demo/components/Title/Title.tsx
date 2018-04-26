import * as React from 'react'

interface TitleProps {
  children: string
}

function Title(props: TitleProps) {
  return (
    <h1>{props.children}</h1>
  )
}

export default Title
