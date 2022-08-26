import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [games, setGames] = useState([]);
  const [newNames, setNewNames] = useState('');
  const [newPlayers, setNewPlayers] = useState('');
  const [newImages, setNewImages] = useState('');
  const [newDescriptions, setNewDescription] = useState('');
  const [updatedName, setUpdatedName]= useState('')
  const [updatedPlayers, setUpdatedPlayers]= useState('')
  const [updatedImage, setUpdatedImage]= useState('')
  const [updatedDescription, setUpdatedDescription]= useState('')
  const handleNewNameChange = (event) => {
    setNewNames(event.target.value)
  }
  const handleNewPlayersChange = (event) => {
    setNewPlayers(event.target.value)
  }
  const handleNewImageChange = (event) => {
    setNewImages(event.target.value)
  }
  const handleNewDescriptionChange = (event) => {
    setNewDescription(event.target.value)
  }
  const updateNewNameChange = (event) => {
    setUpdatedName(event.target.value)
  }
  const updateNewPlayersChange = (event) => {
    setUpdatedPlayers(event.target.value)
  }
  const updateNewImageChange = (event) => {
    setUpdatedImage(event.target.value)
  }
  const updateNewDescriptionChange = (event) => {
    setUpdatedDescription(event.target.value)
  }
  const handleNewGameSubmit = (event) => {
    event.preventDefault();
    axios.post(
      'http://localhost:3000/games',
      {
        name:newNames,
        players:newPlayers,
        image:newImages,
        description:newDescriptions
      }
    ).then(()=>{
      axios.get('http://localhost:3000/games').then((response) => {
        setGames(response.data)
      })
    })
  }
  const handleDelete = (gameData) => {
    axios
        .delete(`http://localhost:3000/games/${gameData._id}`)
        .then(() => {
          axios
              .get('http://localhost:3000/games')
              .then((response) => {
                setGames(response.data)
              });
        });
  }
  const handleUpdateName = (gameData)=>{
    axios.put(`http://localhost:3000/games/${gameData._id}`,
        {
          name: updatedName,
          players: gameData.players,
          image: gameData.image,
          description: gameData.description
        }
      ).then((response) => { axios.get('http://localhost:3000/games')
          .then((response) => {
            setGames(response.data);
          })
    })
  }
  const handleUpdatePlayers = (gameData)=>{
    axios.put(`http://localhost:3000/games/${gameData._id}`,
        {
          name: gameData.name,
          players: updatedPlayers,
          image: gameData.image,
          description: gameData.description
        }
      ).then((response) => { axios.get('http://localhost:3000/games')
          .then((response) => {
            setGames(response.data);
          })
    })
  }
  const handleUpdateImage = (gameData)=>{
    axios.put(`http://localhost:3000/games/${gameData._id}`,
        {
          name: gameData.name,
          players: gameData.players,
          image: updatedImage,
          description: gameData.description
        }
      ).then((response) => { axios.get('http://localhost:3000/games')
          .then((response) => {
            setGames(response.data);
          })
    })
  }
  const handleUpdateDescription = (gameData)=>{
    axios.put(`http://localhost:3000/games/${gameData._id}`,
        {
          name: gameData.name,
          players: gameData.players,
          image: gameData.image,
          description: updatedDescription
        }
      ).then((response) => { axios.get('http://localhost:3000/games')
          .then((response) => {
            setGames(response.data);
          })
    })
  }
  
  useEffect(()=>{
    axios
        .get('http://localhost:3000/games')
        .then((response)=>{
        	setGames(response.data)
        })
},[])

  return (
    <div className="App">
      <h1>Board Game Page</h1>
      <div className = "mainContainer">
            <div className = "container">
            <h2>Create a Board Game</h2>
              <form onSubmit={handleNewGameSubmit}>
                  Name: <input type="text" onChange={handleNewNameChange}/><br/>
                  Players: <input type="text" onChange={handleNewPlayersChange}/><br/>
                  Image: <input type="text" onChange={handleNewImageChange}/><br/>
                  Description: <input type="text" onChange={handleNewDescriptionChange}/><br/>
                  <input type="submit" value="Create a Board Game"/>
              </form>
            </div>
      {games.map((game)=>{
                return (
                  <div className = "container">
                    <h2>{game.name}</h2>
                    <h2>{game.players}</h2>
                    <img src = {game.image}/>
                    <p>{game.description}</p>
                    <button onClick={ (event)=>{ handleDelete(game) } }>Delete</button>
                    <div className='subContainer'>
            <button className='update' onClick={ (event) => { handleUpdateName(game) } }>Update Name</button>
            <input className='update1' type="text" placeholder={game.name} onKeyUp= {updateNewNameChange}/> <br/>
            <button className='update' onClick={ (event) => { handleUpdatePlayers(game) } }>Edit Number of Players</button>
            <input className='update1' type="text" placeholder={game.players} onKeyUp= {updateNewPlayersChange}/> <br/>
            <button className='update' onClick={ (event) => { handleUpdateImage(game) } }>Update Image</button>
            <input className='update1' type="text" placeholder={game.image} onKeyUp= {updateNewImageChange}/> <br/>
            <button className='update' onClick={ (event) => { handleUpdateDescription(game) } }>Update Description</button>
            <input className='update1' type="text" placeholder={game.description} onKeyUp= {updateNewDescriptionChange}/> <br/>
            </div> 
                  </div>
                )
            })}
            </div>
    </div>
  );
}



export default App;
