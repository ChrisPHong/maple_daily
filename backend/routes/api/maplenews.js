const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const puppeteer = require("puppeteer");
const fs = require("fs/promises");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { List, User, Task } = require("../../db/models");

const router = express.Router();

const validateSignup = [];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const browser = await puppeteer.launch(`headless: "new"`);
    const page = await browser.newPage();
    await page.goto("https://maplestory.nexon.net/news");

    // const news = await page.$$eval("news-container", (news) => {
    //   return news.map((x) => x);
    // });

    // const htmlContent = await page.content();
    // await fs.writeFile("html.txt", htmlContent);
    // console.log(htmlContent, "<<<<<<<<<<< html contennt");

    const news = await page.evaluate(() => {
      // const articles = document.querySelectorAll(".news-item div.photo a");
      const links = document.querySelectorAll(".news-item div.text h3 a");
      // const description = document.querySelectorAll(".news-item div.text");
      const linkText = document.querySelectorAll(".news-item div.text h3 a");
      let descriptions = document.querySelectorAll(
        ".news-item div.text p:not([timestamp]):not([readmore])"
      );
      descriptions = Array.from(descriptions).filter((description) => {
        return (
          description.innerText !== "READ MORE" &&
          !description.innerText.includes("AGO")
        );
      });
      const timestamps = Array.from(
        document.querySelectorAll(".news-item div.text p.timestamp")
      );

      let test = [];
      const pictures = document.querySelectorAll(
        'div[style*="background-image"]'
      );
      const urls = Array.from(pictures).map((div) => {
        const style = window
          .getComputedStyle(div)
          .getPropertyValue("background-image");
        const match = style.match(/url\(["']?([^"']+)["']?\)/);
        return match[1];
      });

      const articles = document.querySelectorAll(".news-item");
      console.log(articles, "<<<<<<<<< articles");

      for (let i = 0; i < links.length; i++) {
        const linkItem = links[i];
        const description = descriptions[i];
        const photoLink = urls[i];
        const header = linkItem.innerText;
        const link = linkItem.href;
        const title = description.innerText;
        const timestamp = timestamps[i].innerText;

        const hash = { header, link, title, photoLink, timestamp };
        test.push(hash);
      }

      return test;
    });

    await browser.close();

    return res.json(news);
  })
);
module.exports = router;
