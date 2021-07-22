<?php
/**
 * asap_s functions and definitions.
 *
 * @link https://codex.wordpress.org/Functions_File_Explained
 *
 * @package asap_s
 */

if ( ! function_exists( 'asap_s_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function asap_s_setup() {
	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', 'asap_s' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See https://developer.wordpress.org/themes/functionality/post-formats/
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'asap_s_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // asap_s_setup
add_action( 'after_setup_theme', 'asap_s_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function asap_s_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'asap_s_content_width', 640 );
}
add_action( 'after_setup_theme', 'asap_s_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function asap_s_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'asap_s' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'asap_s_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function asap_s_scripts() {
	wp_enqueue_style( 'asap_s-style-vendor', get_template_directory_uri() . '/dist/styles/vendor.css' );

  wp_enqueue_style( 'asap_s-style-css', get_template_directory_uri() . '/dist/styles/style.css' );

	wp_enqueue_script( 'asap_s-script-vendor', get_template_directory_uri() . '/dist/scripts/vendor.min.js', array(), '', true );

	wp_enqueue_script( 'asap_s-script-vendor', get_template_directory_uri() . '/dist/scripts/vendor.min.js', array(), '', true );

	$url = array_shift((explode('.', $_SERVER['HTTP_HOST'])));

	if (strpos($url, 'localhost') !== false ||
			strpos($url, 'dev')       !== false ||
			strpos($url, 'staging')       !== false ||
			strpos($url, 'local')     !== false):
	    	wp_enqueue_script( 'asap_s-script-main', get_template_directory_uri() . '/assets/scripts/main.js', array('jquery'), '', true );
	else:
		wp_enqueue_script( 'asap_s-script-main', get_template_directory_uri() . '/dist/scripts/main.min.js', array('jquery'), '', true );
	endif;

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'asap_s_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';
