import App from './App.view.js'
import NewCard from './card.view.js'
import List from './list.view.js'
import MyButtom from './buttom.view.js'
import Label from './textCount.view.js'
import { Flow } from '../useFlow.js'
import React from 'react'
//import CardList from '../components/card-list/card-list.component'
/*export default function AppLogic(props) {
  //console.log(ApiData.dataGiphy)
  return (
    <Flow>
      <App {...props} />
      <NewCard  label="Estes es mi texto"/>
    </Flow>
  )
}*/
const numberPage = 12;
class AppLogic extends React.Component{
  constructor(){
    super();
    this.state={
      dataGiphy:[],
      paginate: 0,
      totalItems:0,
      disable:true
    }
}
componentDidMount(){
    this.loadData();
}
loadData =()=>{
    fetch(`http://api.giphy.com/v1/stickers/search?q=pet&limit=${numberPage}&offset=${this.state.paginate}&api_key=aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB`)
    .then(response=>response.json())
    .then(resp=>this.setState({dataGiphy:resp.data,totalItems:resp.pagination.total_count}))
}  
changePage =(event)=>{
  const id = event.target.id;
  let page = id ==='prev' ? this.state.paginate - numberPage : this.state.paginate + numberPage;
  this.setState({
      paginate: page,
      disable: page === 0 ? true :false
  }, () => this.loadData());
}
  render(){
    const { dataGiphy } = this.state;
    return(
      <Flow>
      <App/>
      <List ancho="43vw">
        <Label count={`gif ${this.state.paginate + numberPage} of ${this.state.totalItems}`}/>
        <MyButtom onClick={this.changePage} disabled={this.state.disable} label="prev" id="prev"/>
        <MyButtom onClick={this.changePage} label="next" id="next"/>
      </List>
      <List ancho="85vw">
        {
          dataGiphy.map(resp=><NewCard key={resp.id} giphy={resp} imgUrl={resp.images.fixed_height.url} />)  
        }
      </List>
      
      </Flow>
    )
  }
}

export default AppLogic