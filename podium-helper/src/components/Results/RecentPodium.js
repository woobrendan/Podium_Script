import ResultTableHeader from "./ResultTableHeader";
import { printPage } from "../../functions/helperFunc";
import { Button } from "@mui/material";
import "../../Styling/result.scss";
import { useSelector } from "react-redux";

const RecentPodium = () => {
    const recentResult = useSelector((state) => state.results.recentPodium);

    return (
        <div className="recent-podium-container">
            <Button onClick={() => printPage()} variant="contained" color="success">
                Print Page
            </Button>
            {recentResult && <ResultTableHeader results={recentResult} />}
        </div>
    );
};

export default RecentPodium;
