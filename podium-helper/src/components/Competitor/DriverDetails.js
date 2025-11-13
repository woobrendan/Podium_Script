import { useState } from "react";
import { CardContent, Card, Button } from "@mui/material";
import classNames from "classnames";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EntryMedia from "./EntryMedia";
import {
    gtwca,
    tcam,
    gtam,
    gt4a,
    igtc,
    grCup,
} from "../../functions/helperFunc";
import EntryDetails from "./EntryDetails";

const DriverDetails = ({ entry }) => {
    const [entryInfo, setEntryInfo] = useState(false);
    const { series } = entry;

    const seriesClassMap = {
        [gtwca]: "entry-detail_GTWCA",
        [gt4a]: "entry-detail_PGT4A",
        [tcam]: "entry-detail_TCA",
        [gtam]: "entry-detail_GTA",
        [igtc]: "entry-detail_IGTC",
        [grCup]: "entry-detail_GRCup",
    };

    const detailClass = classNames(
        "entry-detail__item",
        seriesClassMap[series],
    );

    return (
        <div className="competitor-card">
            <Card className={detailClass}>
                {!entryInfo && <EntryMedia entry={entry} />}
                <CardContent>
                    {entryInfo && <EntryDetails entry={entry} />}
                    <div className="driver-info-toggle">
                        <h4>Details</h4>
                        <Button
                            onClick={() =>
                                entryInfo
                                    ? setEntryInfo(false)
                                    : setEntryInfo(true)
                            }
                        >
                            {entryInfo ? (
                                <RemoveCircleOutlineIcon
                                    color="warning"
                                    fontSize="large"
                                />
                            ) : (
                                <AddCircleOutlineIcon
                                    color="warning"
                                    fontSize="large"
                                />
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DriverDetails;
