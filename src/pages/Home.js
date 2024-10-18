import React, { useState } from 'react';
import Select from 'react-select';
import SymptomDropdown from './SymptomDropdown.js'; 

const Home = () => {
  const [symptoms, setSymptoms] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [suggestions, setSuggestions] = useState('');

  const handleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setSymptoms((prev) => `${prev} ${speechResult}`.trim());
      // Optionally, add logic here to match the speech result with dropdown options
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSymptomChange = (selectedOptions) => {
    setSelectedSymptoms(selectedOptions);
    setSymptoms(selectedOptions.map(option => option.label).join(', '));
  };

  const recommendations = suggestions ? suggestions : symptoms;

  return (
    <div style={styles.container}>
      <div style={styles.mainSection}>
        <h1 style={styles.header}>Health Care Center</h1>
        <div style={styles.card}>
          <SymptomDropdown setSuggestions={setSuggestions} />
          <input
            type="text"
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Type symptoms such as itching, sleeping, aching etc."
            style={styles.input}
          />
          <button
            onClick={handleSpeechRecognition}
            style={styles.button}
            disabled={isListening}
          >
            {isListening ? 'Listening...' : 'Start Speech Recognition'}
          </button>
          <button style={styles.button}>Predict</button>
          <div style={styles.recommendations}>
            <h3 style={styles.recommendationHeader}>Recommendations:</h3>
            <p style={styles.recommendationText}>{recommendations}</p>
          </div>
        </div>
      </div>

      <div style={styles.resultsSection}>
        <h2 style={styles.resultsHeader}>Our AI System Results</h2>
        <div style={styles.buttonGroup}>
          <button style={styles.resultButton}>Disease</button>
          <button style={styles.resultButton}>Description</button>
          <button style={styles.resultButton}>Precaution</button>
          <button style={styles.resultButton}>Medications</button>
          <button style={styles.resultButton}>Workouts</button>
          <button style={styles.resultButton}>Diets</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  mainSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '800px',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '10px',
    width: '100%',
  },
  recommendations: {
    marginTop: '20px',
  },
  recommendationHeader: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  recommendationText: {
    fontSize: '1rem',
    color: '#333',
  },
  resultsSection: {
    textAlign: 'center',
    marginTop: '30px',
    width: '100%',
    maxWidth: '800px',
  },
  resultsHeader: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  resultButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Home;
