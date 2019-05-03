import React, {Component} from 'react';
import MatchList from './MatchList';

class Tournaments extends Component{
    constructor(){
        super();
        this.state = {tournaments: []}
    }

    componentDidMount(){
        this.loadMatches();
    }

    loadMatches = () => {
        // fetch('http://localhost:3001/api/getTournaments')
        //     .then(data => data.json())
        //     .then((res) => {
        //         this.setState({tournaments: res.data});
        //     })
    }

    render(){
        return (
            <div><h3>Coming soon</h3></div>       
        );
    }
}

export default Tournaments;