import React from 'react'
import axios from 'axios'
import {Component} from 'react';
import { Card, Button, CardGroup } from 'react-bootstrap';
import AudioFile from "./AudioFile"
import PdfFile from "./PdfFile"
import { Switch, Route } from 'react-router-dom';

export default class SearchResult extends Component {
    constructor(props){
        super(props);
        this.state={
        allBooks:[]
        }
    }
    componentDidMount(){
        let apiSearchEndPoint = 'http://localhost:8050/books';

        axios.get(apiSearchEndPoint)
        .then(response =>response.data)
        .then((data)=>{
            this.setState({allBooks:data})


        })
    }

  
    render(){
        return( 
        <div>
            <h3>Search Results page </h3>
            {console.log(this.state.allBooks.length)}
            {this.state.allBooks.length === 0 ? 
                <h6>"Oops, we did not find any matches for that</h6> : 
            
                <ul className = "search-result-ul">
                    {this.state.allBooks.map((book, index) => (
                    <div>
                        <li>
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                    <Card.Text>
                        {book.description}
                    </Card.Text>
                    {book.format.includes('audio file') ? <Card.Link exact activeClassName="current" to='/audio'>Audio Book</Card.Link> : null}
                    {book.format.includes('PDF') ? <Card.Link exact activeClassName="current" to='/pdf'>Pdf Book</Card.Link> : null}
                  
{/* 
                    {book.format.includes('audio file') && <AudioFile/>}
                    {book.format.includes('PDF') && <PdfFile/>} */}
                    
                
                    </Card.Body>
                </Card>
                <div>
                    <br/>
                </div>
                </li>
                </div>
                    ))}
                </ul>
                }
        </div>
        );
    }
}
    const Audio = () => (
        <AudioFile/>
      );
    const Pdf=()=>(
        <PdfFile/>
    )
    const Main = () => (
        <Switch>
         
          <Route exact path='/audio' component={Audio}></Route>
          <Route exact path='/pdf' component={Pdf}></Route>

        </Switch>
      );

