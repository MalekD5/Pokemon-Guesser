import React, { useEffect, useState } from "react";
import { usePokemon } from "./hooks/PokemonHook";

interface GameData {
  name: string,
  img: HTMLImageElement,
  other: string[],
}

interface Score {
  correct: number,
  incorrect: number;
}

export default function Game() {
  const data = usePokemon();
  const [currentPokemon, setCurrentPokemon] = useState({} as GameData);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState({correct: 0, incorrect: 0} as Score);

  const randomize = (): GameData => {
    if (answered) 
      setAnswered(false);
    
    const copy = [...data];
    const randomizeChoices = [];
    for (let i = 0; i < 4; i++) {
      const index = Math.floor(Math.random() * copy.length);
      randomizeChoices.push(copy[index]);
      // this will prevent duplicate pokemon in the choices.
      copy.splice(index, 1);
    }
    const index = Math.floor(Math.random() * randomizeChoices.length);
    const correctPokemon = randomizeChoices[index];
    return {...correctPokemon, other: randomizeChoices.map(pm => pm.name)};
  }

  useEffect(() => {
    setCurrentPokemon(randomize())
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, name: string) => {
    if (answered) 
      return;
    
    setAnswered(true);
    const target = e.target as HTMLButtonElement;
    target.addEventListener('mouseover', (e) => {
        e.preventDefault();
    });
    
    if (name === currentPokemon?.name) {
      target.style.backgroundColor = '#22c55e';
      score.correct++;
    } else {
      target.style.backgroundColor = '#dc2626';
      score.incorrect++;
    }
    setScore({...score});
    setTimeout(() => {
      setCurrentPokemon(randomize());
      setAnswered(false);
    }, 200);
  }

  const handleReset = () => {
    setScore({correct: 0, incorrect: 0});
  }
  return (
      <>
      <h1 className="text-white text-4xl text-center mt-10">Who is this Pokemon?</h1>
      <div className="flex items-center justify-center flex-col mt-10 gap-2">
        <div className="bg-white/95 rounded-lg mb-6 drop-shadow-2xl" style={{width: '200px', height: '150px'}}>
          <img onDragStart={(e) => e.preventDefault()} width="150px" height="auto" className="w-100 brightness-0 object-cover mx-auto my-auto" src={currentPokemon.img?.src} alt="pokemon image" />
        </div>
        <div className="grid grid-rows-2 grid-cols-2 gap-x-10 gap-y-2 md:mb-0 mb-[4rem]">
          {currentPokemon && currentPokemon.other?.map(poke => 
              <button onClick={(e) => handleClick(e, poke)} key={poke} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-lg px-8 py-3 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">{poke}</button>)}
        </div>
        <div className="mt-5 text-center">
          <p className="text-green-600 text-lg">Correct: {score.correct}</p>
          <p className="text-red-600 text-lg">Incorrect Guesses: {score.incorrect}</p>
          <button onClick={handleReset} type="button" className="mt-2 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reset</button>
        </div>
      </div>
      </>
  );
}