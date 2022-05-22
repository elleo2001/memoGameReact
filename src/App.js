import { useEffect, useState } from 'react'
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/html5-logo-6.png", matched: false },
  { "src": "/img/css-3-logo-6.png", matched: false  },
  { "src": "/img/kisspng-javascript-logo-html-clip-art-javascript-logo-5b5188b1a2a1f9.2428698915320700656662.png", matched: false },
  { "src": "/img/logo-react-256.png", matched: false  },
  { "src": "/img/logo-node-js-256.png", matched: false  },
  { "src": "/img/wordpress-logo-10.png", matched: false  }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // Embaralhar cartas
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  // "handle a choice"
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compara as duas cartas selecionadas
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true} 
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reseta as escolhas e aumenta uma virada
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

// iniciar novo jogo automaticamente
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Memo Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched} 
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
