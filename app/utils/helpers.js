const getRandomColor = () => {
  var letters = 'BCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const formatTime = (time) => {
  const date = new Date(time);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const result = `${hour > 10 ? hour : `0${hour}`}:${minute > 10 ? minute : `0${minute}`}`;
  return result;
};

export { getRandomColor, formatTime };
