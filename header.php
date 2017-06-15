<?php
/**
 * The header for our theme
 *
 * This is the template that displays .site-header (required) and .hero (optional)
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Base_Install
 */
?>

<header id="masthead" class="site-header">

	<div class="container">

		<div class="site-branding">
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>

<?php // site description, delete later ?>
<?php
// $description = get_bloginfo( 'description', 'display' );
// if ( $description || is_customize_preview() ) : ?>
<!-- <p class="site-description"> -->
<?php 
// echo $description; /* WPCS: xss ok. */ 
?>
<!-- </p> -->
<?php 
// endif; 
?>

		</div>

		<button class="menu-toggle" tabindex="0" aria-label="Menu" aria-controls="primary-menu"><?php esc_html_e( 'Menu', 'baseinstall' ); ?><span>toggle menu</span></button>

		<nav id="site-navigation" class="main-navigation">
			<?php wp_nav_menu( array(
				'theme_location' => 'menu-1', 
				'container' => 'ul',
				'menu_class'=> 'nav-menu',
				'menu_id' => 'primary-menu'
			 ) ); ?>
		</nav>

	</div>

</header>










