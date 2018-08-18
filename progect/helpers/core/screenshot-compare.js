import Jimp from 'jimp';

/**
 * @memberOf Helpers
 * @function compareScreenshots
 * @param {string} screenshotOne - First Base64 encoded screenshot in PNG format.
 * @param {string} screenshotTwo - Second Base64 encoded screenshot in PNG format.
 * @example
 *  const distance = await browser.helpers.compareScreenshots(one, two);
 */
export default async function compareScreenshots(screenshotOne, screenshotTwo) {
  const imageOne = await Jimp.read(Buffer.from(screenshotOne, 'base64'));
  const imageTwo = await Jimp.read(Buffer.from(screenshotTwo, 'base64'));

  const distance = await Jimp.distance(imageOne, imageTwo);

  return distance;
}
