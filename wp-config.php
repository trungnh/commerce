<?php
define( 'WP_CACHE', true );
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'favi' );

/** MySQL database username */
define( 'DB_USER', 'benny' );

/** MySQL database password */
define( 'DB_PASSWORD', 'Anhtrung2@' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '-M ]-_ VFa6g}ep(i|&MTfgHC58+0jDR9Y7;z}ORbm|]{G23$^mN9hxdxV.dvNJv' );
define( 'SECURE_AUTH_KEY',  'AxB{KIDL{zEcA;+[nKYB+)rmUY?{{> se=*Q3`dxm}KXPNw9Ad4v#F@A-t9Ss[Sx' );
define( 'LOGGED_IN_KEY',    'h,|1rXCQS3xdx+G;!oVDC5`5jDAJWX*i2%sA8LT-[ywq7d-9t{,83|}oldY V!TB' );
define( 'NONCE_KEY',        'm<xC+:%hA=K4i1tlX<QDM;MabIgv*9u##*Mad{Ll~*HiZ%>Fr#7ZvL*LG7.>$M+w' );
define( 'AUTH_SALT',        '(q+|>_s1_!^ap[N`z7M#8f_|k;}>?XCBLXLP,^5Rd**=8u[jADM~B})VB8ozo[Ov' );
define( 'SECURE_AUTH_SALT', '7GbLGAqjgk:;^jzxDR~-sU0]iFzK T$n!.GB`o941n~3Hk7Wo/C4|G7bZhbzRt)5' );
define( 'LOGGED_IN_SALT',   'KJm4^P?Ur#Xzee5}pk{Sd2&3Sw_IHIUh]I=H|I2#lW+|iS[G.{7jZTt=:w5jY$wx' );
define( 'NONCE_SALT',       '%?o0)L_$W2l2Pn?[H,*})BcF|%t@?5d=B9TGlY<Xuf.xc_4eb/m:#A!>Q5TQihx#' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

define('DISALLOW_FILE_EDIT', true);
define('DISALLOW_FILE_MODS', true);