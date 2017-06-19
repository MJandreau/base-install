<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Base_Install
 */
?>

<?php if ( is_home() && is_front_page() ) : // If front page is set to show latest posts, get this markup ?>
	<div class="container"><!-- open content area .container -->

<?php else : // If front page is set to show a static page, show this markup before content area ?>
	<div class="triple-feature">
		<div class="container">
			<div class="row">
				<div class="column four-md">
					<div class="featured">
						<h3>bloop</h3>
					</div>
				</div>
				<div class="column four-md">
					<div class="featured">
						<h3>bloop</h3>
					</div>
				</div>
				<div class="column four-md">
					<div class="featured">
						<h3>bloop</h3>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container pad-top"><!-- open content area .container -->

<?php endif; ?>

		<?php // get page content
		while ( have_posts() ) : the_post();
			get_template_part( 'template-parts/content', 'page' );
			/* // If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif; */
		endwhile; // End of the loop.
		the_posts_navigation(); // If front page is set to show latest posts, get the post navigation
		?>
	</div><!-- close content area .container -->

<?php if ( !is_home() && is_front_page() ) : // If front page is set to show a static page, show this markup after content area ?>
	<div class="feature">
		<div class="container">
			<div class="row">
				<div class="column four-md">
					<div class="featured">
						<h3>bloop</h3>
					</div>
				</div>
				<div class="column four-md">
					<div class="featured">
						<h3>bloop</h3>
					</div>
				</div>
				<div class="column four-md">
					<div class="featured">
						<h3>bloop</h3>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="triple-feature">
		<div class="container">
			<div class="row">
				<div class="column four-md">
					<div class="featured">
						<h3>bloop</h3>
					</div>
				</div>
				<div class="column four-md">
					<div class="featured">
						<h3>bloop</h3>
					</div>
				</div>
				<div class="column four-md">
					<div class="featured">
						<h3>bloop</h3>
					</div>
				</div>
			</div>
		</div>
	</div>

<?php endif; ?>







