const Scores = ({ category, score }) => {
  return (
    <div className="mt-2">
      <div className="w-full flex justify-between">
        <p>{category}</p>
        <p>{score} / 5</p>
      </div>

      <div className="w-full bg-off-white/20 rounded">
        <div
          style={{ width: `${score * 20}%` }}
          className={`bg-off-white h-2.5 rounded`}
        ></div>
      </div>
    </div>
  );
};

export default Scores;
