import sharp from 'sharp';

async function generateIcon() {
  const gradientSvg = `
    <svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b0000;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" fill="url(#grad)" />
    </svg>
  `;

  // First resize the logo so it fits well inside the icon, leaving some padding
  const logoBuffer = await sharp('src/assets/Logo_diamond.png')
    .resize(800, 800, { fit: 'inside' })
    .toBuffer();

  await sharp(Buffer.from(gradientSvg))
    .composite([
      {
        input: logoBuffer,
        gravity: 'center'
      }
    ])
    .toFile('assets/icon.png');

  console.log('Icon generated successfully!');
}

generateIcon().catch(console.error);
