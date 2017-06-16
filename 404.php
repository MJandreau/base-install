<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Base_Install
 */
?>


			<section class="error-404 not-found">
				<!-- <header class="page-header"><h1 class="page-title"> -->
				<?php 
				// esc_html_e( 'Oops! That page can&rsquo;t be found.', 'baseinstall' ); 
				?>
				<!-- </h1></header> -->

				<div class="page-content">
					<p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'baseinstall' ); ?></p>


					<div class="row">
						<div class="six-sm column">
							<div class="widget">
								<h2 class="widget-title">Search</h2>
								<?php // WP search form
									get_search_form(); ?>
							</div>
						</div>
						<div class="six-sm column">
							<div class="widget">
								<?php // Archive dropdown
									the_widget( 'WP_Widget_Archives', 'dropdown=1', "after_title=</h2>$archive_content" ); ?>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="six-sm column">
							<div class="widget">
								<?php // Recent posts widget
									the_widget( 'WP_Widget_Recent_Posts' ); ?>
							</div>
						</div>
						<div class="six-sm column">
							<div class="widget">
								<?php // Only show the widget if site has multiple categories. 
									if ( baseinstall_categorized_blog() ) : ?>
								<div class="widget widget_categories">
									<h2 class="widget-title"><?php esc_html_e( 'Most Used Categories', 'baseinstall' ); ?></h2>
									<ul>
									<?php
										wp_list_categories( array(
											'orderby'    => 'count',
											'order'      => 'DESC',
											'show_count' => 1,
											'title_li'   => '',
											'number'     => 10,
										) );
									?>
									</ul>
								</div><!-- .widget -->
								<?php endif; ?>
							</div>
						</div>
					</div>

				</div><!-- .page-content -->
			</section><!-- .error-404 -->

