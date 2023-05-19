router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { userId, name, character, tasks } = req.body;

    let apiContent;
    let list;
    let characterClass;
    let server;
    let level;

    try {
      // Wrap the axios request in a Promise and await it
      const axiosResponse = await new Promise((resolve, reject) => {
        axios
          .get(`https://api.maplestory.gg/v2/public/character/gms/${character}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });

      // Handle the axios response
      apiContent = axiosResponse.data.CharacterData.CharacterImageURL;
      characterClass = axiosResponse.data.CharacterData.Class;
      server = axiosResponse.data.CharacterData.Server;
      level = axiosResponse.data.CharacterData.Level;

      // Create the list
      list = await List.create({
        userId,
        name,
        character,
        apiContent,
        characterClass,
        server,
        level,
      });

      const listId = list.id;

      // Create an array of promises for task creation
      const taskCreationPromises = Object.keys(tasks).map(async (boss) => {
        return Task.create({
          userId,
          listId,
          objective: boss,
        });
      });

      // Wait for the list creation and all task creation promises to resolve
      await Promise.all([list, ...taskCreationPromises]);

      // Fetch the list with associated tasks after creation
      const updatedList = await List.findOne({
        where: { id: list.id },
        include: { model: Task },
      });

      return res.json(updatedList);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred." });
    }
  })
);
