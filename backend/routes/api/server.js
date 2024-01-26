const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");


const { List, User, Task, sequelize } = require("../../db/models");
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


const serverCharacterList = (lists, server) => {
    const availableClasses = new Set(classNames)
    const createdClasses = new Set();

    for (let i = 0; i < lists.length; i++) {
        let character = lists[i];

        if (availableClasses.has(character.dataValues.characterClass)) {
            availableClasses.delete(character.dataValues.characterClass);
            createdClasses.add(character.dataValues);
        } else {
            createdClasses.add(character.dataValues);
        }
    }

    return { available: Array.from(availableClasses), created: Array.from(createdClasses) };
}

router.get(
    "/:userId",
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.userId);
        // const userId = req.body.userId

        const lists = await List.findAll({
            where: { userId: userId },
            order: sequelize.col("server"),
        });

        const serversList = {
            'Reboot Kronos': [],
            'Reboot Hyperion': [],
            'Reboot Solis': [],
            Aurora: [],
            Bera: [],
            Elysium: [],
            Luna: [],
            Scania: []
        };

        const Reboot_Kronos = lists.filter(obj => obj.dataValues.server === 'Reboot Kronos')
        const Reboot_Hyperion = lists.filter(obj => obj.dataValues.server === 'Reboot Hyperion')
        const Reboot_Solis = lists.filter(obj => obj.dataValues.server === 'Reboot Solis')
        const Aurora = lists.filter(obj => obj.dataValues.server === 'Aurora')
        const Bera = lists.filter(obj => obj.dataValues.server === 'Bera')
        const Elysium = lists.filter(obj => obj.dataValues.server === 'Elysium')
        const Luna = lists.filter(obj => obj.dataValues.server === 'Luna')
        const Scania = lists.filter(obj => obj.dataValues.server === 'Scania')

        serversList['Reboot Kronos'] = serverCharacterList(Reboot_Kronos, 'Reboot Kronos');
        serversList['Reboot Hyperion'] = serverCharacterList(Reboot_Hyperion, 'Reboot Hyperion')
        serversList['Reboot Solis'] = serverCharacterList(Reboot_Solis, 'Reboot Solis')
        serversList['Aurora'] = serverCharacterList(Aurora, 'Aurora')
        serversList['Bera'] = serverCharacterList(Bera, 'Bera')
        serversList['Elysium'] = serverCharacterList(Elysium, 'Elysium')
        serversList['Luna'] = serverCharacterList(Luna, 'Luna')
        serversList['Scania'] = serverCharacterList(Scania, 'Scania')

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
