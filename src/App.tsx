import React, {useState} from 'react';
import './App.css';
import {queryWolframAlpha} from "./WolframAlpha.connector";

function App() {
  const [categoryInfo, setCategoryInfo] = useState('')

    const loadCategory = (category = 'best actress', year = 2020) => {
      queryWolframAlpha(category, year).then(setCategoryInfo).catch(setCategoryInfo)
    }

  return (
    <div className="App">
      <AppHeader />
      <button onClick={() => loadCategory()}>Get Random Category</button>
        <Nominees categoryInfo={categoryInfo} />
    </div>
  );
}

function AppHeader() {
  return (
    <header className="App-header">
      <h1>Random Oscars</h1>
      <p>Hit the button to get a random Oscar category from a random year</p>
    </header>
  )
}

function Nominees(props: {categoryInfo: string}) {
    const nominees = props.categoryInfo.length ? props.categoryInfo.split('\n') : [];
    nominees.shift();
    return (
        <section>
            <ul>
                {nominees.map(nominee => (<li key={nominee}>{nominee}</li>))}
            </ul>
        </section>
    )
}

export default App;
