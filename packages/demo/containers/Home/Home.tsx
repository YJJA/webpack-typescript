import * as React from 'react'

import Title from '../../components/Title'

class Home extends React.Component<any, any> {
  state = {
    title: 'this is Home Page!',
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
      </div>
    )
  }
}

export default Home
