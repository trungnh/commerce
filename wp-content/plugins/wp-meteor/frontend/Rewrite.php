<?php

/**
 * WP_Meteor
 *
 * @package   WP_Meteor
 * @author    Aleksandr Guidrevitch <alex@excitingstartup.com>
 * @copyright 2020 wp-meteor.com
 * @license   GPL 2.0+
 * @link      https://wp-meteor.com
 */

namespace WP_Meteor\Frontend;
/**
 * Enqueue stuff on the frontend
 */
class Rewrite extends Base
{
    public $priority = -3;
    /**
     * Initialize the class.
     *
     * @return void
     */
    public function register()
    {
        if (defined('LSCWP_V') && version_compare(constant('LSCWP_V'), '3.2.3.1 ', '>=')) {
            \add_action('litespeed_buffer_after', [$this, 'rewrite'], PHP_INT_MAX);
        // } else if (defined('WP_ROCKET_VERSION') && !defined('SiteGround_Optimizer\VERSION')) {
        //     \add_action('rocket_buffer', [$this, 'rewrite'], PHP_INT_MAX);
        } else {
            \add_action('init', [$this, 'buffer_start'], $this->priority);
        }

        // WP-Rocket compatibility
        \add_filter('rocket_excluded_inline_js_content', [$this, 'exclude_js_array']);
        // Autoptimize compatibility
        \add_filter('autoptimize_filter_js_exclude', [$this, 'exclude_js_string']); // does it expect regexps?
        // Swift Performance compatibility
        \add_filter('swift_performance_option_exclude-inline-scripts', [$this, 'exclude_js_array']);
    }

    public function exclude_js_array($excluded_js)
    {
        // regexps !
        return array_merge((array) $excluded_js, [
            '_wpmeteor=',
            '_wpmeteor\.',
            'wpmeteordisable=1',
        ]);
    }

    public function exclude_js_string($excluded_js)
    {
        if (is_array($excluded_js)) {
            return $this->exclude_js_array($excluded_js);
        }
        // strings !
        return $excluded_js . "," . join(',', [
            '_wpmeteor=',
            '_wpmeteor.',
            'wpmeteordisable=1',
        ]) . ",";
    }

    public function buffer_start()
    {
        ob_start([$this, "rewrite"]);
    }

    public function rewrite($buffer)
    {
        foreach(headers_list() as $header) {
            if (preg_match('/^content\-type/i', $header) && !preg_match('/^content\-type\s*:\s*text\/html/i', $header)) {
                $this->canRewrite = false;
                break;
            }
        }

        if (!$this->canRewrite)
            return $buffer;

        /* settings */
        $_wpmeteor = \apply_filters(WPMETEOR_TEXTDOMAIN . '-frontend-adjust-wpmeteor', [], \wpmeteor_get_settings());
        $_wpmeteor['v'] = WPMETEOR_VERSION;
        /* /settings */

        /* blocker */
        if (preg_match('/wpmeteordebug/', $_SERVER['QUERY_STRING'])) {
            $script = file_get_contents(__DIR__ . '/../assets/js/public/public-debug.js');
            $script = preg_replace('/\/\/# sourceMappingURL=public-debug.js.map/', '//# sourceMappingURL=' . \plugins_url('assets/js/public/public-debug.js.map', WPMETEOR_PLUGIN_ABSOLUTE), $script);
        } else {
            $script = file_get_contents(__DIR__ . '/../assets/js/public/public.js');
            $script = preg_replace('/\/\/# sourceMappingURL=public.js.map/', '', $script);
        }
        /* /blocker */

        /* ie redirect */
        $ieredirect = file_get_contents(__DIR__ . '/../assets/js/public/ie-redirect.js');
        /* /ie redirect */

        $tag = "<script data-wpmeteor-nooptimize=\"true\" " . (constant('WPMETEOR_EXTRA_ATTRS') ?: ""). ">";
        $buffer = preg_replace('/(<head\b[^>]*?>)/', "\${1}<!-- Optimized with WP Meteor v" . WPMETEOR_VERSION . " - https://wordpress.org/plugins/wp-meteor/ -->${tag}var _wpmeteor=" . json_encode($_wpmeteor) . ";${ieredirect};</script>${tag}${script}</script>", $buffer, 1);
        return \apply_filters(WPMETEOR_TEXTDOMAIN . '-frontend-rewrite', $buffer, \wpmeteor_get_settings());
    }
}
