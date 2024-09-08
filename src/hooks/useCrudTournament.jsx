const useCrudTournament = () => {
  const addTournament = async (forms) => {
    console.log(forms);
    const res = await fetch("http://localhost:5000/create-tournament", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header
      },
      body: JSON.stringify(forms),
    });
    const output = await res.json();
    return output;
  };
  return { addTournament };
};

export default useCrudTournament;
