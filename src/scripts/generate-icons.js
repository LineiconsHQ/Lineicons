const fs = require("fs");
const path = require("path");

function generateSvgMap() {
  const svgMap = {
    regular: {},
    sharp: {},
  };

  const baseDir = path.join(__dirname, "../../assets/svgs");

  // Helper function to traverse the SVG files within a directory
  function traverseDirectory(dir, type) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);

      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isFile() && path.extname(file) === ".svg") {
          const iconName = path.basename(file, ".svg"); // Get SVG name without extension
          const svgContent = fs.readFileSync(filePath, "utf8");

          // Add SVG content to the correct type map (regular or sharp)
          svgMap[type][iconName] = svgContent;
        }
      });
    } else {
      console.warn(`${type} directory does not exist. Skipping traversal.`);
    }
  }

  // Traverse 'regular' directory
  traverseDirectory(path.join(baseDir, "regular"), "regular");

  // Check if 'sharp' directory exists, and traverse it if so
  const sharpDir = path.join(baseDir, "sharp");
  if (fs.existsSync(sharpDir)) {
    traverseDirectory(sharpDir, "sharp");

    // Optional: You can remove this fallback logic if you don't want any fallback
    for (const iconName in svgMap.regular) {
      if (!svgMap.sharp[iconName]) {
        console.warn(
          `No sharp icon found for "${iconName}". Defaulting sharp to regular.`
        );
        svgMap.sharp[iconName] = svgMap.regular[iconName];
      }
    }
  }

  // Save svgMap as a JavaScript object in a separate file
  const outputPath = path.join(__dirname, "../svg-map.js");
  fs.writeFileSync(
    outputPath,
    `export const svgMap = ${JSON.stringify(svgMap, null, 2)};`,
    "utf8"
  );

  console.log("SVG map generated successfully!");
}

// Call the function to generate the svgMap
generateSvgMap();
