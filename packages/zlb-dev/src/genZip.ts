import fs from "fs-extra";
import path from "path";
import archiver from "archiver";

const DIR_NAME = "dest";

const destZipPath = path.resolve(process.cwd(), `${DIR_NAME}.zip`);
const templateDir = path.join(__dirname, "./zlb-project-template");
function zipDest(zlbDistDir?: string) {
  fs.existsSync(destZipPath) && fs.removeSync(destZipPath);
  const output = fs.createWriteStream(destZipPath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });

  output.on("end", function () {
    console.log("Data has been drained");
  });

  archive.on("warning", function (err) {
    if (err.code === "ENOENT") {
      console.warn(err);
    } else {
      throw err;
    }
  });

  archive.on("error", function (err) {
    throw err;
  });

  archive.pipe(output);

  archive.directory(templateDir, `/`);
  if (zlbDistDir) {
    archive.directory(path.join(process.cwd(), zlbDistDir), `/${zlbDistDir}`);
    const gbcFile = path.join(process.cwd(), "gbc.json");
    if (!fs.existsSync(gbcFile)) {
      throw "根目录需要gbc.json";
    }
    archive.file(gbcFile, { name: "/gbc.json" });
  }

  archive.finalize();
}

export default zipDest;
