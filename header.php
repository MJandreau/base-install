<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Base_Install
 */

?><!DOCTYPE html>
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

	<header id="masthead" class="site-header">
		<div class="container">
			<div class="site-branding">
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
				<?php
				$description = get_bloginfo( 'description', 'display' );
				if ( $description || is_customize_preview() ) : ?>
					<p class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
				<?php
				endif; ?>
			</div><!-- .site-branding -->
				<button class="menu-toggle" tabindex="0" aria-label="Menu" aria-controls="primary-menu"><?php esc_html_e( 'Menu', 'baseinstall' ); ?><span>toggle menu</span></button>
			<nav id="site-navigation" class="main-navigation">
				<?php wp_nav_menu( array(
					'theme_location' => 'menu-1', 
					'container' => 'ul',
					'menu_class'=> 'nav-menu',
					'menu_id' => 'primary-menu'
				 ) ); ?>
			</nav><!-- #site-navigation -->
		</div>
	</header><!-- #masthead -->



	
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











	<div id="content" class="site-content">
