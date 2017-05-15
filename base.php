<?php
/**
 * The base template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Base_Install
 */

get_header( baseinstall_template_base() ); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<?php include baseinstall_template_path(); ?>
	</main>
</div>

<?php get_sidebar( baseinstall_template_base() ); ?>

<?php get_footer( baseinstall_template_base() ); ?>

