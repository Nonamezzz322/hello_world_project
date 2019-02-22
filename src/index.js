const puppeteer = require('puppeteer');
const fs = require('fs');

crawlPage();

function crawlPage() {
    (async () => {
    const items = [
        'https://www.amazon.com/American-Metalcraft-SNB2-Chrome-Spiral/dp/B004FNXP50',
        'https://www.amazon.com/American-Metalcraft-MTSH5-Compartment-Holder/dp/B00CIUEX7Q',
        'https://www.amazon.com/American-Metalcraft-CSPT2-Tapered-Ceramic/dp/B00AKBD6M8',
        'https://www.amazon.com/American-Metalcraft-BNCB84-Birdnest-Coffee/dp/B01LYDTHV0/ref=olp_product_details?_encoding=UTF8&me=',
        'https://www.amazon.com/American-Metalcraft-PBC25-Porcelain-Creamer/dp/B0030UMV22',
        'https://www.amazon.com/Bar-Maid-CR804-FUNNEL-DRAIN/dp/B014PB91S6/ref=sr_1_11?s=kitchen&ie=UTF8&qid=1545832413&sr=1-11&keywords=Bar+Maid&refinements=p_89%3ABar+Maid%2Cp_36%3A1000-99999999%2Cp_n_availability%3A1248816011',
        'https://www.amazon.com/Dexter-Russell-S120-Boston-Style-Oyster-Sani-Safe/dp/B008RBU752',
        'https://www.amazon.com/Dexter-Russell-S135F-PCP-Boning-Knife-Sani-Safe/dp/B001PUSZ10/ref=sr_1_77?s=kitchen&ie=UTF8&qid=1545817111&sr=1-77&keywords=Dexter-Russell&refinements=p_89%3ADexter-Russell%2Cp_36%3A1000-99999999%2Cp_n_availability%3A1248816011',
        'https://www.amazon.com/Dexter-Russell-V133-8PCP-V-Lo-Fillet-Knife/dp/B00144EME6',
        'https://www.amazon.com/Edlund-Heavy-Duty-Tongs-inch/dp/B0187ZJHBC',
        'https://www.amazon.com/Crescendo-Waiters-Corkscrew-Wine-Opener/dp/B0053OAUKI/ref=sr_1_5?s=kitchen&ie=UTF8&qid=1545899192&sr=1-5&keywords=Franmara&refinements=p_89%3AFranmara%2Cp_36%3A1000-99999999%2Cp_n_availability%3A1248816011',
        'https://www.amazon.com/Franmara-2037-Boomerang-Soft-touch-Corkscrew/dp/B009ATKILI/ref=sr_1_6?s=kitchen&ie=UTF8&qid=1545899192&sr=1-6&keywords=Franmara&refinements=p_89%3AFranmara%2Cp_36%3A1000-99999999%2Cp_n_availability%3A1248816011',
        'https://www.amazon.com/Murano-Waiters-Corkscrew-Translucent-Franmara/dp/B008F05MAU?th=1',
        'https://www.amazon.com/Franmara-Capitano-Waiters-Corkscrew-Burgundy/dp/B007DZTUQA',
        'https://www.amazon.com/Glass-Decanter-Funnel-Aerator-Aerates/dp/B00389VX06',
        'https://www.amazon.com/Franmara-Cork-Retriever-1030/dp/B001PHEBMK/ref=olp_product_details?_encoding=UTF8&me=',
        'https://www.amazon.com/Royal-Industries-Round-Skewers-Stainless/dp/B008NB4I6U',
        'https://www.amazon.com/Lot-Bakery-Cake-PINK-12x12x5/dp/B00G82U702/ref=sr_1_36?s=kitchen&ie=UTF8&qid=1545987304&sr=1-36&keywords=Southern+Champion&refinements=p_36%3A1000-99999999%2Cp_n_availability%3A1248816011%2Cp_89%3ASouthern+Champion',
        'https://www.amazon.com/Cake-Board-Circle-Count-25/dp/B00GIXTU4A',
        'https://www.amazon.com/Bon-Chef-5151-Stainless-Diameter/dp/B00JHQMFBA',
        'https://www.amazon.com/ROY-PIE-10-Industries-Commercial/dp/B008NAJQHM/ref=sr_1_104?m=A3VDPJJGOT4FVN&s=merchant-items&ie=UTF8&qid=1545992312&sr=1-104',
        'https://www.amazon.com/lb-White-Paper-Bag-Bundle/dp/B0037XOOQ8',
        'https://www.amazon.com/Royal-Industries-Marker-Aluminum-Commercial/dp/B008NAJNZW',
        'https://www.amazon.com/Royal-Industries-Marker-Aluminum-Commercial/dp/B008NAJKQ4/ref=olp_product_details?_encoding=UTF8&me=',
        'https://www.amazon.com/Royal-Industries-Marker-Aluminum-Commercial/dp/B008NAJM6W/ref=olp_product_details?_encoding=UTF8&me=&th=1',
        'https://www.amazon.com/Royal-Industries-Marker-Aluminum-Commercial/dp/B008NAJN6Q/ref=olp_product_details?_encoding=UTF8&me=&th=1',
        'https://www.amazon.com/Royal-Industries-Marker-Aluminum-Commercial/dp/B008NAJP0K/ref=olp_product_details?_encoding=UTF8&me=&th=1',
        'https://www.amazon.com/Royal-Industries-Stainless-16-Silver/dp/B008N3DQP2',
        'https://www.amazon.com/Royal-Industries-ROY-0084-Stainless/dp/B008NB37FS',
        'https://www.amazon.com/Royal-Industries-Pizza-Tapered-16/dp/B00LY2MGTQ/ref=sr_1_51?s=kitchen&srs=9309087011&ie=UTF8&qid=1546083027&sr=1-51&refinements=p_36%3A1000-99999999%2Cp_n_availability%3A1248816011%2Cp_89%3ARoyal+Industries',
        'https://www.amazon.com/Royal-Industries-Flat-Pizza-10-inch/dp/B001ET7C1Q/ref=sr_1_88?s=kitchen&srs=9309087011&ie=UTF8&qid=1546084242&sr=1-88&refinements=p_36%3A1000-99999999%2Cp_n_availability%3A1248816011%2Cp_89%3ARoyal+Industries',
        'https://www.amazon.com/Fiesta-18-Ounce-Jumbo-Cup-Turquoise/dp/B0000CEP8E/ref=sr_1_11?m=A3T0NB9XYEWVOR&s=merchant-items&ie=UTF8&qid=1546089884&sr=1-11',
        'https://www.amazon.com/Town-Foodservice-22806-Serving-Spoon/dp/B07DP556N8/ref=sr_1_3?s=kitchen&ie=UTF8&qid=1547546470&sr=1-3&keywords=Town+Foodservice&refinements=p_89%3ATown+Food+Service%2Cp_36%3A1000-99999999%2Cp_n_availability%3A1248816011',
        'https://www.amazon.com/American-Metalcraft-CSPT2-Tapered-Ceramic/dp/B00AKBD6M8',
        'https://www.amazon.com/Vollrath-69302-2-3-Aluminum-Sauce/dp/B003A4EGH6',
        'https://www.amazon.com/Anchor-Hocking-Gallon-Glass-Jar/dp/B07GL4N27V',
        'https://www.amazon.com/Tamper-FMP-205-1009-Stomper-Alternate/dp/B0037XJCGK',
        'https://www.amazon.com/American-Metalcraft-PBC25-Porcelain-Creamer/dp/B0030UMV22',
        'https://www.amazon.com/Bunn-20109-0000-17-252-Case/dp/B01JELO3JO',
        'https://www.amazon.com/Mercer-Culinary-Hells-Hi-Heat-Utility/dp/B00DT1XYBY',
        'https://www.amazon.com/Town-Foodservice-22806-Serving-Spoon/dp/B07DP556N8',
        'https://www.amazon.com/American-Metalcraft-DD5703-Plastic-Docker/dp/B0015ZMC9G',
        'https://www.amazon.com/Tablecraft-602R-Chrome-Double-Sided-Packet/dp/B00ATJI6QM',
        'https://www.amazon.com/ARY-VacMaster-Chamber-Packaging-Machines/dp/B071ZDXS8R',
        'https://www.amazon.com/Tablecraft-Chrome-Plated-Jelly-Packet/dp/B01M0C7AWH',
        'https://www.amazon.com/Taylor-Precision-6084J12-Candy-Thermometer/dp/B004JV4Q1A',
        'https://www.amazon.com/Vollrath-Company-46961-Serving-11-Inch/dp/B003A1PRMM',
        'https://www.amazon.com/Zeroll-2040-Universal-Portion-Control/dp/B0002U33N4/ref=olp_product_details?_encoding=UTF8&me=',
        'https://www.amazon.com/Murano-Waiters-Corkscrew-Translucent-Colors/dp/B008F05MEQ?th=1',
        'https://www.amazon.com/Cambro-Camwear-RFSCWC2135-4-Quart-Container/dp/B004NEWCKA/ref=sr_1_97?m=A2Q7UD2W9V6SH2&s=merchant-items&ie=UTF8&qid=1548855633&sr=1-97',
        'https://www.amazon.com/Carlisle-40000C14-Commercial-Polyester-Bristles/dp/B00215XPAO?th=1',
        'https://www.amazon.com/Bromley-Decaffeinated-Bags-100-Count-Units/dp/B000YTAXBS/ref=sr_1_1_a_it?ie=UTF8&qid=1549551523&sr=8-1&keywords=B000YTAXBS',
        'https://www.amazon.com/Steep-Bigelow-Breakfast-Caffeinated-Individual/dp/B01C4664W0/ref=sr_1_2?keywords=072310177017&qid=1549988995&s=gateway&sr=8-2',
        'https://www.amazon.com/Swingline-Products-positive-material-durability/dp/B004E2QF5Y/ref=sr_1_5?m=A15D5KIZP3X5LT&s=merchant-items&ie=UTF8&qid=1550135853&sr=1-5',
    ]
     
	const args = [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--blink-settings=imagesEnabled=false",
        ];
    const options = {
        args,
        headless: true,
        ignoreHTTPSErrors: true,
    };

    const browser = await puppeteer.launch(options);

    const page = await browser.newPage();

    for(let i = 0; i < items.length; i += 1) {
        await page.goto(items[i]);
        // price
        let price;
        let priceString;
        try {
            price = await page.$eval('#priceblock_ourprice', as => as.innerText);
        } catch {
            try {
                priceString  = await page.$eval('#olp-upd-new > span > a', as => as.innerText);
                price = priceString.split('from ')[1];
            } catch {
                try {
                    priceString = await page.$eval('#olp-upd-new-used > span > a', as => as.innerText);
                    price = priceString.split('from ')[1];
                } catch {
                    price = 'no price';
                };
            };
        }; //

        // stars
        let stars;
        try {
            stars = await page.$eval('#acrPopover > span.a-declarative > a > i.a-icon.a-icon-star > span', as => as.innerText)
        } catch {
            stars = 'no customer ratings';
        };

        // title
        const title = await page.$eval('#title > span', as => as.innerText);
        // brand
        const brand = await page.$eval('#bylineInfo', as => as.innerText);
        //url
        const url = await page.url();
        // buyBox
        let buyBox;
        try {
            buyBox = await page.$eval('#add-to-cart-button', () => true)
        } catch {
            buyBox = false;
        };
        // category
        const category = await page.$eval('#wayfinding-breadcrumbs_feature_div > ul > li:nth-child(1) > span > a', as => as.innerText);
        // ASIN
        const asin =  url.match("/([A-Z0-9]{10})")[1];
        // BSR - работает, но слишком грузит память, найти другой способ
        const bsr = ((await page.content()).match("([#0-9]*[,][0-9]+ in)")[0]).split(' in')[0];

        // In Stock
        let stock = false;
        if(price !== 'no price') {
            stock = true;
        }

        // sellers


        
        const obj = {
            name: title,
            url: url,
            price: price,
            brand: brand,
            asin: asin,
            sellers: '-',
            stars: stars,
            buyBox: buyBox,
            prime: '-',
            BSR: bsr,
            category: category,
            inStock: stock,
            amazon: '-'
        }
        console.log(obj, i + 1);
        // fs.writeFileSync(`${items[i]}.json`, obj, () => {});
    }

    await page.close();
    await process.exit(1);

    })().catch((error) => {
        console.error(error);
        process.exit(1);
    });;
}
