<?php

declare(strict_types=1);

namespace J7\WP_REACT_PLUGIN\React\Admin;

use Kucrut\Vite;

require_once __DIR__ . '/plugins/gamipress/gamipress.php';

class Bootstrap
{
	const PLUGIN_DIR = __DIR__ . '/../';

	function __construct()
	{
		$_ENV['APP_NAME'];
		$_ENV['KEBAB'] = str_replace(' ', '-', strtolower($_ENV['APP_NAME']));
		$_ENV['SNAKE'] = str_replace(' ', '_', strtolower($_ENV['APP_NAME']));

		new ShortCode($_ENV['SNAKE'] . '_shortcode');
		new Ajax();
		new CPT($_ENV['KEBAB'], array(
			'post_metas' => ['meta', 'settings'],
			'rewrite' => array(
				'template_path' => 'test.php',
				'slug' => 'test',
				'var' => $_ENV['SNAKE'] . '_test',
			),
		));
	}

	public function init(): void
	{
		\add_action('admin_enqueue_scripts', [$this, 'enqueue_script'], 99);
		\add_action('wp_enqueue_scripts', [$this, 'enqueue_script'], 99);
		\add_action('wp_footer', [$this, 'render_app']);
		\add_action('admin_menu', [$this, 'admin_menu']);
	}

	/**
	 * Render application's markup
	 */
	public function render_app(): void
	{
		echo '<div id="' . $_ENV['VITE_RENDER_ID_1'] . '"></div>';
	}


	/**
	 * Enqueue script
	 */
	public function enqueue_script(): void
	{
		/*
		 * enquene script on demand
		if (\is_admin()) {
			// match wp-admin screen_id
			$screen = \get_current_screen();
			if (($screen->id !== $_ENV['KEBAB'])) return;
		} else {
			// match front-end post_type slug {$_ENV['KEBAB']}
			if (strpos($_SERVER['REQUEST_URI'], $_ENV['KEBAB']) === false) return;
		}
		*/

		Vite\enqueue_asset(
			dirname(__DIR__) . '/js/dist',
			'js/src/main.tsx',
			[
				'handle' => $_ENV['KEBAB'],
				'in-footer' => true,
			]
		);

		$post_id = \get_the_ID();
		$permalink = \get_permalink($post_id);

		\wp_localize_script($_ENV['KEBAB'], 'appData', array(
			'siteUrl' => \site_url(),
			'ajaxUrl' => \admin_url('admin-ajax.php'),
			'ajaxNonce'  => \wp_create_nonce($_ENV['KEBAB']),
			'userId' => \wp_get_current_user()->data->ID,
			'postId' => $post_id,
			'permalink' => $permalink,
		));

		\wp_localize_script($_ENV['KEBAB'], 'wpApiSettings', array(
			'root' => \esc_url_raw(rest_url()),
			'nonce' => \wp_create_nonce('wp_rest'),
		));
	}

	/**
	 * Registers a new settings page under Settings.
	 */
	public function admin_menu()
	{
		\add_menu_page(
			\__('settings', $_ENV['KEBAB']),
			\__('MemberShip Reward', $_ENV['KEBAB']),
			'manage_options', // user capabilities
			$_ENV['SNAKE'] . '_settings',
			[$this, 'settings_page_callback'],
			'dashicons-awards', // icon (from Dashicons for example)
			4 // menu position

		);
	}

	/**
	 * Settings page display callback.
	 */
	public function settings_page_callback(): void
	{
		echo '<div id="' . $_ENV['VITE_RENDER_ID_1'] . '"></div>';
	}

	public static function activate_callback(): void
	{
		self::create_rank_type();
	}

	public static function create_rank_type()
	{

		// find the post with "member_lv" slug
		$rank_type = \get_page_by_path('member_lv', OBJECT, 'rank-type');
		if (!$rank_type) {
			$args = array(
				'post_title' => '會員等級',
				'post_name' => 'member_lv',
				'post_type' => 'rank-type',
				'post_status' => 'publish',
			);
			// create post
			\wp_insert_post($args);
		}
	}
}


require_once __DIR__ . '/utils/includes.php';
require_once __DIR__ . '/custom/includes.php';
