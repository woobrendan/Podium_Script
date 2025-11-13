import InputContainer from "./InputContainer";
import FiaRating from "./FiaRating";

const EditDriver = ({ entry, onChange, driverNum }) => {
    const driver = `driver${driverNum}`;

    return (
        <section className={`input_driver_container_${driverNum}`}>
            <InputContainer
                val={entry[driver].name}
                name={`driver ${driverNum} name`}
                onInputChange={onChange}
                label={`Driver ${driverNum}`}
            />
            <InputContainer
                val={entry[driver].nationality}
                name={`driver ${driverNum} nationality`}
                onInputChange={onChange}
                label="Nationality"
            />
            <FiaRating currentRating={entry[driver].rating} name={`driver ${driverNum} rating`} onChange={onChange} />
        </section>
    );
};

export default EditDriver;
