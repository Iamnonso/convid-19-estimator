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
    reportedCases,
    periodType,
    timeToElapse,
  } = data;

  const impact = {};

  const severeImpact = {};

  impact.currentlyInfected = reportedCases * 10;

  severeImpact.currentlyInfected = reportedCases * 50;

  const projected = Math.trunc(NumberOfDays(periodType, timeToElapse) / 3);

  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** projected);

  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** projected);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
