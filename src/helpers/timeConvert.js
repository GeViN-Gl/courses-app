export const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60); // отримати кількість годин
  const minutes = totalMinutes % 60; // отримати залишок хвилин
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`; // повернути об'єкт з годинами і хвилинами
};
