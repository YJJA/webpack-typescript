import * as React from 'react'

import Title from '../../components/Title'

type State = {
  title: string,
  visible: boolean
}

class Home extends React.Component<any, State> {
  state = {
    title: 'this is HomePage!',
    visible: false
  }

  onVisible = () : void => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    return (
      <div>
        <Title>{this.state.title}</Title>
        <p>this is context</p>
      </div>
    )
  }
}

export default Home
