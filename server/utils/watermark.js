
import sharp from 'sharp';


// Helper to determine if a color is close to white
function isWhite([r, g, b], threshold = 240) {
  return r >= threshold && g >= threshold && b >= threshold;
}

// Analyze the image corners to determine if the background is white
async function isImageBackgroundWhite(inputBuffer) {
  try {
    const img = sharp(inputBuffer);
    const { width, height } = await img.metadata();
    if (!width || !height) return false;
    // Sample 4 corners (5x5 px each)
    const sampleSize = 5;
    const regions = [
      { left: 0, top: 0 },
      { left: width - sampleSize, top: 0 },
      { left: 0, top: height - sampleSize },
      { left: width - sampleSize, top: height - sampleSize },
    ];
    let whiteCount = 0;
    for (const region of regions) {
      const buf = await img.extract({ left: region.left, top: region.top, width: sampleSize, height: sampleSize }).raw().toBuffer();
      // Average color in region
      let r = 0, g = 0, b = 0, n = sampleSize * sampleSize;
      for (let i = 0; i < n; i++) {
        r += buf[i * 3];
        g += buf[i * 3 + 1];
        b += buf[i * 3 + 2];
      }
      r = Math.round(r / n);
      g = Math.round(g / n);
      b = Math.round(b / n);
      if (isWhite([r, g, b])) whiteCount++;
    }
    // If at least 3 of 4 corners are white, consider background white
    return whiteCount >= 3;
  } catch {
    return false;
  }
}

// Create an SVG overlay with semi-transparent text, color can be white or gray
function makeSvg(width, height, text, color = '#ffffff', opacity = 0.18, size = 48) {
  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <style>
        .w { fill: ${color}; fill-opacity: ${opacity}; font-size: ${size}px; font-family: Arial, Helvetica, sans-serif; }
      </style>
      <g transform="translate(${width/2}, ${height/2}) rotate(-30)">
        <text text-anchor="middle" class="w">${text}</text>
      </g>
    </svg>
  `);
}


export async function watermarkBuffer(inputBuffer, text = process.env.APP_WATERMARK || 'MarkLight') {
  const img = sharp(inputBuffer).rotate();
  const meta = await img.metadata();
  // Determine watermark color
  const bgIsWhite = await isImageBackgroundWhite(inputBuffer);
  const color = bgIsWhite ? '#888888' : '#ffffff'; // gray if white bg, else white
  const svg = makeSvg(meta.width || 1200, meta.height || 800, text, color);
  return await img
    .composite([{ input: svg }])
    .jpeg({ quality: 90 })
    .toBuffer();
}

export async function addWatermark(filePath, text = process.env.APP_WATERMARK || 'MarkLight') {
  const fs = await import('fs/promises');
  const path = await import('path');
  const input = await sharp(filePath).toBuffer();
  const output = await watermarkBuffer(input, text);
  // Always write to a new file with a unique name
  const ext = path.extname(filePath) || '.jpg';
  const base = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  const newFile = path.join(dir, `${base}-wm_${Date.now()}${ext}`);
  await sharp(output).toFile(newFile);
  return newFile;
}

export async function addWatermarkToMany(paths, text) {
  for (const p of paths) {
    try { await addWatermark(p, text); } catch (e) { console.error('Watermark error for', p, e.message); }
  }
}
