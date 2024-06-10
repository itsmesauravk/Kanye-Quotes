import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const QuoteList = ({ quotes, handleQuoteClick }) => (
  <div className="quotes-list">
    {quotes.map((quoteObj, index) => (
      <div key={index} onClick={() => handleQuoteClick(quoteObj.quote)}>
        {quoteObj.quote}
      </div>
    ))}
  </div>
);


const QuoteDetails = ({ selectedQuote }) => (
  <div className="quote-details">
    
    <h1>{selectedQuote}</h1>
  </div>
);

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState('');

  // Fetch quotes from the backend API
  const fetchQuotes = async (num) => {
    try {
      const { data } = await axios.get('/api/quotes',{
        params: {
          count: num
        }
      });
      setQuotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const num = 5;
  // Fetch quotes on component mount
  useEffect(() => {
    fetchQuotes(num);
  }, []);

  const handleRefresh = () => {
    fetchQuotes(num);
  };

  const handleQuoteClick = (quote) => {
    setSelectedQuote(quote);
  };

  return (
    <div className="App">
      <h1>Kanye West Quotes</h1>
      <button onClick={handleRefresh}>Refresh Quotes</button>
      <QuoteList quotes={quotes} handleQuoteClick={handleQuoteClick} />
      <h2>Quote Details:</h2><p><i>(Select any quote above)</i></p>
      {selectedQuote && <QuoteDetails selectedQuote={selectedQuote} />}
    </div>
  );
};

export default App;
