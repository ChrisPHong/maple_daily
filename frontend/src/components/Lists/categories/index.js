const Categories = (props) => {
  const { bosses, type, tasks, setTasks } = props;


  const addToSet = (bossName) => {
    if (tasks.has(bossName)) {
      tasks.delete(bossName);
      setTasks(new Set(tasks))
    } else {
        setTasks(new Set(tasks).add(bossName));
    }
  };
  return (
    <>
      {type === "weekly" ? <div>Weekly Bosses</div> : <div>Daily Bosses</div>}

      {bosses.map((boss) => {
        return <button onClick={addToSet(boss.bossNames)}>{boss.bossNames}</button>;
      })}
    </>
  );
};

export default Categories;
