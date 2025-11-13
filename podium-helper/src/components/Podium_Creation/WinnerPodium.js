import { useState } from "react";
import { Button, Card } from "@mui/material";
import PlacementInput from "./PlacementInput";
import { numOfDriverMenuItem } from "../../functions/podiumResultHelpers";
import { useSelector } from "react-redux";

const WinnerPodium = ({ seriesName, classification, onClick, resultNum }) => {
    const [winners, setWinners] = useState({
        class: classification,
        firstPlace: "",
        secondPlace: "",
        thirdPlace: "",
    });
    const [isError, setIsError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const entries = useSelector((state) => state.entry.eventEntries);

    const handleWinners = (event) => {
        setWinners((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = () => {
        const isFirstPlace = winners.firstPlace;
        if (!isFirstPlace && seriesName !== "GT America") {
            setIsError(true);
        } else {
            if (isError) setIsError(false);
            onClick(winners, "podium", resultNum);
            setIsSubmitted(true);
        }
    };

    //Loop through all entries and return entries that match the selected classification
    const mappedDrivers = entries
        .filter((entry) => entry.series === seriesName && entry.classification === winners.class)
        .sort((a, b) => a.number - b.number)
        .map((entry, index) => numOfDriverMenuItem(entry, index));

    return (
        <div className="results-container">
            <Card className="podium_card">
                <h2>{classification}</h2>
                <div className="placement-container">
                    <div className="finishing-spot">
                        <h3>
                            1<sup>st</sup>
                        </h3>
                        <h3>
                            2<sup>nd</sup>
                        </h3>
                        <h3>
                            3<sup>rd</sup>
                        </h3>
                    </div>
                    <div className="finishing-drivers">
                        <PlacementInput
                            name="firstPlace"
                            handleWinners={handleWinners}
                            mappedDrivers={mappedDrivers}
                            label="First Place"
                            value={winners.firstPlace}
                            boxNum={resultNum}
                        />
                        <PlacementInput
                            name="secondPlace"
                            handleWinners={handleWinners}
                            mappedDrivers={mappedDrivers}
                            label="Second Place"
                            value={winners.secondPlace}
                            boxNum={resultNum}
                        />
                        <PlacementInput
                            name="thirdPlace"
                            handleWinners={handleWinners}
                            mappedDrivers={mappedDrivers}
                            label="Third Place"
                            value={winners.thirdPlace}
                            boxNum={resultNum}
                        />
                    </div>
                </div>
                {isError && <span>Must be a First Place Finisher</span>}
                <Button variant="contained" color={isSubmitted ? "success" : "error"} onClick={handleSubmit}>
                    {isSubmitted ? "Update" : "Submit"}
                </Button>
            </Card>
        </div>
    );
};

export default WinnerPodium;
