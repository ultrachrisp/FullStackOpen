import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({value}) => <h1>{value}</h1>;
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);
const Statistic = ({name, value}) => <tr> <td>{name}</td> <td>{value}</td> </tr>;
const Statistics = ({clicks}) => {
    const {good, neutral, bad} = clicks,
          all = good + neutral + bad,
          average = ((good - bad) / all).toFixed(1),
          positive = (good / all * 100).toFixed(1) + " %";

    if(all <= 0){
        return (
            <>
                <Header value='statistics' />
                <p>No feedback given</p>
            </>
        );
    }
    
    return (
        <>
            <Header value='statistics' />
            <table>
                <Statistic name='good' value={good} />
                <Statistic name='neutral' value={neutral} />
                <Statistic name='bad' value={bad} />
                <Statistic name='all' value={all} />
                <Statistic name='average' value={average} />
                <Statistic name='positive' value={positive} />
            </table>
        </>
    );
};

const App = () => {
    const [clicks, setClicks] = useState({ good: 0, neutral: 0, bad: 0 });

    const handleGoodClick = () => setClicks({...clicks, good: clicks.good + 1}),
          handleNeautralClick = () => setClicks({...clicks, neutral: clicks.neutral + 1}),
          handleBadClick = () => setClicks({...clicks, bad: clicks.bad + 1});
    
  return (
    <>
        <Header value='give feedback' />
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeautralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
        <Statistics clicks={clicks} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root') );
