## Setting Up Your Gulp Dev Environment in 12 Easy Steps

##### Why bother?
Task managers like Gulp let you be lazy/smart and code faster/easier 
##### What you need to know: A few terminal commands
* cd = move to a directory (folder)
* mkdir = create a new directory
* touch = create a new file
* npm = node package manager
* -g = global (you will only have to install on your computer once)
* sudo = super user do (forces your computer to install things)
<br><br>


**1)  Open terminal and move to your project folder or make a folder for your project and then move to it**
```sh
$ mkdir gulp-setup
$ cd gulp-setup
```
<br>


**2)  Install Gulp**
```sh
$ npm install -g gulp
```
**Note:** Warnings are okay, but if you get any errors try installing again as sudo
```sh
$ sudo npm install -g gulp
```
<br>


**3)  Initialize your project and follow the steps to create a package.json file**
```sh
$ npm init
```

**Note:** You can choose whether or not you want to enter any information during this initialization. You can just keep pressing enter at each step to accept the blank or default values for each field. When you get to the is this ok question, press enter to answer yes.

**Note 2:** From now on, you’ll use the package.json file to hold the libraries or packages that your project depends on. The libraries get added to package.json automatically whenever you write the following in terminal:
```sh
$ npm install nameOfLibrary --save-dev
```
<br>


**4)  Add Gulp to package.json as a dependency**
```sh
$ npm install gulp --save-dev
```
<br>


**5)  Set up some more folders to organize your project and help automate your workflow**
* Create a folder that will hold all of your html, css/scss, js. I call it app, but you do you
```sh
$ mkdir app
```
*  The new folder, make folders for your css, scss, and js files
```sh
$ cd app
$ mkdir css
$ mkdir scss
$ mkdir js
```
* Move up one level back to your main project folder to begin the Gulp setup
```sh
$ cd ..
```	
<br>


**6)  Create a file to hold your Gulp scripts**
```sh
$ touch gulpfile.js
```
<br>


**7)  Install the other libraries you want to use**
* Gulp-sass transpiles sass into css
```sh
$ npm install gulp-sass --save-dev
```
* Browser-sync reloads your browser whenever you save a change to your code
```sh
$ npm install browser-sync --save-dev
```
* Gulp-autoprefixer adds all the browser vendor prefixes for you 
```sh
$ npm install gulp-autoprefixer --save-dev
```
<br>


**8)  Open up your gulpfile.js in Sublime or whatever text editor you use. Now write your Gulp scripts**
```javascript
// add all of your libraries
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// function to convert sass into css
gulp.task('sass', function() {
	return gulp.src('app/scss/app.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// function to update and refresh browser
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		online: true
	});
});

// function that calls the sass and browserSync functions when you save a change to a .scss, .js, or .html file
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});
```

**Note:** If you didn’t use **app** as the name for the folder within your project folder, you’ll have to change every app in the code above to the name you used
<br><br>


**9)  Now open your package.json file in Sublime and add the name for your gulp task in the “scripts” object. There’s probably already a test task in the “scripts” object, you can delete it if you want to and just write the following:**
```javascript
“scripts”: {
	“gulp”: “gulp”,
	“gulp watch”: “watch”
},
```
<br>


**10)  In terminal, move back into your app folder and create an index.html file. Browser-sync will look for this file when refreshing the browser**
```sh
$ cd app
$ touch index.html
```
<br>


**11)  That’s pretty much it. Just move back to your project folder in terminal and start your task runner. As long as something is in your index.html file, it will now show up in your browser**
```sh
$ cd ..
$ gulp watch
```

**Bonus:** Browser-sync also creates a temporary server. Check terminal for the external url that you can send to people while Gulp is running
<br><br>


 **12)  Maybe spend your extra free time making smoothies**