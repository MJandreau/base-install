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
	<div class="site-navbar">
		<div class="site-branding">
			<span class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></span>
		</div>
		<button class="menu-toggle" tabindex="0" aria-label="Menu" aria-controls="primary-menu"><?php esc_html_e( 'Menu', 'baseinstall' ); ?><span>toggle menu</span></button>
		<nav id="site-navigation" class="main-navigation">
			<h3 class="screen-reader-text">Main Navigation</h3>
			<?php 
			wp_nav_menu( array(
				'theme_location'	=> 'menu-1',
				'container'			=> 'ul',
				'menu_class'		=> 'nav-menu', 
				'menu_id'			=> 'primary-menu',
				'echo'				=> true,
				// 'items_wrap'		=> '<ul id="%1$s" class="%2$s">%3$s</ul>',
				'depth'				=> 10, 
				'walker'			=> new baseinstall_walker_nav_menu
			) ); 
			?>
		</nav>
	</div>
</header>
