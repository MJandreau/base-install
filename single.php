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



<?php 
/*
* Custom post navigation (optional)
*/
echo '<div class="post-navigation"><div class="row">';
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
		<div class="sm-6 column">
		<h5 style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('<?php echo $prevThumbnail[0]; ?>')"><a class="previous" href="<?php the_permalink(); ?>">Previous Post:<br><?php the_title(); ?></a></h5>
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
		<div class="sm-6 column">
		<h5 style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('<?php echo $nextThumbnail[0]; ?>')"><a class="next" href="<?php the_permalink(); ?>">Next Post:<br><?php the_title(); ?></a></h5>
		</div>
	<?php
		wp_reset_postdata();
	} //end foreach
} // end if
echo '</div></div>';
?>



<?php 
/*
* Below are two options for displaying related posts without a plugin. 
* You can use one, both, or neither. They both currently print markup
* utilizing the Base Install responsive grid. If you'd prefer to use
* something like Foundation or Bootstrap, change <div class="sm-6 column"> 
* to use the classes of your preferred framework.
*
* The first option gets posts related by Category (currently set to 4)
* The second gets posts related by Tag (currently set to 6)
*/
?>

<?php // Related posts by category
$orig_post = $post;
global $post;
$categories = get_the_category($post->ID);
if ($categories) {
	$category_ids = array();
	foreach($categories as $individual_category) $category_ids[] = $individual_category->term_id;
	$args=array(
		'category__in' => $category_ids,
		'post__not_in' => array($post->ID),
		'posts_per_page'=> 4, // Number of related posts that will be shown.
		'caller_get_posts'=>1
	);
	$baseinstall_query = new wp_query( $args );
	if( $baseinstall_query->have_posts() ) {
		echo '<div id="related_posts" class="related-posts"><h3>Related Posts</h3><div class="row">';
		while( $baseinstall_query->have_posts() ) {
			$baseinstall_query->the_post();?>
			<div class="sm-6 column">
				<?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' );?>
				<h5 class="related-content" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('<?php echo $thumb['0'];?>')"><a class="next" href="<?php the_permalink(); ?>">Related Post:<br><?php the_title(); ?></a></h5>
				<?php // the_time('M j, Y') ?>
			</div>
		<?php }
		echo '</div></div>';
	}
}
$post = $orig_post;
wp_reset_query(); 
?>

<?php // Related posts by tag
/*
global $post;
$tags = wp_get_post_tags($post->ID);
if ($tags) {
	$tag_ids = array();
	foreach($tags as $individual_tag) $tag_ids[] = $individual_tag->term_id;
	$args=array(
		'tag__in' => $tag_ids,
		'post__not_in' => array($post->ID),
		'posts_per_page'=>6, // Number of related posts that will be shown.
		'caller_get_posts'=>1
	);
	$baseinstall_query = new wp_query( $args );
	if( $baseinstall_query->have_posts() ) {
		echo '<div id="related_posts" class="related-posts"><h3>Similar Posts</h3><div class="row">';
		while( $baseinstall_query->have_posts() ) {
			$baseinstall_query->the_post();?>
			<div class="sm-6 md-4 column">
				<?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' );?>
				<h5 class="related-content" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('<?php echo $thumb['0'];?>')"><a class="next" href="<?php the_permalink(); ?>">Related Post:<br><?php the_title(); ?></a></h5>
				<?php // the_time('M j, Y') ?>
			</div>
		<?php }
		echo '</div></div>';
	}
}
$post = $orig_post;
wp_reset_query(); 
*/
?>



<?php
	// If comments are open or we have at least one comment, load up the comment template.
	if ( comments_open() || get_comments_number() ) :
		comments_template();
	endif;
	endwhile; // End of the loop.
?>
