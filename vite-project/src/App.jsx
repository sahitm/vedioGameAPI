import { useState } from 'react'
import React from 'react';
import useSWR from 'swr'

import './App.css'
import { useEffect } from 'react';

const fetcher = (...args) => {
fetch(...args).then((res => res.json()))
}

function App() {

  const [gameTitle, setGameTitle] = useState('')
  const [searchGames,setSearchGames] = useState([])

  const {data,error} = useSWR('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=3',fetcher)

  const searchGame = () => {

    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
    .then(res => res.json())
    .then(data => setSearchGames(data))
    console.log(searchGames)
  }

  return (
    <div className="App">
      <div className="searchSection">
        <h1>Search for a Game</h1>
        <input type="text" placeholder='Minecraf...' onChange={(event) => {setGameTitle(event.target.value)}}/>
        <button onClick={searchGame}>Search Game Title</button>
        <div className="games">
            {searchGames.map((item,key) => {
              return <div key={key} className="game"> 
                        {item.external}
                        <img src={item.thumb} alt="" />
                        {item.cheapest}
                      </div>
            })}
        </div>
      </div>
      <div className="dealsSection">
        <h1>Latest Deals</h1>
        <div className="games">
        { data && data.map((item,key) => {
              return <div className="game" id="ideals" key={key}> 
                      <h3>{item.title}</h3>
                      <p>Normal price:{item.normalPrice}</p>
                      <p>Deal price:{item.salePrice}</p>
                      <h3>You save {item.savings.substr(0,2)}% </h3>
                      </div>})}
        </div>
      </div>
    </div>  
  )
}

export default App
