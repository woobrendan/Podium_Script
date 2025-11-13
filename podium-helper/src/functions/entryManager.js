import { gtwca, gt4a } from "./helperFunc";

const initialEntryState = {
  team: "",
  driver1: {
    name: "",
    nationality: "",
    rating: "",
  },

  vehicle: "",
  classification: "",
  number: "",
  carImage: "",
  series: "",
  year: 2023,
};

const errorState = {
  hasTeamErr: true,
  hasVehicleErr: true,
  hasClassifErr: true,
  hasNumberErr: true,
  hasSeriesErr: true,
  hasDriverErr: true,
  hasDriver2Err: false,
};

const checkEntryErrors = (entry, error, setError) => {
  const { team, series, vehicle, classification, number, driver1, driver2 } =
    entry;
  const errCopy = { ...error };
  const checkEmptyStr = (val) => (val === "" ? true : false);
  const checkDriverVals = (driver, num) => {
    for (const key in driver) {
      if (checkEmptyStr(driver[key])) {
        if (num === 1) {
          errCopy.hasDriverErr = true;
          return;
        } else {
          errCopy.hasDriver2Err = true;
          return;
        }
      }
    }
    errCopy.hasDriverErr = false;
    return;
  };

  checkEmptyStr(series)
    ? (errCopy.hasSeriesErr = true)
    : (errCopy.hasSeriesErr = false);
  checkEmptyStr(vehicle)
    ? (errCopy.hasVehicleErr = true)
    : (errCopy.hasVehicleErr = false);
  checkEmptyStr(team)
    ? (errCopy.hasTeamErr = true)
    : (errCopy.hasTeamErr = false);
  checkEmptyStr(classification)
    ? (errCopy.hasClassifErr = true)
    : (errCopy.hasClassifErr = false);
  checkEmptyStr(number)
    ? (errCopy.hasNumberErr = true)
    : (errCopy.hasNumberErr = false);

  checkDriverVals(driver1, 1);
  if (series === gtwca || series === gt4a) checkDriverVals(driver2, 2);

  // loop through the error state, if a key returns true set error state to copy and exit
  for (const key in errCopy) {
    if (errCopy[key]) {
      setError(errCopy);
      return false;
    }
  }

  setError(errorState);
  return true;
};

export { initialEntryState, errorState, checkEntryErrors };
