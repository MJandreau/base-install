<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Base_Install
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer">
		<div class="site-info">
			<span class="copyright">Copyright &copy; <?php echo date("Y"); ?> <?php bloginfo( 'name' ); ?></span>
			<span class="sep"> | </span>
			<span class="designer">Designed by <a href="https://www.mikejandreau.net/" target="_blank">Mike Jandreau</a></span>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

<a id="scroll-to-top" href="#page"></a>

</body>
</html>
