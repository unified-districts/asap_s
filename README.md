# ASAP_s

*DOCUMENTATION IN PROGRESS*

A gulp boiler plate for a wordpress theme

## Features

## Prerequisite
* Requires node.js and gulp
* Requires local WordPress environment (works best with https://github.com/530medialab/asap-wp)

## Installation
Clone into Themes directory

    git clone http://github.com/530medialab/asap_s.git <project-name>
    
* remove `.git` directory in new theme directory (delete or run command `sudo rm -rf .git`)

Navigate to theme directory and install Node Packages

    npm install


## Configuration
1. 5-step find and replace on the name in all the templates
    * Search for: `'asap_s'` and replace with: `'<project-name>'` (inside single quotations) to capture the text domain.
    * Search for: `asap_s_` and replace with: `<project-name>_` to capture all the function names.
    * Search for: `Text Domain: asap_s` and replace with: `Text Domain: <project-name>` in style.css.
    * Search for: ` asap_s` and replace with: ` <project-name>` (with a space before it) to capture DocBlocks.
    * Search for: `asap_s-` and replace with: `<project-name>-` to capture prefixed handles.
2. Update BrowserSync proxy
    
        proxy: 'local.<project-name>.com'
    
    
## Usage

`gulp` command for developing

`gulp compile` command for compiling (scss, js, images)


##### CSS Workflow
* assets/styles/scss/*.scss => dist/styles/styles.css 
* assets/styles/vendor/*.css => dist/styles/vendor.css

##### JavaScript Workflow
* assets/scripts/*.js => dist/scripts/*.min.js
* assets/scripts/vendor/*.js => dist/scripts/vendor.min.js

##### Image Workflow
* assets/images/* => dist/images/*
   

## Images

all images in /assets/images/
    - will get minified
    
## BowerSync

set local url

## Watching

scss changes

js changes

image changes


