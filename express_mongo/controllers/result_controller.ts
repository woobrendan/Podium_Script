import { Request, Response } from "express";
import Result from "../models/result_schema";
import { resultBuilder, hardChargeResult, fastLapResult } from "../functions/helperFunc";
import { MultiFastLap, ResultInterface, MultiHardCharge } from "../models/result_models";

//** CREATE ROUTE HANDLER */
const createResult = (req: Request, res: Response) => {
	const {
		result1,
		result2,
		result3,
		result4,
		fastLap1,
		fastLap2,
		fastLap3,
		hardCharge1,
		hardCharge2,
		hardCharge3,
	}: {
		result1: ResultInterface;
		result2?: ResultInterface;
		result3?: ResultInterface;
		result4?: ResultInterface;
		fastLap1?: MultiFastLap;
		fastLap2?: MultiFastLap;
		fastLap3?: MultiFastLap;
		hardCharge1?: MultiHardCharge;
		hardCharge2?: MultiHardCharge;
		hardCharge3?: MultiHardCharge;
	} = req.body.results;

	const result = new Result({
		...req.body.results,
		result1: { ...resultBuilder(result1) },
		...(result2 ? { result2: { ...resultBuilder(result2) } } : {}),
		...(result3 ? { result3: { ...resultBuilder(result3) } } : {}),
		...(result4 ? { result4: { ...resultBuilder(result4) } } : {}),
		...(fastLap1 ? { fastLap1: { ...fastLapResult(fastLap1) } } : {}),
		...(fastLap2 ? { fastLap2: { ...fastLapResult(fastLap2) } } : {}),
		...(fastLap3 ? { fastLap3: { ...fastLapResult(fastLap3) } } : {}),
		...(hardCharge1 ? { hardCharge1: { ...hardChargeResult(hardCharge1) } } : {}),
		...(hardCharge2 ? { hardCharge2: { ...hardChargeResult(hardCharge2) } } : {}),
		...(hardCharge3 ? { hardCharge3: { ...hardChargeResult(hardCharge3) } } : {}),
	});

	return result
		.save()
		.then((result) => res.status(201).json({ result }))
		.catch((error) => res.status(500).json({ error }));
};

//** GET ALL ROUTE HANDLER */
const getAllResults = async (req: Request, res: Response) => {
	return Result.find()
		.then((results) => res.status(201).json({ results }))
		.catch((error) => res.status(500).json({ error }));
};

//** GET BY ID ROUTE HANDLER */
const getResultById = async (req: Request, res: Response) => {
	const resultId = req.params.resultId;
	try {
		const result = await Result.findById(resultId);
		return result ? res.status(200).json({ result }) : res.status(400).json({ message: "Result Not Found" });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

//** EDIT / UPDATE ROUTE HANDLER */
const updateResult = async (req: Request, res: Response) => {
	const resultId = req.params.resultId;
	return Result.findById(resultId)
		.then((result) => {
			if (result) {
				result.set(req.body);
				return result
					.save()
					.then((result) => res.status(201).json({ result }))
					.catch((error) => res.status(500).json({ error }));
			} else {
				res.status(404).json({ message: "Result not found" });
			}
		})
		.catch((error) => res.status(500).json({ error }));
};

//** DELETE ROUTE HANDLER */
const deleteResult = (req: Request, res: Response) => {
	const resultId = req.params.resultId;
	return Result.findByIdAndDelete(resultId)
		.then((result) =>
			result ? res.status(201).json({ message: "Deleted" }) : res.status(404).json({ message: "Not Found" })
		)
		.catch((error) => res.status(500).json({ error }));
};

export default {
	getAllResults,
	getResultById,
	updateResult,
	deleteResult,
	createResult,
};
