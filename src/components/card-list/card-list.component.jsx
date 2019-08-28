// @view
import React, { Component } from 'react';
import { Card } from '../card/card.component'
const numberPage = 12;
export default class CardLis extends Component{
    constructor(){
        super();
        this.state={
          dataGiphy:[],
          paginate: 0,
          disable:true
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData =()=>{
        fetch(`http://api.giphy.com/v1/stickers/search?q=pet&limit=${numberPage}&offset=${this.state.paginate}&api_key=aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB`)
        .then(response=>response.json())
        .then(resp=>this.setState({dataGiphy:resp.data}))
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
            <div className="card-list">
                {
                    dataGiphy.map(resp=><Card key={resp.id} giphy={resp} />)
                }
            </div>
        )
    }
}