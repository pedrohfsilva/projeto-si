const puppeteer = require("puppeteer-core");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1600, deviceScaleFactor: 2 });
  await page.goto(
    "file://" +
      path.resolve(__dirname, "../../entrega/infografico.html"),
    { waitUntil: "networkidle0" }
  );
  await new Promise((r) => setTimeout(r, 400));
  // Measure the real content height so the PNG has no empty strip at the bottom.
  const height = await page.evaluate(() =>
    Math.ceil(document.querySelector(".page").getBoundingClientRect().height)
  );
  await page.setViewport({ width: 1080, height, deviceScaleFactor: 2 });
  await new Promise((r) => setTimeout(r, 150));
  await page.screenshot({
    path: path.resolve(__dirname, "../../entrega/infografico.png"),
    type: "png",
    clip: { x: 0, y: 0, width: 1080, height },
    omitBackground: false,
  });
  await browser.close();
  console.log("PNG gerado.", `(${height}px)`);
})();
