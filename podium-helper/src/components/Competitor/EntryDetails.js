import EntryHighlights from "./EntryHighlights";
import DriverTable from "./DriverTable";

const EntryDetails = ({ entry }) => {
  const { series, vehicle, classification } = entry;
  return (
    <div className="entry-details">
      <EntryHighlights
        series={series}
        car={vehicle}
        classification={classification}
      />
      <DriverTable drivers={entry} />
    </div>
  );
};

export default EntryDetails;
