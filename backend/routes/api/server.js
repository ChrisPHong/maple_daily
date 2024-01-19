const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { List, User, Task } = require("../../db/models");
const axios = require("axios");

const router = express.Router();

const validateSignup = [];
const classNames = [
    "Illium",
    "Lara",
    "Luminous",
    "Dual Blade",
    "Phantom",
    "Xenon",
    "Cadena",
    "Hoyoung",
    "Khali",
    "Adele",
    "Demon Avenger",
    "Demon Slayer",
    "Kanna",
    "Hayato",
    "Kinesis",
    "Zero",
    "Blaster",
    "Wind Breaker",
    "Thunder Breaker",
    "Beast Tamer",
    "Kaiser",
    "Angelic Buster",
    "Aran",
    "Evan",
    "Dawn Warrior",
    "Blaze Wizard",
    "Wind Archer",
    "Night Walker",
    "Thunder Breaker",
    "Battle Mage",
    "Wild Hunter",
    "Mechanic",
    "Buccaneer",
    "Corsair",
    "Night Lord",
    "Shadower",
    "Bowmaster",
    "Marksman",
    "Fire/Poison Archmage",
    "Ice/Lightning Archmage",
    "Bishop",
    "Hero",
    "Paladin",
    "Dark Knight",
    "Mihile",
    "Kain",
    "Mercedes",
    "Pathfinder",
    "Cannoneer",
    "Shade",
    "Ark",
    "Blade Master"
]


const serverFilterFunction = (userId, lists, server) => {
    const set = new Set(classNames)
    const createdClasses = new Set();

    for (let i = 0; i < lists.length; i++) {
        let character = lists[i];
        if (set.has(character.characterClass) && server === character.server) {
            set.remove(character.characterClass);
            createdClasses.add(character.characterClass);
        }
    }
    return { server: [set, createdClasses] };

}
router.get(
    "/:userId",
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.userId);
        const lists = await List.findAll({
            where: { userId: userId },
            order: sequelize.col("server"),
        });

        const serversList = [];

        console.log(lists, "<<<<<<<<<<<<<<<<<< lists")

        const Reboot_Kronos = lists.filter( obj => obj.server === 'Reboot Kronos')
        const Reboot_Hyperion = lists.filter( obj => obj.server === 'Reboot Hyperion')
        const Reboot_Solis = lists.filter( obj => obj.server === 'Reboot Solis')
        const Aurora = lists.filter( obj => obj.server === 'Aurora')
        const Bera = lists.filter( obj => obj.server === 'Bera')
        const Elysium = lists.filter( obj => obj.server === 'Elysium')
        const Luna = lists.filter( obj => obj.server === 'Luna')
        const Scania = lists.filter( obj => obj.server === 'Scania')
        
        for (let i = 0; i < serverNames.length; i++) {
            let server = serverNames[i];
            serversList.push(serverFilterFunction(userId, lists, server));
        }

        console.log(serversList, '<<<<<<<<<<<<<<<<<<<<<<<<<<<< SERVERS LISTS')

        return res.json(serversList);
    })
);

router.delete(
    "/:classList",
    asyncHandler(async (req, res) => {
        const id = Number(req.params.classList);
        // const task = await Task.findByPk(id);
        // await task.destroy();

        // return res.json(task);
    })
);



module.exports = router;
