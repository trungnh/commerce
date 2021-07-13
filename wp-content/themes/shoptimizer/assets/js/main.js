// Main Shoptimizer js.
document.addEventListener( 'DOMContentLoaded', function() {
	window.addEventListener( 'load', function( event ) {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty( '--vh', vh + 'px' );
		makeOnTouchTapped();
	} );
	window.addEventListener( 'resize', function( event ) {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty( '--vh', vh + 'px' );
		makeOnTouchTapped();
	} );
	window.addEventListener( 'click', function( event ) {
		var elem  = event.target;
		var elemp = elem.closest( '.mobile-filter' );
		if ( elem.classList.contains( 'mobile-filter' ) || elemp ) {
			event.stopPropagation();
			event.preventDefault();
			document.querySelector( 'body' ).classList.toggle( 'filter-open' );
			return;
		}
		var elemp = elem.closest( '.close-drawer' );
		if ( elem.classList.contains( 'close-drawer' ) || elemp ) {
			document.querySelector( 'body' ).classList.remove( 'filter-open' );
			document.querySelector( 'body' ).classList.remove( 'mobile-toggled' );
			return;
		}
		var elemp = elem.closest( '.menu-toggle' );
		if ( elem.classList.contains( 'menu-toggle' ) || elemp ) {
			event.stopPropagation();
			event.preventDefault();
			document.querySelector( 'body' ).classList.add( 'mobile-toggled' );
			return;
		}
		if ( elem.classList.contains( 'mobile-overlay' ) ) {
			document.querySelector( 'body' ).classList.remove( 'filter-open' );
			document.querySelector( 'body' ).classList.remove( 'mobile-toggled' );
			return;
		}
		var elemp = elem.closest( '.mobile-search-toggle' );
		if ( elem.classList.contains( 'mobile-search-toggle' ) || elemp ) {
			event.stopPropagation();
			event.preventDefault();
			document.querySelector( 'body' ).classList.toggle( 'm-search-toggled' );
			return;
		}
		var elemp = elem.closest( '.add_to_cart_button' || elemp );
		if ( elem.classList.contains( 'add_to_cart_button' ) ) {
			document.querySelector( 'body' ).classList.remove( 'mobile-toggled' );
		}
	} );
	window.addEventListener( 'touchstart', function( event ) {
		var elem  = event.target;
		var elemp = elem.closest( '.menu-toggle' );
		if ( elem.classList.contains( 'menu-toggle' ) || elemp ) {
			event.stopPropagation();
			event.preventDefault();
			document.querySelector( 'body' ).classList.add( 'mobile-toggled' );
			return;
		}
		var elemp = elem.closest( '.close-drawer' );
		if ( elem.classList.contains( 'close-drawer' ) || elemp ) {
			document.querySelector( 'body' ).classList.remove( 'filter-open' );
			document.querySelector( 'body' ).classList.remove( 'mobile-toggled' );
			return;
		}
		if ( elem.classList.contains( 'mobile-overlay' ) ) {
			document.querySelector( 'body' ).classList.remove( 'filter-open' );
			document.querySelector( 'body' ).classList.remove( 'mobile-toggled' );
			return;
		}
		var elemp = elem.closest( '.mobile-search-toggle' );
		if ( elem.classList.contains( 'mobile-search-toggle' ) || elemp ) {
			event.stopPropagation();
			event.preventDefault();
			document.querySelector( 'body' ).classList.toggle( 'm-search-toggled' );
			return;
		}
	} );
	var cart_form = document.querySelector( '.single-product form.cart' );
	if ( cart_form ) {
		cart_form.setAttribute( 'id', 'sticky-scroll' );
	}
	var buttons = document.querySelectorAll( '.button-wrapper' );
	if ( buttons ) {
		buttons.forEach( function( buttons ) {
			buttons.classList.add( 'shoptimizer-size-guide' );
		} );
	}
	var prod_desc = document.querySelectorAll( '.term-description' );
	var prod_img  = document.querySelectorAll( '.woocommerce-products-header img' );
	var headers   = document.querySelectorAll( '.woocommerce-products-header' );
	if ( headers ) {
		headers.forEach( function( header ) {
			if ( 0 < prod_desc.length ) {
				header.classList.add( 'description-exists' );
			}
			if ( 0 < prod_img.length ) {
				header.classList.add( 'image-exists' );
			}
		} );
	}
	var lifws = document.querySelectorAll( 'li.full-width' );
	if ( lifws ) {
		lifws.forEach( function( lifw ) {
			lifw.addEventListener( 'mouseenter', function( event ) {
				var scontent = document.querySelector( '.site-content' );
				if ( scontent ) {
					scontent.classList.add( 'overlay' );
				}
			} );
			lifw.addEventListener( 'mouseleave', function( event ) {
				var scontent = document.querySelector( '.site-content' );
				if ( scontent ) {
					scontent.classList.remove( 'overlay' );
				}
			} );
		} );
	}
	var mobileContainer = document.querySelector( '.col-full-nav' );
	if ( mobileContainer ) {
		var mcparent = mobileContainer.closest( '.mobile-toggled' );
		if ( mcparent ) {
			mobileContainer.addEventListener( 'click', function( event ) {
				document.querySelector( 'body' ).classList.remove( 'mobile-toggled' );
			} );
			mobileContainer.addEventListener( 'touchstart', function( event ) {
				document.querySelector( 'body' ).classList.remove( 'mobile-toggled' );
			} );
		}
	}
	var carets = document.querySelectorAll( 'body .main-navigation ul.menu li.menu-item-has-children .caret' );
	if ( carets ) {
		carets.forEach( function( caret ) {
			caret.addEventListener( 'click', function( event ) {
				event.target.closest( 'li' ).classList.toggle( 'dropdown-open' );
				event.preventDefault();
			} );
		} );
	}
	var childs = document.querySelectorAll( '.main-navigation ul.menu li.menu-item-has-children > a' );
	if ( childs ) {
		childs.forEach( function( child ) {
			if ( '#' === child.getAttribute( 'href' ) ) {
				child.addEventListener( 'click', function( event ) {
					event.target.closest( 'li' ).classList.toggle( 'dropdown-open' );
					event.preventDefault();
				} );
			}
		} );
	}
	var sctop = document.querySelector( '.logo-mark a' );
	if ( sctop ) {
		sctop.addEventListener( 'click', function( event ) {
			var elem  = event.target;
			event.preventDefault();
			window.scroll( {
				behavior: 'smooth',
				left: 0,
				top: 0
			} );
		} );
	}
	var vsctops = document.querySelectorAll( 'a.variable-grouped-sticky' );
	if ( vsctops ) {
		vsctops.forEach( function( vsctop ) {
			if ( '#' !== vsctop.getAttribute( 'href' ) ) {
				vsctop.addEventListener( 'click', function( event ) {
					var elem  = document.querySelector( vsctop.getAttribute( 'href' ) );
					if ( elem ) {
						event.preventDefault();
						window.scroll( {
							behavior: 'smooth',
							left: 0,
							top: elem.offsetTop - 80
						} );
					}
				} );
			}
		} );
	}

	var lazyImages = [].slice.call( document.querySelectorAll( 'img.lazy' ) );
	var active = false;

	const lazyLoad = function() {
		if ( false === active ) {
			active = true;

			setTimeout( function() {
				lazyImages.forEach( function( lazyImage ) {
					if ( ( lazyImage.getBoundingClientRect().top <= window.innerHeight && 0 <= lazyImage.getBoundingClientRect().bottom ) && 'none' !== getComputedStyle( lazyImage ).display ) {
						lazyImage.src = lazyImage.dataset.src;
						lazyImage.srcset = lazyImage.dataset.srcset;
						lazyImage.classList.remove( 'lazy' );

						lazyImages = lazyImages.filter( function( image ) {
							return image !== lazyImage;
						} );

						if ( 0 === lazyImages.length ) {
							document.removeEventListener( 'scroll', lazyLoad );
							window.removeEventListener( 'resize', lazyLoad );
							window.removeEventListener( 'orientationchange', lazyLoad );
						}
					}
				} );

				active = false;
			}, 200 );
		}
	};

	document.addEventListener( 'scroll', lazyLoad );
	window.addEventListener( 'resize', lazyLoad );
	window.addEventListener( 'orientationchange', lazyLoad );
} );
function makeOnTouchTapped() {
	if ( 992 < window.innerWidth ) {
		if ( 'ontouchstart' in window ) {
			document.addEventListener( 'touchstart', function() {}, true );
			document.addEventListener( 'click', function( event ) {
				var elem = event.target;
				if ( ! elem.classList.contains( 'menu-item-has-children' ) ) {
					var parent = elem.closest( '.menu-item-has-children' );
				 	if ( ! parent ) {
						return;
					}
					elem = parent;
				}

				var menus = document.querySelectorAll( '.menu-item-has-children.tapped' );
				if ( menus ) {
					menus.forEach( function( menu ) {
						if ( menu !== elem ) {
							menu.classList.remove( 'tapped' );
						}
					} );
				}
				if ( ! elem.classList.contains( 'tapped' ) ) {
					elem.classList.add( 'tapped' );
					event.preventDefault();
					return false;
				} else {
					return true;
				}
			}, true );
		}
	}
}
var interceptor = ( function( open ) {
	XMLHttpRequest.prototype.open = function( method, url, async, user, pass ) {
		this.addEventListener( 'readystatechange', function() {
		switch ( this.readyState ) {
			case 1:
				document.querySelector( '#ajax-loading' ).style.display = 'block';
			break;
			case 4:
				document.querySelector( '#ajax-loading' ).style.display = 'none';
			break;
		}
		}, false );
		open.call( this, method, url, async, user, pass );
	};
}  ( XMLHttpRequest.prototype.open ) );
document.addEventListener( 'DOMContentLoaded', function() {
	document.querySelector( '#ajax-loading' ).style.display = 'none';
} );
