import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import carousel from './common/carousel';
import svgInjector from './global/svg-injector';

export default class Global extends PageManager {
    onReady() {
        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        svgInjector();
        this.featuredCardsCarousel();
    }

    featuredCardsCarousel() {
        const featuredCardsArr = $('.featuredCards');
        featuredCardsArr.each((index, el) => {
            if ($(el).hasClass('carousel')) {
                $(el).find('ul').slick({
                    dots: false,
                    infinite: true,
                    autoplay: false,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [
                        {
                            breakpoint: 1261,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 801,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 551,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            }
        });


        // custom equal heights function for blog articles
        const equalHeights = (selector) => {
            const elms = document.querySelectorAll(selector);
            const len = elms.length;
            let tallest = 0;
            // eslint-disable-next-line one-var
            let elm,
                elmHeight,
                x;
    
            for (x = 0; x < len; x++) {
                elms[x].style.height = 'auto';
            }
    
            for (x = 0; x < len; x++) {
                elm = elms[x];
                elmHeight = elm.offsetHeight;
                tallest = (elmHeight > tallest) ? elmHeight : tallest;
            }
    
            for (x = 0; x < len; x++) {
                // eslint-disable-next-line prefer-template
                elms[x].style.height = tallest + 'px';
            }
        };
        const debounce = (callback, wait) => {
            let timeout;
            return (...args) => {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => callback.apply(context, args), wait);
            };
        };
        const debounceResize = debounce(() => {
            equalHeights('.featuredCards-item img');
        }, 250);
        window.addEventListener('resize', debounceResize);
        window.dispatchEvent(new Event('resize'));
    }
}
