import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);


const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const average = good - bad;

    if (total ===0) {
        return (
            <div>
                <h2>statistics</h2>
                <p>No feedback given</p>
            </div>
        );
    }

    return (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <Statistic text='good' value={good} />
                    <Statistic text='neutral' value={neutral} />
                    <Statistic text='bad' value={bad} />
                    <Statistic text='total' value={total} />
                    <Statistic text='average' value={average / total} />
                    <Statistic text='positive' value={`${100 * good / total} %`} />
                </tbody>
            </table>
        </div>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h2>give feedback</h2>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <Statistics good={good} bad={bad} neutral={neutral} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
