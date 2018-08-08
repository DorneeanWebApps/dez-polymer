import moment from 'moment/src/moment';

const currentYear = parseInt(moment().format('YYYY'));

const generateBeginYear = (decadesNo, minYear) => {
    return minYear ? minYear : (Math.ceil(currentYear / 10) - decadesNo) * 10
}

const generateEndYear = (currentYear, maxYear) => {
    return maxYear ? maxYear : currentYear
}

const newDecadeBuider = (beginYear, maxYear) => {
    let endYear = Math.floor(beginYear / 10) * 10 + 9 < maxYear ? Math.floor(beginYear / 10) * 10 + 9 : maxYear;
    let decade = {
        beginYear: beginYear,
        endYear: endYear,
        decadeText: `${beginYear} - ${endYear}`
    }
    return decade;
}

const addDecades = (intermediarValue, endValue, decadesArray) => {
    if (Math.floor(intermediarValue / 10) <= Math.floor(endValue / 10)) {
        decadesArray = [...decadesArray, newDecadeBuider(intermediarValue, endValue)];
        intermediarValue = (Math.floor(intermediarValue / 10) + 1) * 10;
        return addDecades(intermediarValue, endValue, decadesArray);
    } else {
        return decadesArray;
    }
}

export const generateDecades = (decadesNo, minYear, maxYear) => {
    const beginValue = generateBeginYear(decadesNo, minYear);
    const endValue = generateEndYear(currentYear, maxYear);
    return addDecades(beginValue, endValue, []);
}

export const generateYearsArray = (intermediateYr, toYear, yearsArray = []) => {
    if (intermediateYr <= toYear) {
        yearsArray = [...yearsArray, { value: intermediateYr }];
        intermediateYr++;
        return generateYearsArray(intermediateYr, toYear, yearsArray);
    } else {
        return yearsArray;
    }
}