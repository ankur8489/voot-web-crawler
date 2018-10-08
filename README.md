# voot-web-crawler
Web Crawler using headless chrome

# Pre-requisites
 Node.js version 10.11.0

# How to run the Application?
	Clone the repository on your machine
	Go to the home directory of the cloned repository i.e. voot-web-crawler
	Execute the command 'npm install'
	Once the required node_modules are downloaded, execute the command 'node index.js'
	After the successful execution, you will see a directory named 'results'
	Go inside 'results' directory and open 'crawler.json' file to see the results
	
# What to do if the application results in timeout?
	During the course of the execution, if you run into an error like "(node:12232) UnhandledPromiseRejectionWarning: TimeoutError: Navigation Timeout Exceeded: 30000ms exceeded". You can introduce a synthetic delay by passing an additional parameter inside await page.goto statement for e.g.: await page.goto(story,{waitUntil: 'domcontentloaded', timeout: 555555}); and rerun the application. This error occurs if the internet connection is slow.
	
