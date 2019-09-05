import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({value}) => <h1>{value}</h1>;
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

const getRandomNum = (len) => Math.floor(Math.random() * len);

const vote = ({current, votes}) => {
    const copy = [...votes];
    copy[current] += 1;
    return copy;
};

const Statistics = ({selected}) => {    
    const {votes} = selected,
          topAnecdoteScore = Math.max(...votes),
          topAnecdote = votes.indexOf(topAnecdoteScore);
    
    if(topAnecdoteScore <= 0){
        return (
            <>
                <Header value='Anecdote with the most votes'/>
                <p>No votes yet</p>
            </>
        );
    }
    
    return (
        <>
            <Header value='Anecdote with the most votes'/>
            <div>{anecdotes[topAnecdote]}</div>
            <div>has {topAnecdoteScore} votes</div>
        </>
    );
};

const App = (props) => {
    const [selected, setSelected] = useState({
        current: getRandomNum(props.anecdotes.length),
        votes: [...Array(props.anecdotes.length)].map(() => 0)});

    const handleNextAnecdote = () => setSelected({...selected, current: getRandomNum(props.anecdotes.length)});
    const handleVote = () => setSelected({...selected, votes: vote(selected)});

    return (
        <>
            <Header value='Anecdote of the day' />
            <p>{props.anecdotes[selected.current]}</p>
            <Button onClick={handleVote} text='vote' />
            <Button onClick={handleNextAnecdote} text='next anecdote' />
            <Statistics selected={selected} />
        </>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render( <App anecdotes={anecdotes} />, document.getElementById('root') );
