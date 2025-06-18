// utils/calculateCalories.js
function calculateCalories({ age, height, weight, gender, activityLevel, goal }) {
  if (!age || !height || !weight || !gender || !activityLevel || !goal) return null;

  let bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  let calories = bmr * activityFactors[activityLevel];

  switch (goal) {
    case 'maintain': break;
    case 'mildLoss': calories -= 250; break;
    case 'extremeLoss': calories -= 500; break;
    case 'gain': calories += 300; break;
    default: break;
  }

  return Math.round(calories);
}

module.exports = calculateCalories;
