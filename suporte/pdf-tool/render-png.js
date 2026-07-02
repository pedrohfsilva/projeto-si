const puppeteer = require("puppeteer-core");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 2100, deviceScaleFactor: 2 });
  await page.goto(
    "file://" +
      path.resolve(__dirname, "../../entrega/infografico.html"),
    { waitUntil: "networkidle0" }
  );
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.resolve(__dirname, "../../entrega/infografico.png"),
    type: "png",
    clip: { x: 0, y: 0, width: 1080, height: 2100 },
    omitBackground: false,
  });
  await browser.close();
  console.log("PNG gerado.");
})();
