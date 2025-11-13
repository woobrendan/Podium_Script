import { Card, CardContent, CardMedia } from "@mui/material";
import missing from "../images/Missing_car.png";

const NoResults = () => {
  return (
    <div className="No-Result">
      <Card>
        <CardMedia component="img" image={missing} alt="No Vehicles Found" />
        <CardContent>
          <h2>No Results Found</h2>
          <h5>
            We couldn't find what you were searching for. Try searching again
          </h5>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoResults;
