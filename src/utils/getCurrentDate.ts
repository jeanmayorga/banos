export function getCurrentDate() {
  const currentDate = new Date()
    .toLocaleDateString('es', {
      timeZone: 'America/Guayaquil',
    })
    .split('/');
  const day = ('0' + currentDate[0]).slice(-2);
  const month = ('0' + currentDate[1]).slice(-2);
  const year = currentDate[2];
  const formatted = `${year}-${month}-${day}`;

  return formatted;
}
