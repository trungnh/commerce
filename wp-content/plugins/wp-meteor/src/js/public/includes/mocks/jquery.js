import dispatcher from '../utils/dispatcher';
import delta from '../utils/delta';
const c = process.env.DEBUG ? console.log : () => {};
const d = document;
const DCL = 'DOMContentLoaded';

/**
 * class name should not match mocked object
 */
export default class jQueryMock {
    init() {

        let Mock;
        let loaded = false;

        const override = (jQuery) => {

            if (!loaded && jQuery && jQuery.fn && !jQuery.__wpmeteor) {
                process.env.DEBUG && c(delta(), 'new jQuery detected', jQuery);

                // can't use () => {} as it binds to different this
                const enqueue = function (func) {
                    process.env.DEBUG && c(delta(), 'enqueued jQuery(func)', func);
                    d.addEventListener(DCL, e => { 
                        process.env.DEBUG && c(delta(), 'running enqueued jQuery function', func);
                        func.bind(d)(jQuery, e);
                    });
                    return this;
                };

                // const oldReady = jQuery.fn.ready;
                jQuery.fn.ready = enqueue;
                jQuery.fn.init.prototype.ready = enqueue;
                jQuery.__wpmeteor = true;

                /*
                dispatcher.on('l', () => {
                    // jQuery.fn.ready = oldReady;
                    // jQuery.fn.init.prototype.ready = oldReady;
                    setTimeout(() => dispatcher.emit.bind(dispatcher, 'r'));
                });
                */

                const trigger = jQuery.fn.trigger;
                const queue = [];
                jQuery.fn.trigger = function trigger(...args) {
                    queue.push([this, args]);
                    return this;
                }
                d.addEventListener(DCL, e => {
                    let event;
                    jQuery.fn.trigger = trigger;
                    while (event = queue.shift()) {
                        process.env.DEBUG && c(delta(), "dispatching jQuery event", ...event)
                        trigger.apply(...event);
                    }
                });
            }
            return jQuery;
        }

        if (window.jQuery) {
            Mock = override(window.jQuery);
        }

        Object.defineProperty(window, 'jQuery', {
            get() {
                return Mock;
            },
            set(jQuery) {
                return Mock = override(jQuery);
            },
            // configurable: true
        });

        dispatcher.on('l', () => loaded = true);
    }
}
