import Classification from "./Classification";
import InputContainer from "./InputContainer";
import VehicleList from "./VehicleList";

const EditVehicle = ({ entry, onInputChange, classification, series }) => {
	const { vehicle, number } = entry;
	return (
		<section className="input_vehicle_container">
			<Classification onInputChange={onInputChange} classification={classification} series={series} />
			<InputContainer val={number} name="number" onInputChange={onInputChange} label="Number" />
			{series && (
				<VehicleList series={series} vehicleName={vehicle} classif={classification} onChange={onInputChange} />
			)}
		</section>
	);
};

export default EditVehicle;
