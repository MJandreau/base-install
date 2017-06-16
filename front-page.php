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


<?php if ( is_home() && is_front_page() ) : ?>
	<div class="container">
<?php else : ?>
	<div class="container pad-top">
<?php endif; ?>

	<?php
	while ( have_posts() ) : the_post();

		get_template_part( 'template-parts/content', 'page' );

		// If comments are open or we have at least one comment, load up the comment template.
		// if ( comments_open() || get_comments_number() ) :
		// 	comments_template();
		// endif;

	endwhile; // End of the loop.
	?>

</div>


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


