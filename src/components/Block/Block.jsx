const Block = ({ guessedWord, solution, isFinal }) => {
  let wordBox = [];
  for (let i = 0; i < 5; i++) {
    let className = "wordBox";
    if (isFinal) {
      if (solution?.[i] === guessedWord?.[i]) {
        className += " correct";
      } else if (solution.includes(guessedWord?.[i])) {
        className += " close";
      } else {
        className += " incorrect";
      }
    }
    wordBox.push(
      <div key={i} className={className}>
        {guessedWord?.[i]}
      </div>
    );
  }
  return <div className="wordLine">{wordBox}</div>;
};

export default Block;
