<?php

/**
 * Plugin Name: WP Membership Reward
 * Description: WP Membership Reward 是一個可以創建會員等級以及設定獎勵的外掛
 * Author URI: https://github.com/j7-dev
 * License: GPLv2
 * Version: 1.0.0
 * Requires PHP: 7.4.0
 */

/**
 * Tags: woocommerce, shop, order
 * Requires at least: 4.6
 * Tested up to: 4.8
 * Stable tag: 4.3
 */

namespace J7\WP_REACT_PLUGIN\React;

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/inc/admin.php';


use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__, '.env.production');
$dotenv->safeLoad();


$instance = new Admin\Bootstrap();
$instance->init();

\register_activation_hook(__FILE__, [__NAMESPACE__ . '\Admin\Bootstrap', 'activate_callback']);
