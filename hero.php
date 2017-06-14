<?php
/**
 * The hero section for our theme
 *
 * This is the template that displays .hero (optional)
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Base_Install
 */
?>

	<?php
		// the hero section of the site displays below the header + navbar 
		// if you don't want/need it, comment out or delete get_template_part('hero'); in base.php
	?>
	<?php if ( is_front_page() ) : ?>
		<div class="hero hero-home">
			<div class="container">
				<div class="row">
					<div class="twelve-md column">
						<div class="call-to-action">
							<h2>homepage</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est provident nisi doloribus dolorem sit tempore modi asperiores ad totam eius, excepturi rem ullam soluta sunt aspernatur nam itaque dolor atque.</p>
							<a href="#">Call to Action</a>
							<?php
								// if(get_field('hero_tagline'))
								// { echo '<p class="value-prop">' . get_field('hero_tagline') . '</p>'; }
							?>
							<?php
								// if(get_field('hero_sub_tagline'))
								// { echo '<p>' . get_field('hero_sub_tagline') . '</p>'; }
							?>
							<?php
								// if(get_field('hero_button_url') && get_field('hero_button_text'))
								// { echo '<a class="button button-hero" href="' . get_field('hero_button_url') . '">' . get_field('hero_button_text') . '</a>'; }
							?>
						</div>
						<?php // the_title( '<h2 class="entry-title">', '</h2>' ); ?>
					</div>
				</div>
			</div>
		</div>

	<?php elseif ( is_single() ) : ?>
		<div class="hero">
			<div class="container">
				<div class="row">
					<div class="twelve-md column">
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
					</div>
				</div>
			</div>
		</div>

	<?php elseif ( is_author() ) : ?>
		<div class="hero">
			<div class="container">
				<div class="row">
					<div class="twelve-md column">
						<?php
							$temp_post = get_post($post_id);
							$user_id = $temp_post->post_author;
							$first_name = get_the_author_meta('first_name',$user_id);
							$last_name = get_the_author_meta('last_name',$user_id);
							$full_name = "{$first_name} {$last_name}";
							echo '<h2 class="entry-title">Posts by ' . $full_name . ' </h2>';
						?>
					</div>
				</div>
			</div>
		</div>

	<?php elseif ( is_category() ) : ?>
		<div class="hero">
			<div class="container">
				<div class="row">
					<div class="twelve-md column">
						<?php single_cat_title( '<h2 class="entry-title">Category: ', '</h2>' ); ?>
					</div>
				</div>
			</div>
		</div>

	<?php elseif ( is_tag() ) : ?>
		<div class="hero">
			<div class="container">
				<div class="row">
					<div class="twelve-md column">
						<?php single_tag_title( '<h2 class="entry-title">Tag: ', '</h2>' ); ?>
					</div>
				</div>
			</div>
		</div>

	<?php elseif ( is_month() ) : ?>
		<div class="hero">
			<div class="container">
				<div class="row">
					<div class="twelve-md column">
						<?php 
							the_archive_title( '<h2 class="entry-title">', '</h2>' ); 
						?>
					</div>
				</div>
			</div>
		</div>

	<?php elseif ( is_home() ) : ?>
		<div class="hero">
			<div class="container">
				<div class="row">
					<div class="twelve-md column">
						<p class="value-prop">Blog</p>
					</div>
				</div>
			</div>
		</div>

	<?php elseif ( is_404() ) : ?>
		<div class="hero">
			<div class="container">
				<div class="row">
					<div class="twelve-md column">
						<p class="value-prop">Oops! That page can&rsquo;t be found.</p>
					</div>
				</div>
			</div>
		</div>

	<?php elseif ( is_page_template( 'contact.php' ) ) : ?>
		<div class="hero">
			<div class="container">
				<div class="row">
					<div class="twelve-md column">
						<p class="value-prop">Get in Touch</p>
					</div>
				</div>
			</div>
		</div>

	<?php else : ?>
		<div class="hero">
			<div class="container">
				<div class="row">
					<div class="twelve-md column">
						<div class="call-to-action">
							<?php the_title( '<h2 class="entry-title">', '</h2>' ); ?>

							<?php
								// if(get_field('hero_tagline'))
								// { echo '<p class="value-prop">' . get_field('hero_tagline') . '</p>'; }
							?>
							<?php
								// if(get_field('hero_sub_tagline'))
								// { echo '<p>' . get_field('hero_sub_tagline') . '</p>'; }
							?>
							<?php
								// if(get_field('hero_button_url') && get_field('hero_button_text'))
								// { echo '<a class="button button-hero" href="' . get_field('hero_button_url') . '">' . get_field('hero_button_text') . '</a>'; }
							?>
						</div>
					</div>
				</div>
			</div>
		</div>
	<?php endif; ?>













