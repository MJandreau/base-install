<?php
/**
 * The hero section for our theme
 *
 * This is the template that displays .hero (optional)
 * the hero section of the site displays below the header + navbar 
 * if you don't want/need it, comment out or delete get_template_part('hero'); in base.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Base_Install
 */
?>

<div class="hero">
	<div class="heading">
		<div class="container">

			<?php if ( is_front_page() ) : ?>
				<div class="call-to-action">
					<h2>Base Install Four</h2>
					<p>Base Install is a starter theme for WordPress development based on <a href="http://underscores.me/" target="_blank">Underscores</a>. It features a <a href="http://scribu.net/wordpress/theme-wrappers.html" target="_blank">theme wrapper</a>, a <a href="http://getskeleton.com/" target="_blank">responsive grid</a>, and a powerful <a href="https://labs.ahmadawais.com/WPGulp/" target="_blank">Gulp</a> workflow.</p>
					<a href="https://github.com/mikejandreau/Base-Install" target="_blank">View on GitHub</a>
				</div>
				
			<?php elseif ( is_single() ) : ?>
				<?php the_title( '<h2 class="entry-title"><span class="screen-reader-text">Article Title: </span>', '</h2>' ); ?>
				<div class="blog-author-date">
					<span class="blog-date">Posted on <?php echo get_the_date('M j, Y'); ?></span>
					<?php 
						$temp_post = get_post($post_id);
						$user_id = $temp_post->post_author;
						$first_name = get_the_author_meta('first_name',$user_id);
						$last_name = get_the_author_meta('last_name',$user_id);
						$full_name = "{$first_name} {$last_name}";
						echo '<span class="blog-author">by ' . $full_name . ' </span>';
					?>
				</div>

			<?php elseif ( is_author() ) : ?>
				<?php
					$temp_post = get_post($post_id);
					$user_id = $temp_post->post_author;
					$first_name = get_the_author_meta('first_name',$user_id);
					$last_name = get_the_author_meta('last_name',$user_id);
					$full_name = "{$first_name} {$last_name}";
					echo '<h2 class="entry-title">Posts by ' . $full_name . ' </h2>';
				?>

			<?php elseif ( is_category() ) : ?>
				<?php single_cat_title( '<h2 class="entry-title">Category: ', '</h2>' ); ?>

			<?php elseif ( is_tag() ) : ?>
				<?php single_tag_title( '<h2 class="entry-title">Tag: ', '</h2>' ); ?>

			<?php elseif ( is_month() ) : ?>
				<?php the_archive_title( '<h2 class="entry-title">', '</h2>' ); ?>

			<?php elseif ( is_search() ) : ?>
				<?php echo '<h2 class="entry-title">Search results for: ' . get_search_query() .  '</h2>'; ?>

			<?php elseif ( is_home() ) : ?>
				<h2>Blog</h2>

			<?php elseif ( is_404() ) : ?>
				<h2>Oops! That page can&rsquo;t be found.</h2>

			<?php elseif ( is_page_template( 'contact.php' ) ) : ?>
				<h2>Get in Touch</h2>

			<?php else : ?>
				<?php the_title( '<h2 class="entry-title"><span class="screen-reader-text">Article Title: </span>', '</h2>' ); ?>

			<?php endif; ?>

		</div><?php // end .container ?>
	</div><?php // end .heading ?>

	<?php 
		if ( is_front_page() ) : // show scroll to content button on homepage only
		// if ( is_front_page() || is_single() ) : // show scroll to content button on homepage and single posts
	 ?>
		<a class="scroll-to-content" href="#content"></a>
	<?php endif; ?>

</div>



