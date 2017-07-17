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

<?php if ( is_home() && is_front_page() ) : // If front page is set to show latest posts, get this markup ?>
	<div class="latest-posts"><!-- open content area .container -->

<?php else : // If front page is set to show a static page, show this markup before content area ?>
	<div class="section strapline">
		<div class="container">
			<div class="row">
				<div class="column sm-4">
					<div class="subsection">
						<p>bloop</p>
					</div>
				</div>
				<div class="column sm-4">
					<div class="subsection">
						<p>bloop</p>
					</div>
				</div>
				<div class="column sm-4">
					<div class="subsection">
						<p>bloop</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container pad-top"><?php // open content area .container ?>

<?php endif; ?>
		<div class="row">
			<div class="column sm-8">
				<?php // get page content
				while ( have_posts() ) : the_post();
					get_template_part( 'template-parts/content', 'page' );
					/* // If comments are open or we have at least one comment, load up the comment template.
					if ( comments_open() || get_comments_number() ) :
						comments_template();
					endif; */
				endwhile; // End of the loop.
				the_posts_navigation(); // If front page is set to show latest posts, get the post navigation
				?>

				<?php


					if($logo = get_option('baseinstall_options'))
					{ echo '<img src="' . $logo['baseinstall-logo'] . '" alt="">'; }

					if($facebook = get_option('baseinstall_options'))
					{ echo '<a class="button button-primary" target="_blank" href="' . $facebook['baseinstall-social-facebook'] . '">Facebook</a>'; }

					if($twitter = get_option('baseinstall_options'))
					{ echo '<a class="button button-primary" target="_blank" href="' . $twitter['baseinstall-social-twitter'] . '">Twitter</a>'; }

					if($googleplus = get_option('baseinstall_options'))
					{ echo '<a class="button button-primary" target="_blank" href="' . $googleplus['baseinstall-social-googleplus'] . '">Google&#43;</a>'; }
				?>

			</div>
			
			<div class="column sm-4">
				<aside id="secondary">
					<h2 class="screen-reader-text">Sidebar</h2>
					<?php dynamic_sidebar( 'sidebar-1' ); ?>
				</aside>
			</div>
		</div>

	</div><?php // close homepage posts container ?>

<?php if ( !is_home() && is_front_page() ) : // If front page is set to show a static page, show this markup after content area ?>
	<div class="section">
		<div class="container">
			<div class="row">


				<div class="column sm-6">
					<div class="subsection">
						<p>sm-6</p>
					</div>
				</div>
				<div class="column sm-6">
					<div class="subsection">
						<p>sm-6</p>
					</div>
				</div>

				<div class="column sm-4">
					<div class="subsection">
						<p>sm-4</p>
					</div>
				</div>
				<div class="column sm-4">
					<div class="subsection">
						<p>sm-4</p>
					</div>
				</div>
				<div class="column sm-4">
					<div class="subsection">
						<p>sm-4</p>
					</div>
				</div>

				<div class="column sm-3">
					<div class="subsection">
						<p>sm-3</p>
					</div>
				</div>
				<div class="column sm-3">
					<div class="subsection">
						<p>sm-3</p>
					</div>
				</div>
				<div class="column sm-3">
					<div class="subsection">
						<p>sm-3</p>
					</div>
				</div>
				<div class="column sm-3">
					<div class="subsection">
						<p>sm-3</p>
					</div>
				</div>


			</div>
		</div>
	</div>

	<div class="section section-alt">
		<div class="container">
			<div class="row">

				<div class="column sm-6">
					<div class="subsection">
						<p>sm-6</p>
					</div>
				</div>
				<div class="column sm-6">
					<div class="subsection">
						<p>sm-6</p>
					</div>
				</div>

				<div class="column sm-4">
					<div class="subsection">
						<p>sm-4</p>
					</div>
				</div>
				<div class="column sm-4">
					<div class="subsection">
						<p>sm-4</p>
					</div>
				</div>
				<div class="column sm-4">
					<div class="subsection">
						<p>sm-4</p>
					</div>
				</div>

				<div class="column sm-3">
					<div class="subsection">
						<p>sm-3</p>
					</div>
				</div>
				<div class="column sm-3">
					<div class="subsection">
						<p>sm-3</p>
					</div>
				</div>
				<div class="column sm-3">
					<div class="subsection">
						<p>sm-3</p>
					</div>
				</div>
				<div class="column sm-3">
					<div class="subsection">
						<p>sm-3</p>
					</div>
				</div>

			</div>
		</div>
	</div>

	<div class="blog-section">
		<div class="container">

			<h2>Blog</h2>
			<p>Integer sollicitudin turpis sit amet consectetur sodales. Donec rutrum hendrerit bibendum. Mauris et elementum mauris. Cras malesuada tortor in erat bibendum, vel volutpat sem semper. Donec dui sapien, sagittis eget euismod at, tincidunt quis mauris. Fusce a tempus lacus. Aliquam rutrum accumsan mi non lobortis.</p>

			<div class="row">
				<?php
					$counter = 6; // Number of posts to pull
					$recentPosts = new WP_Query(array(
						'showposts' => $counter, 
						'offset' => 0,  // Set this to 1 to skip over first post, 2 to skip the first two, etc.
						'order' => 'DESC', // Puts new posts first, to put oldest posts first, change to 'ASC'
						'post__not_in' => get_option("sticky_posts"),
					));
				?>

				<?php while ($recentPosts->have_posts()) : $recentPosts->the_post(); ?>
				<div class="column md-6 lg-4 box<?php echo $counter--; ?>">
					<div class="blog-feature">
						<div class="blog-image">
							<?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' ); ?>
							<a href="<?php echo get_permalink( get_the_ID() );?>" style="background-image: url('<?php echo $thumb['0'];?>')"></a>
						</div>
						<div class="blog-text">
							<h3><a href="<?php echo get_permalink( get_the_ID() );?>"><?php echo get_the_title(); ?></a></h3>
							<div class="blog-author-date">
								<?php 
									// gets post date and bullet separator
									echo '<span class="blog-date">' . get_the_date('M j, Y') . '</span><span class="blog-bullet">&nbsp;&bull;&nbsp;</span>'; 

									// gets author name
									$fname = get_the_author_meta('first_name');
									$lname = get_the_author_meta('last_name');
									$full_name = '';

									if( empty($fname)){
										$full_name = $lname;
									} elseif( empty( $lname )){
										$full_name = $fname;
									} else {
										// both first name and last name are present
										$full_name = "{$fname} {$lname}";
									}
									echo '<span class="blog-author">By ' . $full_name . '</span>'; 
								?>
							</div>
							<?php the_excerpt(); ?>
							<a class="button" href="<?php echo get_permalink( get_the_ID() );?>">Read More</a>
						</div>
					</div>
				</div>
				<?php endwhile; ?>
			</div>
			<?php echo '<a class="button button-primary" href="' . get_permalink( get_option( 'page_for_posts' ) ) . '">View More Posts</a>'; ?>
		</div>
	</div>

<?php endif; ?>
