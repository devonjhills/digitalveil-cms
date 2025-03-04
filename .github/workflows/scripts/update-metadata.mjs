import fs from "fs";
import path from "path";
import matter from "gray-matter";
import crypto from "crypto";

const contentDir = path.join(process.cwd(), "outstatic", "content", "posts");
const metadataFile = path.join(
  process.cwd(),
  "outstatic",
  "content",
  "metadata.json"
);

async function updateMetadata() {
  try {
    // 1. Read existing metadata.json
    let metadataJson = { commit: "", generated: "", metadata: [] };
    if (fs.existsSync(metadataFile)) {
      const metadataFileContent = fs.readFileSync(metadataFile, "utf8");
      metadataJson = JSON.parse(metadataFileContent);
    }

    const currentCommit = process.env.GITHUB_SHA;
    const generatedTime = new Date().toGMTString();
    metadataJson.commit = currentCommit;
    metadataJson.generated = generatedTime;

    // 2. Find new or modified MDX files in content directory
    const files = fs.readdirSync(contentDir);
    for (const file of files) {
      if (file.endsWith(".mdx")) {
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const frontmatter = matter(fileContent);
        const articleMetadata = frontmatter.data;

        // 3. Generate __outstatic metadata
        const contentHash = crypto
          .createHash("md5")
          .update(fileContent)
          .digest("hex");
        const outstaticMetadata = {
          __outstatic: {
            commit: currentCommit,
            hash: contentHash,
            path: path.relative(process.cwd(), filePath).replace(/\\/g, "/"), // Normalize path for JSON
          },
        };

        let articleSlug = articleMetadata.slug; // Get the slug value
        if (articleSlug && articleSlug.startsWith("/")) {
          articleSlug = articleSlug.substring(1); // Remove leading slash
        }

        // 4. Create the complete metadata object
        const newMetadataEntry = {
          ...outstaticMetadata,
          ...articleMetadata,
          slug: articleSlug, // Use the modified slug
          collection: "posts", // Assuming collection is always 'posts'
        };

        // Check if entry with same path already exists to avoid duplicates
        const existingIndex = metadataJson.metadata.findIndex(
          (entry) =>
            entry.__outstatic.path === newMetadataEntry.__outstatic.path
        );
        if (existingIndex !== -1) {
          metadataJson.metadata[existingIndex] = newMetadataEntry; // Update existing entry
          console.log(
            `Updated metadata for: ${newMetadataEntry.__outstatic.path}`
          );
        } else {
          metadataJson.metadata.push(newMetadataEntry); // Add new entry
          console.log(
            `Added metadata for: ${newMetadataEntry.__outstatic.path}`
          );
        }
      }
    }

    // 5. Write updated metadata.json
    console.log("Writing metadata.json to path:", metadataFile);
    fs.writeFileSync(metadataFile, JSON.stringify(metadataJson, null, 2));
    console.log("metadata.json updated successfully.");
  } catch (error) {
    console.error("Error updating metadata.json:", error);
    process.exit(1); // Exit with error code to indicate failure in GitHub Actions
  }
}

updateMetadata();
