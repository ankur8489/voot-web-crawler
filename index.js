const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const dirPath = path.resolve(__dirname);

/* puppeteer is a library built by google to perform automated testing in headless chrome*/
puppeteer.launch({headless : false}).then(async browser => {
	const page = await browser.newPage();
	  //go to voot.com and wait until the DOM is loaded
	await page.goto('https://www.voot.com',{waitUntil: 'domcontentloaded'});
	  //extract all the <a> tags
	await page.waitForSelector('a');
	  //extract the href attribute values from the extracted <a> tags
	const vootURLs = await page.evaluate(() => {
		const links = Array.from(document.querySelectorAll('a'));
		return links.map(link => link.href);
	});
  
	let pageSourceArray = [];
	//loop through each href value and visit that page to obtain the DOM
	for(let i=0; i < vootURLs.length; i++){
		let vootURL = vootURLs[i];
		if(vootURL.indexOf('voot.com') !== -1){
			await page.goto(vootURL,{waitUntil: 'domcontentloaded'});
			const pageSource = await page.content();
			let kvpair = {};
			kvpair[vootURL] = pageSource;
			pageSourceArray.push(kvpair);
		}
	}
	//After obtaining all the page's DOM write it to a file with URL as key and Page Source as value
	writeResultsToFile(pageSourceArray);	  
	
	await browser.close();
});

//this function creates a directory named 'results' if it doesn't exists
let createDirectory = folderPath => {
	try {
		fs.mkdirSync(folderPath);
		console.log('Directory created');
	} catch (err) {
		if (err.code === 'EEXIST') {
			console.log('Directory already exists');
		} else {
			throw err;
		}
	}
};

//this function creates a file named 'crawler.json' and writes it inside '/results' folder
let writeResultsToFile = pageSourceArray => {
	let folderPath = dirPath + '/results';
	createDirectory(folderPath);  
	fs.writeFile(folderPath + '/crawler.json', JSON.stringify(pageSourceArray), err => {
		if (err) {
			console.log('Error occurred while saving the results');
		} else {
			console.log('Crawler Results Saved!');
		}
	});
};