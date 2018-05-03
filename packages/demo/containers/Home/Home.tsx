import * as React from 'react'

import Title from '../../components/Title'

class Home extends React.Component<any, any> {
  state = {
    title: 'this is HomePage!',
    visible: false,
    abc: true
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
