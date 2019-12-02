import React, { Component } from 'react'
import Header from './containers/header/index'
import Footer from './containers/footer/index'
import Dashbord from './containers/dashbord'
import './App.scss'


interface IState {
  error: boolean
}

class App extends Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: false
    }
  }

  componentDidCatch( error: Error, info: {} ) {
    this.setState({ error: true })
  }

  render() {
    if(this.state.error) return <div>Error!</div>
    
    return(
      <div className="app">
        <Header />
        <Dashbord />
        <Footer />
      </div>
    )
  }
} export default App
