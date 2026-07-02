const puppeteer = require("puppeteer-core");
const path = require("path");

const chromePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const htmlPath = path.resolve(
  __dirname,
  "../../entrega/infografico.html"
);
const pdfOut = path.resolve(
  __dirname,
  "../../entrega/infografico.pdf"
);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  // Viewport matches design width; tall for full painting
  await page.setViewport({ width: 1080, height: 2100, deviceScaleFactor: 2 });
  await page.goto("file://" + htmlPath, { waitUntil: "networkidle0" });
  // Wait a bit for font-face load
  await new Promise((r) => setTimeout(r, 500));

  await page.pdf({
    path: pdfOut,
    printBackground: true,
    width: "1080px",
    height: "2100px",
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: false,
  });

  await browser.close();
  console.log("PDF gerado:", pdfOut);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
