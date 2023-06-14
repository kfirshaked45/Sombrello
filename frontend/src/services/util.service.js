export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  isBackgroundDark,
  reorder,
  getModalPosition,
  dueDateFormat,
  formatDate,
  hasTimestampPassed,
  formatDateAttachment,
  getDominantColorFromImage,
};

function makeId(length = 6) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ];
  var txt = '';
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60;
  const DAY = 1000 * 60 * 60 * 24;
  const WEEK = 1000 * 60 * 60 * 24 * 7;

  const pastTime = getRandomIntInclusive(HOUR, WEEK);
  return Date.now() - pastTime;
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function isBackgroundDark(color) {
  if (!color) return true;

  let r;
  let g;
  let b;
  if (color.match(/^rgb/)) {
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  if (hsp > 127.5) {
    return false;
  } else {
    return true;
  }
}

function reorder(array, index1, index2) {
  const [removed] = array.splice(index1, 1);
  array.splice(index2, 0, removed);
}
function getModalPosition(type, ref) {
  const rect = ref.current.getBoundingClientRect();
  const pos = { top: rect.top, left: rect.left };
  const offset = window.innerWidth - rect.right < 150 ? 130 : 0;

  const positionLookup = {
    Members: { top: rect.top - 150, left: rect.left - offset },
    'Members ': { top: rect.bottom + 20, left: rect.left - offset },
    Labels: { top: rect.top - 150, left: rect.left - offset - 30 },
    Checklist: { top: rect.top - 50, left: rect.left - offset },
    Dates: { top: rect.top - 200, left: rect.left - offset - 50 },
    Attachments: { top: rect.top - 10, left: rect.left - offset - 30 },
    Group: { top: rect.top + 40, left: rect.left + 220 },
    'Create Label': { top: rect.top - 305, left: rect.left - offset - 260 },
    'Edit Label': { top: rect.top - 305, left: rect.left - offset - 260 },
  };

  if (positionLookup[type]) {
    const { top, left, maxTop } = positionLookup[type];
    pos.top = Math.min(top, maxTop || top);
    pos.left = left;
  }

  return pos;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  // const now = new Date();

  const options = {};
  // if (date.getFullYear() !== now.getFullYear()) {
  //   options.year = 'numeric';
  // }
  options.month = 'short';
  options.day = 'numeric';

  return date.toLocaleDateString(undefined, options);
}

function hasTimestampPassed(timestamp) {
  return Date.now() >= timestamp;
}

function dueDateFormat(dueDate) {
  const date = new Date(dueDate);
  const options = { day: 'numeric', month: 'short' };
  const formattedDate = date.toLocaleString('en-US', options);
  return formattedDate;
}
function formatDateAttachment(dateStr) {
  const date = new Date(dateStr);

  const formattedDate = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const formattedString = `Added at ${formattedDate} by`;
  return formattedString;
}

function getDominantColorFromImage(imgUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
      const imageData = context.getImageData(0, 0, img.width, img.height);
      const pixels = imageData.data;

      // Count color occurrences
      const colorOccurrences = {};
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const rgb = `rgb(${r},${g},${b})`;

        if (colorOccurrences[rgb]) {
          colorOccurrences[rgb]++;
        } else {
          colorOccurrences[rgb] = 1;
        }
      }

      // Find the dominant color
      let dominantColor = null;
      let maxOccurrences = 0;
      for (const color in colorOccurrences) {
        if (colorOccurrences[color] > maxOccurrences) {
          dominantColor = color;
          maxOccurrences = colorOccurrences[color];
        }
      }

      resolve(dominantColor);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
}
