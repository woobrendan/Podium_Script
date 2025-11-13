import { CardHeader, Avatar, CardMedia } from "@mui/material";
import {
    GTWCA,
    PGT4A,
    GTAM,
    TCAM,
    IGTC,
    GRCUP,
} from "../../images/series_logos";
import { tcam, gtam, gt4a, igtc, grCup } from "../../functions/helperFunc";
import { getManufLogo, getClassBannerImg } from "../../functions/getImages";

const EntryMedia = ({ entry }) => {
    const { series, team, vehicle, carImage, classification, number } = entry;

    const getSeriesLogo = (series) => {
        const logo = {
            [igtc]: IGTC,
            [gt4a]: PGT4A,
            [tcam]: TCAM,
            [gtam]: GTAM,
            [grCup]: GRCUP,
        };

        return logo[series] || GTWCA;
    };

    return (
        <div className="entry-media">
            <CardHeader
                avatar={<Avatar alt={series} src={getSeriesLogo(series)} />}
                title={team}
            />
            <Avatar
                className="manufacturer-avatar"
                alt={vehicle}
                src={getManufLogo(vehicle)}
            />
            <CardMedia component="img" image={carImage} alt={vehicle} />
            <br></br>
            <img
                className="class-banner-img"
                src={getClassBannerImg(classification, series)}
                alt={classification}
            />
            <div className={`car_number len_${number.length}`}>#{number}</div>
        </div>
    );
};

export default EntryMedia;
