import SingleHardChargerCard from "./SingleHardChargerCard";
import { grCup } from "../../../functions/helperFunc";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import { getClassArr, getAwardEntries } from "../../../functions/podiumResultHelpers";

const HardChargeContainer = ({ series, onSubmit }) => {
    let eventEntries = useSelector((state) => state.entry.eventEntries);

    const hardChargeCards = getClassArr(series).map((classif, index) => {
        const entries = getAwardEntries(eventEntries, series, classif);

        return (
            <SingleHardChargerCard
                key={index}
                classif={classif}
                resultNum={index + 1}
                onSubmit={onSubmit}
                entries={entries}
            />
        );
    });

    return (
        <div className="results-container">
            <Card className="podium_card">
                <h2>{series.name === grCup ? "Hard Charger" : "E-Boost Hard Charger"}</h2>
                <div className="award_container">{hardChargeCards}</div>
            </Card>
        </div>
    );
};

export default HardChargeContainer;
