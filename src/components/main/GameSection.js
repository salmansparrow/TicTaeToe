import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Col, Container, Row } from "reactstrap";
import winnerGif from "/public/elements/excited.gif";

function GameSection() {
  const [turn, setTurn] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);
  const [audioTurn, setAudioTurn] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/elements/ting.mp3");
      setAudioTurn(audio);
    }
  }, []);
  const handleBoxClick = (index) => {
    if (board[index] === "" && !winner) {
      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);
      setTurn(turn === "X" ? "0" : "X");
      audioTurn.play();
      checkWin(newBoard);
    }
  };

  const checkWin = (newBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        return;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setWinner(null);
  };

  return (
    <>
      <section className="mainContainer">
        <Container>
          <h2 className="text-center">Welcome To Tic Tac Toe</h2>
          <Row>
            <Col xs="12" md="8" className="gameContainer">
              <div className="gameBoard">
                {Array(3)
                  .fill()
                  .map((_, rowIndex) => (
                    <Row key={rowIndex}>
                      {board
                        .slice(rowIndex * 3, rowIndex * 3 + 3)
                        .map((value, colIndex) => (
                          <Col
                            key={rowIndex * 3 + colIndex}
                            className="box"
                            onClick={() =>
                              handleBoxClick(rowIndex * 3 + colIndex)
                            }
                          >
                            <span className="boxtext">{value}</span>
                          </Col>
                        ))}
                    </Row>
                  ))}
              </div>
            </Col>
            {/* Right Column for Game Info */}
            <Col xs="12" md="4" className="rightColumn">
              <div className="gameInfo">
                <h2>Game Info</h2>
                <p>Current Player: {turn}</p>
                <Button onClick={resetGame}>Reset</Button>
                <p>Winner: {winner ? winner : "none"}</p>
                {winner && (
                  <div>
                    <Image
                      src={winnerGif}
                      height={90}
                      width={90}
                      alt="Winner"
                      className="winnerGif"
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default GameSection;
