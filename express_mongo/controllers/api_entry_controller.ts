import { Request, Response } from "express";
import mongoose from "mongoose";
import ApiEntries from "../models/apiEntry_schema";
import { entriesByEvent, getManuf, getDriverInfo } from "../functions/helperFunc";
import convertOldtoNewEntry from "../functions/oldEntrytoApiEntry";
import { ConvertedApiEntry } from "../models/models";

//** NEW ENTRIES */
const createEntry = async (req: Request, res: Response) => {
    const { event, team, series, driver1, driver2, driver3, number, classification, vehicle } = req.body;

    const newEntry = new ApiEntries({
        _id: new mongoose.Types.ObjectId(),
        tk_id: null,
        created: new Date().toISOString(),
        event,
        series,
        team,
        number,
        car: vehicle,
        class: classification,
        manufacturer: getManuf(vehicle),
        ...getDriverInfo(driver1, 1),
        ...(driver2 ? getDriverInfo(driver2, 2) : {}),
        ...(driver3 ? getDriverInfo(driver3, 3) : {}),
    });

    try {
        const savedEntry = await newEntry.save();
        return res.status(200).json({ savedEntry });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getAllEntries = async (req: Request, res: Response) => {
    return ApiEntries.find()
        .then((entry) => res.status(201).json({ entry }))
        .catch((error) => res.status(500).json({ error }));
};

const getEntryById = async (req: Request, res: Response) => {
    const entryId = req.params.entryId;

    try {
        const entry = await ApiEntries.findById(entryId);
        return entry ? res.status(200).json({ entry }) : res.status(400).json({ message: "Entry Not Found" });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const getEntriesByEvent = async (req: Request, res: Response) => {
    try {
        const entries = await ApiEntries.find();
        if (entries) {
            const eventEntries = entriesByEvent(entries);
            return res.status(200).json({ eventEntries });
        } else {
            res.status(400).json({ message: "Entries Not Found" });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getEntryByEvent = async (req: Request, res: Response) => {
    const event = req.params.event;
    try {
        const entries = await ApiEntries.find();
        if (entries) {
            const sortedByEvent = entriesByEvent(entries);
            let allEntries: ConvertedApiEntry[] = []

            if (event === 'Long Beach Grand Prix') {
                const fullSeason = sortedByEvent["FULL SEASON ENTRY"].filter((entry) => entry.series === 'GT America')
                allEntries = [...sortedByEvent[event], ...fullSeason]

            } else {
                allEntries = [...sortedByEvent[event], ...sortedByEvent["FULL SEASON ENTRY"]];
            }


            return res.status(200).json({ entries: allEntries.sort((a, b) => Number(a.number) - Number(b.number)) });
        } else {
            res.status(400).json({ message: "Entrie Not Found" });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateEntry = async (req: Request, res: Response) => {
    const entryId = req.params.entryId;
    const convertedEntry = convertOldtoNewEntry(req.body);

    try {
        const entry = await ApiEntries.findById(entryId);
        if (entry) {
            entry.set(convertedEntry);
            await entry.save();
            return res.status(201).json({ entry });
        } else {
            res.status(400).json({ message: "Entry not found" });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

//** Delete Entry */
const deleteEntry = async (req: Request, res: Response) => {
    try {
        const entryId = req.params.entryId;
        const entry = await ApiEntries.findByIdAndDelete(entryId);

        if (entry) {
            return res.status(201).json({ message: "Deleted" });
        } else {
            return res.status(404).json({ message: "Not Found" });
        }
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export default {
    getAllEntries,
    getEntryById,
    getEntriesByEvent,
    getEntryByEvent,
    updateEntry,
    createEntry,
    deleteEntry,
};
