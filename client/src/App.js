import React, { Component } from 'react';
import './App.css';
import TopSellingBooks from './components/TopSelling/TopSellingBooks';
import TopSellingClothing from './components/TopSelling/TopSellingClothing';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderedResponse: []
    }
  }

  getResponse = async () => {
    fetch("http://localhost:5000/api/response")
    .then((res) => {
      return res.json();
    })
      .then((data) => {
          this.setState({
            renderedResponse : data
          })
      })
     
      .catch(err => err);
      // console.log(this.state.renderedResponse);
  }

  componentDidMount() {
    this.getResponse();
  }
  


  render() {
const datas = this.state.renderedResponse
   const datasList = datas.length ? (datas.map(data => {
    return (
<div className="App">
      

        
        <TopSellingBooks key = {data.Book_ID} data={data}/>
        {console.log(data.Book_ID)}
        {/* <TopSellingClothing /> */}
       
      </div>
    ) 
  })) : (<h1>Loading</h1>)

    return (
<div>
       {datasList}
       
       </div> 
    ) 
  }
}

export default App;
