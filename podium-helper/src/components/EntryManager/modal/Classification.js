import { useState } from "react";
import { useSelector } from "react-redux";

const Classification = ({ onInputChange, classification, series }) => {
    const [className, setClassName] = useState(classification ? classification : "");

    const seriesList = useSelector((state) => state.series.seriesArr);

    const getSeriesClasses = (seriesList) => {
        // if series prop exists, then take that name and only return the class list for that series
        if (series) {
            for (const serie of seriesList) {
                if (serie.name === series) {
                    return serie.class;
                }
            }
        }
        // create get all class lists combined into one with reduce, then use set to remove dupes, spread into arr
        return [...new Set(seriesList.reduce((acc, series) => acc.concat(series.class), []))].sort();
    };

    const handleChange = (event) => {
        setClassName(event.target.value);
        onInputChange(event);
    };

    return (
        <div className="dropdown" id="dropdown_class">
            <label htmlFor="dropdown">Class:</label>
            <select value={className} onChange={handleChange} name="classification">
                <option value="" disabled>
                    Select a class
                </option>
                {getSeriesClasses(seriesList).map((classif, index) => (
                    <option value={classif} key={index}>
                        {classif}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Classification;
