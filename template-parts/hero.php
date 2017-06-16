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
	<div class="container">
		<div class="row">
			<div class="twelve-md column">

				<?php if ( is_front_page() ) : ?>
					<div class="call-to-action">
						<h2>homepage</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est provident nisi doloribus dolorem sit tempore modi asperiores ad totam eius.</p>
						<a href="#">Call to Action</a>
					</div>
					
				<?php elseif ( is_single() ) : ?>
					<?php the_title( '<h2 class="entry-title">', '</h2>' ); ?>
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
					<?php the_title( '<h2 class="entry-title">', '</h2>' ); ?>

				<?php endif; ?>

			</div>
		</div>
	</div>

	<?php if ( is_front_page() || is_single() ) : ?>
		<a class="scroll-to-content" href="#content"></a>
	<?php endif; ?>

</div>

