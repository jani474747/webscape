const Puppeteer=require("puppeteer")
const fs = require("fs");

async function Declare(){
  const browser = await Puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
    const page = await browser.newPage();
    await page.goto(
        "https://www.google.com/search?q=react+jobs&ei=4duYYpLRJYq94-EPqfK90AE&uact=5&oq=react+jobs&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMggIABCABBDJAzIFCAAQkgMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIABBHOgUIABCRAjoUCC4QgAQQsQMQgwEQxwEQ0QMQ1AI6CAguEIAEELEDOgUILhCABDoLCAAQgAQQsQMQgwE6BAgAEEM6DgguEIAEELEDEMcBEKMCOgsILhDHARCvARCRAjoHCAAQyQMQQzoOCC4QgAQQsQMQxwEQ0QM6CAgAEIAEELEDOggILhCABBDUAjoLCC4QgAQQsQMQ1AI6DQgAELEDEIMBEMkDEEM6CAgAELEDEIMBOgoIABCxAxCDARANOgQIABANOgcIABDJAxANSgQIQRgASgQIRhgAUJseWIgzYOczaANwAngAgAGmAYgB5AqSAQQwLjExmAEAoAEBsAEAyAEIwAEB&sclient=gws-wiz&ibp=htl;jobs&sa=X&ved=2ahUKEwi546uOj4_4AhXh6zgGHQlPDQYQutcGKAF6BAgHEAY#htivrt=jobs&htidocid=DNXJc0LPw_4AAAAAAAAAAA%3D%3D&fpstate=tldetail",
        {
          waitUntil: "networkidle0",
        }
      );
   

      const title = await page.$$eval(
        "#immersive_desktop_root > div > div.lteri > div.zxU94d.gws-plugins-horizon-jobs__tl-lvc > div.vWdgBe.gws-plugins-horizon-jobs__tl-no-filters.A0Xdfb > div.nJXhWc > ul > li > div > div > div.gws-plugins-horizon-jobs__tl-lif > div > div > div.Fol1qc > div.BjJfJf.PUpOsf",
        (titles) => {
          return titles.map((el) => el.textContent);
         
        }
      );

      const company = await page.$$eval(
        "#immersive_desktop_root > div > div.lteri > div.zxU94d.gws-plugins-horizon-jobs__tl-lvc > div.vWdgBe.gws-plugins-horizon-jobs__tl-no-filters.A0Xdfb > div.nJXhWc > ul > li > div > div > div.gws-plugins-horizon-jobs__tl-lif > div > div > div.PuiEXc > div > div.vNEEBe",
        (companies) => {
          return companies.map((el) => el.textContent);
        }
      );
  
      const location = await page.$$eval(
        "#immersive_desktop_root > div > div.lteri > div.zxU94d.gws-plugins-horizon-jobs__tl-lvc > div.vWdgBe.gws-plugins-horizon-jobs__tl-no-filters.A0Xdfb > div.nJXhWc > ul > li > div > div > div.gws-plugins-horizon-jobs__tl-lif > div > div > div.PuiEXc > div > div.Qk80Jf",
        (locations) => {
          return locations.map((el) => el.textContent);
        }
      );
  
      const desc = await page.$$eval(
        "#gws-plugins-horizon-jobs__job_details_page > div > div.YgLbBe.YRi0le > div > span",
        
        (descs) => {
         
          return descs.map((el) => el.textContent);
        }
      );

      let data = [];
    for (let i = 0; i < title.length; i++) {
      data.push({
        title: title[i],
        company: company[i],
        location: location[i],
        description: desc[i],
      });
    }

    let jsondata = { jobs: data };

    console.log(jsondata);
    // console.log(title, company, location, desc);
    // await fs.writeFile("title.json", `${jsondata}`);
    await fs.writeFileSync("jobs.json", JSON.stringify(jsondata));
     
    await browser.close();
  }Declare();