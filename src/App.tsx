import { useState } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';

interface EntriesType {
  firstEntry: string,
  secondEntry: string,
}

function App() {
  const [entries, setEntries] = useState<EntriesType>({
    firstEntry: "",
    secondEntry: "",
  });

  const [result, setResult] = useState<string>("");

  const handleJourneyCalculation = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let route: string = "";
    
    if (entries.firstEntry && entries.secondEntry) {
      route = entries.firstEntry + "," + entries.secondEntry;
    } else if (entries.firstEntry && !entries.secondEntry) {
      route = entries.firstEntry;
    } else if (!entries.firstEntry && entries.secondEntry) {
      route = entries.secondEntry;
    }
    
    if (route) {
      await axios.get(`https://media.carecontrolsystems.co.uk/Travel/JourneyPlan.aspx?Route=${route}`).then((res: AxiosResponse) => {
        setResult(res.data);
      });
    } else {
      console.log("no route");
    }
  };

  const renderResult = () => (result && (
    <>
      <h1>Journey Information</h1>
      <h3>{result.split(',')[0]} minutes of travel time</h3>
      <h3>{result.split(',')[1].split(';')[0]} miles of travel</h3>
    </>
  ))

  return (
    <>
      <h1>Journey Entry</h1>
      <br />
      First Entry Point
      <br/>
      <input
        type="text"
        name="entry1"
        id="entry1"
        onChange={(e) => setEntries((prev) => {
          return {
            ...prev,
            firstEntry: e.target.value,
          }
        })}
      />
      <br />
      Second Entry Point
      <br/>
      <input 
        type="text" 
        name="entry2" 
        id="entry2" 
        onChange={(e) => 
          setEntries((prev) => {
            return {
              ...prev,
              secondEntry: e.target.value,
            }
          }
        )}
      />
      <br />

      <button onClick={handleJourneyCalculation}>Journey Calculation</button>

      <br />

      {renderResult()}
    </>
  );
}

export default App;
