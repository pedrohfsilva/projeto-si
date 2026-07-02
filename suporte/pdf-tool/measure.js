const puppeteer = require("puppeteer-core");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 3000 });
  await page.goto("file://" + path.resolve(__dirname, "../../entrega/infografico.html"), {
    waitUntil: "networkidle0",
  });
  await new Promise((r) => setTimeout(r, 400));
  const height = await page.evaluate(() => {
    const el = document.querySelector(".page");
    return el.getBoundingClientRect().height;
  });
  console.log("altura real do .page:", height);
  await browser.close();
})();
