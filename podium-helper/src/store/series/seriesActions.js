import axios from "axios";
import { seriesActions } from "./seriesSlice";

export const fetchSeries = () => {
    return async (dispatch) => {
        try {
            const series = await axios.get("http://localhost:2020/api/series");

            dispatch(seriesActions.setSeries(series.data.series));
        } catch (err) {
            console.log("Error fetching Series: ", err);
        }
    };
};
