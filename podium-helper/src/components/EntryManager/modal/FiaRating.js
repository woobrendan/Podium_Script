import { useState } from "react";

const FiaRating = ({ currentRating, name, onChange }) => {
    const [rating, setRating] = useState(currentRating ? currentRating : "");

    const ratingList = ["N/A", "Bronze", "Silver", "Gold", "Platinum"];

    const handleChange = (e) => {
        setRating(e.target.value);
        onChange(e);
    };

    return (
        <div className="dropdown" id="dropdown_fia">
            <label htmlFor="dropdown">FIA Rating:</label>
            <select value={rating} onChange={handleChange} name={name}>
                <option value="" disabled>
                    Select Rating
                </option>
                {ratingList.map((ratingStr, index) => (
                    <option value={ratingStr} key={index}>
                        {ratingStr}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FiaRating;
