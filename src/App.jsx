import { useEffect, useState } from 'react'
import './App.css'
import { useRef } from 'react'
import svgMario from "./assets/img/gif/mario-run.gif"
import svgMushroom from "./assets/img/gif/mushroom.gif"
import ScoreModal from './components/ScoreModal'
import MarioPng from "./assets/img/mario.png"

function App() {
  const mario = useRef(null);
  const mushroom = useRef(null);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);


  let marioPosition = 100;

  let marioJump = false;

  const jump = () => {
    if (!marioJump) {
      marioJump = true;
      let start = 100;
      let end = 250;
      let speed = 10;

      let jumpInterval = setInterval(function () {
        if (start < end) {
          start += speed;
          marioPosition = start;
          console.log(start, "start")
          mario.current.style.bottom = `${start}px`
        } else {
          clearInterval(jumpInterval);
          fall()
        }
      }, 20)
    }
  }

  const fall = () => {
    let start = 250;
    let end = 100;
    let speed = 10;

    let fallInterval = setInterval(function () {
      if (start > end) {
        start -= speed;
        marioPosition = start;
        mario.current.style.bottom = `${start}px`
      } else {
        clearInterval(fallInterval);
        marioJump = false;
      }
    }, 20);
  }

  const moveObs = () => {
    let start = 0;
    let end = 100;
    let speed = 5;
    let count = 0;

    let obsInterval = setInterval(() => {
      if (start < end) {
        start += speed;
        mushroom.current.style.right = `${start}%`
        console.log(marioPosition, start);
        if (marioPosition === start) {
          stop()
          clearInterval(obsInterval)
        } else {
          if (start === end) {
            start = 0;
            count++;
            setScore(count);
          }
        }
      } else {
        clearInterval(obsInterval)
      }
    }, 100)
  }

  const stop = () => {
    mushroom.current.style.right = `93%`;
    setIsModalOpen(true)
  }

  useEffect(() => {
    moveObs()
    window.addEventListener("keydown", function (event) {
      switch (event.key) {
        case " ":
          jump()
          break;
      }
    })
  }, [])

  return (
    <div style={{ position: "relative", overflow: "hidden", height: "100vh" }}>
      <h1 style={{ position: "absolute" }}>{marioPosition}</h1>
      <div className={`${isModalOpen ? "bg_non_move" : 'bg_mario'}`} />
      <img src={svgMushroom} ref={mushroom} className='mushroom' />
      <img src={isModalOpen ? MarioPng : svgMario} ref={mario} className='mario' />
      <div style={{ position: "absolute", backgroundColor: "white", padding: "3rem", borderRadius: "2rem", left: '45%' }}>
        <p className='score'>{`Score : ${score}`}</p>
      </div>
      <ScoreModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} Score={score} />
    </div>
  )
}

export default App
