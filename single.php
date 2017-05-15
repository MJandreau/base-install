<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Base_Install
 */

?>


	<?php
	while ( have_posts() ) : the_post();
		get_template_part( 'template-parts/content', get_post_format() );
		// the_post_navigation(); // default wp post nav
		?>

		<div class="post-navigation">
			<div class="row">
			<?php 
				$prevPost = get_previous_post(true);
				$prevThumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $prevPost->ID ), 'single-post-thumbnail' );
				if($prevPost) {
					$args = array(
						'posts_per_page' => 1,
						'include' => $prevPost->ID
					);
					$prevPost = get_posts($args);
					foreach ($prevPost as $post) {
						setup_postdata($post);
					?>
						<div class="six-sm column">
						<a class="previous" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('<?php echo $prevThumbnail[0]; ?>')" href="<?php the_permalink(); ?>"><h5>Previous Post:<br><?php the_title(); ?></h5></a>
						</div>
					<?php
						wp_reset_postdata();
					} //end foreach
				} // end if

				$nextPost = get_next_post(true);
				$nextThumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $nextPost->ID ), 'single-post-thumbnail' );
				if($nextPost) {
					$args = array(
						'posts_per_page' => 1,
						'include' => $nextPost->ID
					);
					$nextPost = get_posts($args);
					foreach ($nextPost as $post) {
						setup_postdata($post);
					?>
						<div class="six-sm column">
						<a class="next" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('<?php echo $nextThumbnail[0]; ?>')" href="<?php the_permalink(); ?>"><h5>Next Post:<br><?php the_title(); ?></h5></a>
						</div>
					<?php
						wp_reset_postdata();
					} //end foreach
				} // end if
			?>
			</div>
		</div>

		<?php

		// If comments are open or we have at least one comment, load up the comment template.
		if ( comments_open() || get_comments_number() ) :
			comments_template();
		endif;
	endwhile; // End of the loop.
	?>



