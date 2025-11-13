const mongoResult = (results) => {
    const {
        result1,
        result2,
        result3,
        result4,
        hardCharge1,
        hardCharge2,
        hardCharge3,
        series,
        fastLap1,
        fastLap2,
        fastLap3,
    } = results;
    return {
        ...results,
        series: series.name,
        result1: buildFullResult(result1),
        ...(result2 ? { result2: buildFullResult(result2) } : {}),
        ...(result3 ? { result3: buildFullResult(result3) } : {}),
        ...(result4 ? { result4: buildFullResult(result4) } : {}),
        ...(hardCharge1 ? { hardCharge1: hardCharge1 } : {}),
        ...(hardCharge2 ? { hardCharge2: hardCharge2 } : {}),
        ...(hardCharge3 ? { hardCharge3: hardCharge3 } : {}),
        fastLap1,
        ...(fastLap2 ? { fastLap2: fastLap2 } : {}),
        ...(fastLap3 ? { fastLap3: fastLap3 } : {}),
    };
};

const placementResult = (placeRes) => {
    const { driver1, driver2, driver3, number, vehicle, team } = placeRes;
    return {
        driver1: driver1.name,
        ...(driver2 ? { driver2: driver2.name } : {}),
        ...(driver3 ? { driver3: driver3.name } : {}),
        number,
        vehicle,
        team,
    };
};

const buildFullResult = (result) => {
    const { firstPlace, secondPlace, thirdPlace } = result;
    return {
        ...result,
        firstPlace: placementResult(firstPlace),
        ...(secondPlace ? { secondPlace: placementResult(secondPlace) } : {}),
        ...(thirdPlace ? { thirdPlace: placementResult(thirdPlace) } : {}),
    };
};

export default mongoResult;
