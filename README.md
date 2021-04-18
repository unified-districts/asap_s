# ASAP_s

A WordPress theme boilerplate with Gulp.

## Prerequisites
* Node.js
* Local WordPress environment (works best with [asap-wp](https://github.com/530medialab/asap-wp))

## Installation
  1. Clone into `/themes` directory  
    ```
    git clone http://github.com/530medialab/asap_s.git <project-name>
    ```
  2. Remove `.git` directory in new theme directory
  3. `cd` to the theme's directory
  4. Use the provided Bash script to replace all instances of `asap_s` with the current project's title  
    ```
    bash asap_s.sh <project title>
    ```
  5. Install Node Packages  
    ```
    npm install
    ```

## Usage

  * `gulp` command for developing
  * `gulp compile` command for compiling Sass, JavaScript, and images

### Workflows
  * CSS
    - `assets/styles/scss/*.scss`  => `dist/styles/styles.css`
    - `assets/styles/vendor/*.css` => `dist/styles/vendor.css`
  * JavaScript
    - `assets/scripts/\*.js`       => `dist/scripts/*.min.js`
    - `assets/scripts/vendor/*.js` => `dist/scripts/vendor.min.js`
  * Images
    - `assets/images/*` => `dist/images/*`
    - Minifies all images
