// Define an array of gradient color pairs to cycle through
const colors = [
  ['#FFFF00', '#FFA500'],  // yellow to orange
  ['#FFA500', '#FF0000'],  // orange to red
  ['#FF0000', '#FFFF00']   // red to yellow (loop back to start)
];

// 'step' is a value between 0 and 1 that represents progress between two colors
let step = 0;

// 'colorIndex' tracks which color pair we are currently transitioning from
let colorIndex = 0;

// Get a reference to the HTML element with ID 'background' to apply the gradient
const gradient = document.getElementById('background');

/**
 * This function blends two hex colors together based on a given factor (0 to 1)
 * @param {string} color1 - starting color (e.g. '#FFFF00')
 * @param {string} color2 - ending color (e.g. '#FFA500')
 * @param {number} factor - how far we are between the two colors (0=start, 1=end)
 * @returns {string} - the interpolated color in hex format
 */
function interpolateColor(color1, color2, factor) {
  // Convert each color from hex to an array of RGB values
  const c1 = color1.match(/\w\w/g).map(c => parseInt(c, 16));  // e.g., '#FF0000' → [255, 0, 0]
  const c2 = color2.match(/\w\w/g).map(c => parseInt(c, 16));

  // Linearly interpolate each RGB channel (R, G, B) based on the factor
  const result = c1.map((v, i) => Math.round(v + factor * (c2[i] - v)));

  // Convert the RGB result back to a hex string and return it
  return `#${result.map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * This function runs the animation by continuously updating the background gradient
 */
function animateGradient() {
  // Get the index of the next color pair (loop around using modulo)
  let nextIndex = (colorIndex + 1) % colors.length;

  // Extract the current color pair and the next color pair
  let [startA, startB] = colors[colorIndex];
  let [endA, endB] = colors[nextIndex];

  // Interpolate between the current and next colors based on 'step'
  let colorA = interpolateColor(startA, endA, step);  // top color
  let colorB = interpolateColor(startB, endB, step);  // bottom color

  // Apply the new gradient to the background element
  gradient.style.background = `linear-gradient(180deg, ${colorA}, ${colorB})`;

  // Advance the step slightly for the next frame
  step += 0.005;

  // If step has completed a full transition, move to the next color pair
  if (step >= 1) {
    step = 0;                // reset step to begin new transition
    colorIndex = nextIndex;  // update current color pair index
  }

  // Request the next frame of animation (loop)
  requestAnimationFrame(animateGradient);
}

// Start the gradient animation when the page loads
animateGradient();
