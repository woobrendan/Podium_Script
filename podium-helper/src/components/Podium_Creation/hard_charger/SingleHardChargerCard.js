import { useState } from "react";
import { Button } from "@mui/material";

const SingleHardChargerCard = ({ classif, resultNum, onSubmit, entries }) => {
    const [hardCharger, setHardCharger] = useState({
        entryNum: "",
        startPos: "",
        gain: "",
        class: classif,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setHardCharger((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(hardCharger, "hardChargerMulti", resultNum);
        setIsSubmitted(true);
    };

    return (
        <section className="single_hard_charge_container single_award">
            <h3>{classif}</h3>
            <section className="single_award_section">
                <div className="hard_driver award_input">
                    <label>Driver:</label>
                    <select name="entryNum" value={hardCharger.entryNum} onChange={handleChange}>
                        <option value="" disabled>
                            Select Driver(s)
                        </option>
                        {entries
                            .sort((a, b) => a.number - b.number)
                            .map((entry, index) => {
                                return (
                                    <option value={entry.number} key={index}>
                                        #{entry.number} - {entry.driver1.name}{" "}
                                        {entry.driver2 ? `& ${entry.driver2.name}` : " "}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="hard_start award_input">
                    <label>Start Pos:</label>
                    <input type="text" value={hardCharger.startPos} name="startPos" onChange={handleChange} />
                </div>
                <div className="hard_gain award_input">
                    <label>Gain:</label>
                    <input type="text" value={hardCharger.gain} name="gain" onChange={handleChange} />
                </div>
            </section>
            <Button size="small" variant="contained" color={isSubmitted ? "success" : "error"} onClick={handleSubmit}>
                {isSubmitted ? "Update" : "Submit"}
            </Button>
        </section>
    );
};

export default SingleHardChargerCard;
