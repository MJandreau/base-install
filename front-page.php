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
	<?php 
		// get page content
		while ( have_posts() ) : the_post();
		get_template_part( 'template-parts/content', 'page' );
			/* // If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
			comments_template();
			endif; */
		endwhile; // End of the loop.
		the_posts_navigation(); // If front page is set to show latest posts, get the post navigation
	?>

<?php else : // If front page is set to show a static page, show this markup before content area ?>
	<div class="site-content">
		<div id="primary" class="content-area">
			<main id="main" class="site-main">
				<?php 
					// get page content
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
				// SAMPLE MARKUP 
				// the markup below is a sample of how to call content from the theme options fields 
				?>

				<br>

				<h3>Sample Image</h3>
				<div class="logo-sample">
					<?php 
						// These fields are controlled using the theme options located in Appearance -> Theme Options
						if ($logo = get_option('baseinstall_options')['baseinstall-logo']) { 
							echo '<a href="' . esc_url( home_url( '/' ) ) . '" rel="home"><img src="' . $logo . '" alt="' . get_bloginfo( 'name' ) . ' Logo"></a>';
						} else { /* do nothing */ }
					?>
				</div>
				
				<br>
				
				<h3>Sample Buttons</h3>
				<div class="social-block">
					<?php 
						// These fields are controlled using the theme options located in Appearance -> Theme Options
						if ($twitter = get_option('baseinstall_options')['baseinstall-social-twitter']) { 
							echo '<a class="button button-primary" target="_blank" href="' . $twitter . '">Twitter</a>';
						} else { /* do nothing */ }

						if ($facebook = get_option('baseinstall_options')['baseinstall-social-facebook']) { 
							echo '<a class="button button-primary" target="_blank" href="' . $facebook . '">Facebook</a>';
						} else { /* do nothing */ }

						if ($googleplus = get_option('baseinstall_options')['baseinstall-social-googleplus']) { 
							echo '<a class="button button-primary" target="_blank" href="' . $googleplus . '">Google&#43;</a>';
						} else { /* do nothing */ }
					?>
				</div>
				
				<br>
				
				<h3>Sample Form</h3>
				<div class="form-sample">
					<form>
						<label class="has-float-label">
							<input type="text" placeholder="Bob Jones"/>
							<span>Name</span>
						</label>
						<label class="has-float-label">
							<input type="email" placeholder="email@example.com"/>
							<span>Email</span>
						</label>
						<label class="has-float-label">
							<input type="password" placeholder="••••••••"/>
							<span>Password</span>
						</label>
							<label class="has-float-label">
							<select class="u-full-width" id="exampleRecipientInput"><option selected disabled>Choose One</option><option value="Option 1">Questions</option><option value="Option 2">Admiration</option><option value="Option 3">Can I get your number?</option></select>
							<span>Password</span>
						</label>
						<label class="has-float-label">
							<textarea type="textarea" placeholder="Your Message"></textarea>
							<span>Message</span>
						</label>
						<button>Sign up</button>
					</form>
				</div>

				<?php 
				// END SAMPLE MARKUP 
				?>



			</main>
		</div>
		<?php get_sidebar( baseinstall_template_base() ); ?>
	</div>

<?php endif; ?>


<?php if ( !is_home() && is_front_page() ) : // If front page is set to show a static page, show this markup after content area ?>
	<div class="section">
		<div class="container">
			<div class="row">

				<div class="column sm-6">
					<div class="subsection">
						<h2>Feature One</h2>
						<p>Integer sollicitudin turpis sit amet consectetur sodales. Donec rutrum hendrerit bibendum. Mauris et elementum mauris. Cras malesuada tortor in erat bibendum, vel volutpat sem semper. Donec dui sapien, sagittis eget euismod at, tincidunt quis mauris. Fusce a tempus lacus. Aliquam rutrum accumsan mi non lobortis.</p>
					</div>
				</div>

				<div class="column sm-6">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=48&bg=cccccc&txtclr=ffffff&txt=Feature%20One&w=800&h=450&fm=jpg" alt="">
					</div>
				</div>

			</div>
		</div>
	</div>

	<div class="section section-alt">
		<div class="container">
			<div class="row">

				<div class="column md-6">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=48&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=800&h=450&fm=jpg" alt="">
					</div>
				</div>

				<div class="column md-6">
					<div class="subsection">
						<h2>Feature Two</h2>
						<p>Integer sollicitudin turpis sit amet consectetur sodales. Donec rutrum hendrerit bibendum. Mauris et elementum mauris. Cras malesuada tortor in erat bibendum, vel volutpat sem semper. Donec dui sapien, sagittis eget euismod at, tincidunt quis mauris. Fusce a tempus lacus. Aliquam rutrum accumsan mi non lobortis.</p>
					</div>
				</div>
			</div>

			<div class="row">

				<div class="column xs-6 sm-4 md-3">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=38&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=400&h=225&fm=jpg" alt="">
					</div>
				</div>
				<div class="column xs-6 sm-4 md-3">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=38&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=400&h=225&fm=jpg" alt="">
					</div>
				</div>
				<div class="column xs-6 sm-4 md-3">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=38&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=400&h=225&fm=jpg" alt="">
					</div>
				</div>
				<div class="column xs-6 sm-4 md-3">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=38&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=400&h=225&fm=jpg" alt="">
					</div>
				</div>
				<div class="column xs-6 sm-4 md-3">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=38&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=400&h=225&fm=jpg" alt="">
					</div>
				</div>
				<div class="column xs-6 sm-4 md-3">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=38&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=400&h=225&fm=jpg" alt="">
					</div>
				</div>
				<div class="column xs-6 sm-4 md-3">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=38&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=400&h=225&fm=jpg" alt="">
					</div>
				</div>
				<div class="column xs-6 sm-4 md-3">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=38&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=400&h=225&fm=jpg" alt="">
					</div>
				</div>
				<div class="column xs-6 sm-4 md-3">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=38&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=400&h=225&fm=jpg" alt="">
					</div>
				</div>
				<div class="column xs-6 sm-4 md-3">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=38&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=400&h=225&fm=jpg" alt="">
					</div>
				</div>
				<div class="column xs-6 sm-4 md-3">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=38&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=400&h=225&fm=jpg" alt="">
					</div>
				</div>
				<div class="column xs-6 sm-4 md-3">
					<div class="subsection">
						<img src="https://placeholdit.imgix.net/~text?txtsize=38&bg=ffffff&txtclr=cccccc&txt=Feature%20Two&w=400&h=225&fm=jpg" alt="">
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
						'post__not_in' => get_option("sticky_posts"), // Ignore sticky posts for this particular query
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
