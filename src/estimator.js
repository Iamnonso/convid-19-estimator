const periodInDays = (months) => months * 30;
const periodWeeks = (weeks) => weeks * 7;

const NumberOfDays = (periodType, timeToElapse) => {
  switch (periodType) {
    case 'months':
      return periodInDays(timeToElapse);
    case 'weeks':
      return periodWeeks(timeToElapse);
    default:
      return timeToElapse;
  }
};

const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds,
  } = data;

  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  const projected = Math.trunc(NumberOfDays(periodType, timeToElapse) / 3);

  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** projected;

  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** projected;

  // *******************************challenge two*******************************

  // calculating 15 percentage normal cases
  impact.severeCasesByRequestedTime = (impact.infectionsByRequestedTime * 15) / 100;

  // calculating 15 percentag of severecases
  severeImpact.severeCasesByRequestedTime = (severeImpact.infectionsByRequestedTime * 15) / 100;

  // estimated hospital bed function
  const hospitalBedsByRequested = (severeCases) => {
    const availableBeds = totalHospitalBeds * 0.35;
    return availableBeds - severeCases;
  };

  impact.hospitalBedsByRequestedTime = hospitalBedsByRequested(
    impact.severeCasesByRequestedTime,
  ); // call hospitalBedsByRequestedTime function for impact cases

  severeImpact.hospitalBedsByRequestedTime = hospitalBedsByRequested(
    severeImpact.severeCasesByRequestedTime,
  ); // call hospitalBedsByRequestedTime function for severeImpact cases

  return {
    data,
    impact,
    severeImpact,
  };
};

export default covid19ImpactEstimator;
