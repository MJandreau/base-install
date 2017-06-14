<?php
/**
 * The base template file.
 *
 * This is the theme wrapper template file
 * The entire site structure is included here: header, hero, content, sidebar, and footer
 * If you don't want/need the hero section, get rid of the if(is_front_page) conditional and delete hero.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Base_Install
 */
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<?php wp_head(); ?>
	</head>
	<body <?php body_class('sideNavBody'); ?>>

		<div id="page" class="site">

			<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'baseinstall' ); ?></a>

			<?php get_header( baseinstall_template_base() ); ?>

			<div id="content-wrap" class="site-content-wrap">

				<?php get_template_part('template-parts/hero'); ?>

				<?php if ( is_front_page() ) : ?>
					<?php include baseinstall_template_path(); ?>
				<?php else : ?>
					<div id="content" class="site-content">
						<div id="primary" class="content-area">
							<main id="main" class="site-main">
								<?php include baseinstall_template_path(); ?>
							</main>
						</div>
						<?php get_sidebar( baseinstall_template_base() ); ?>
					</div>
				<?php endif; ?>

			</div>

			<?php get_footer( baseinstall_template_base() ); ?>

		</div>

		<?php wp_footer(); ?>

		<a id="scroll-to-top" href="#page"></a>
	</body>
</html>

