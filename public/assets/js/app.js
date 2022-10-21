/*!
 *
 * 47admin - Bootstrap Admin Theme
 *
 * Version: 2.0
 * Author: @geedmo
 * Website: http://geedmo.com
 * License: https://codecanyon.net/licenses/standard
 *
 */

(function() {
    'use strict';

    $(initApp);

    // initialize app here
    function initApp() {
        // unhide offsidebar
        var offsidebar = document.querySelector('.offsidebar.d-none');
        if (offsidebar) offsidebar.classList.remove('d-none');
    }
})();

/*
// Flot
*/

// Initializes the flot chart plugin and attaches the
// plugin to elements according to its type

(function() {
    'use strict';

    $(initChartDemo);

    /**
     * Global object to load data for charts using ajax
     * Request the chart data from the server via post
     * Expects a response in JSON format to init the plugin
     * Usage
     *   chart = new floatChart('#id', 'server/chart-data.php')
     *   ...
     *   chart.requestData(options);
     *
     * @param  Chart element placeholder or selector
     * @param  Url to get the data via post. Response in JSON format
     */
    window.FlotChart = function(element, url) {
        // Properties
        this.element = $(element);
        this.url = url;

        // Public method
        this.requestData = function(option, method, callback) {
            var self = this;

            // support params (option), (option, method, callback) or (option, callback)
            callback = method && $.isFunction(method) ? method : callback;
            method = method && typeof method == 'string' ? method : 'POST';

            self.option = option; // save options

            $.ajax({
                url: self.url,
                cache: false,
                type: method,
                dataType: 'json'
            }).done(function(data) {
                $.plot(self.element, data, option);

                if (callback) callback();
            });

            return this; // chain-ability
        };

        // Listen to refresh events
        this.listen = function() {
            var self = this,
                chartCard = this.element.parents('.card')[0];
            // attach custom event
            chartCard.addEventListener('card.refresh', function(event) {
                // request data and remove spinner when done
                self.requestData(self.option, 'GET', function() {
                    event.detail.card.removeSpinner();
                });
            });

            return this; // chain-ability
        };
    };

    //
    // Start of Demo Script
    //
    function initChartDemo() {
        // Bar chart
        (function() {
            var Selector = '.chart-bar';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Bar: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            bars: {
                                align: 'center',
                                lineWidth: 0,
                                show: true,
                                barWidth: 0.6,
                                fill: 0.9
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#fcfcfc',
                            mode: 'categories'
                        },
                        yaxis: {
                            tickColor: '#eee'
                        },
                        shadowSize: 0
                    };
                // Send Request
                chart.requestData(option, 'GET');
            });
        })();
        // Bar Stacked chart
        (function() {
            var Selector = '.chart-bar-stacked';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Bar Stacked: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            stack: true,
                            bars: {
                                align: 'center',
                                lineWidth: 0,
                                show: true,
                                barWidth: 0.6,
                                fill: 0.9
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#fcfcfc',
                            mode: 'categories'
                        },
                        yaxis: {
                            tickColor: '#eee'
                        },
                        shadowSize: 0
                    };
                // Send Request
                chart.requestData(option, 'GET');
            });
        })();
        // Area chart
        (function() {
            var Selector = '.chart-area';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Area: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            lines: {
                                show: true,
                                fill: 0.8
                            },
                            points: {
                                show: true,
                                radius: 4
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#fcfcfc',
                            mode: 'categories'
                        },
                        yaxis: {
                            tickColor: '#eee',
                            tickFormatter: function(v) {
                                return v + ' visitors';
                            }
                        },
                        shadowSize: 0
                    };

                // Send Request and Listen for refresh events
                chart.requestData(option, 'GET').listen();
            });
        })();
        // Line chart
        (function() {
            var Selector = '.chart-line';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Line: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            lines: {
                                show: true,
                                fill: 0.01
                            },
                            points: {
                                show: true,
                                radius: 4
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#eee',
                            mode: 'categories'
                        },
                        yaxis: {
                            tickColor: '#eee'
                        },
                        shadowSize: 0
                    };
                // Send Request
                chart.requestData(option, 'GET');
            });
        })();
        // Pïe
        (function() {
            var Selector = '.chart-pie';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Pie: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            pie: {
                                show: true,
                                innerRadius: 0,
                                label: {
                                    show: true,
                                    radius: 0.8,
                                    formatter: function(label, series) {
                                        return (
                                            '<div class="flot-pie-label">' +
                                            //label + ' : ' +
                                            Math.round(series.percent) +
                                            '%</div>'
                                        );
                                    },
                                    background: {
                                        opacity: 0.8,
                                        color: '#222'
                                    }
                                }
                            }
                        }
                    };
                // Send Request
                chart.requestData(option, 'GET');
            });
        })();
        // Donut
        (function() {
            var Selector = '.chart-donut';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Donut: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            pie: {
                                show: true,
                                innerRadius: 0.5 // This makes the donut shape
                            }
                        }
                    };
                // Send Request
                chart.requestData(option, 'GET');
            });
        })();
    }
})();

/*
// Sparkline
*/

(function() {
    'use strict';

    $(initSparkline);

    function initSparkline() {
        $('.sparkline').each(initSparkLine);

        function initSparkLine() {
            var $element = $(this),
                options = $element.data(),
                values = options.values && options.values.split(',');

            options.type = options.type || 'bar'; // default chart is bar
            options.disableHiddenCheck = true;

            if (APP_COLORS && APP_COLORS[options.barColor]) {
                options.barColor = APP_COLORS[options.barColor];
            }
            options.resize = true;

            $element.sparkline(values, options);
        }
    }
})();

/*
// Bootstrap
*/

(function() {
    'use strict';

    $(initBootstrap);

    function initBootstrap() {
        // necessary check at least til BS doesn't require jQuery
        if (!$.fn || !$.fn.tooltip || !$.fn.popover) return;

        // POPOVER
        // -----------------------------------

        $('[data-toggle="popover"]').popover();

        // TOOLTIP
        // -----------------------------------

        $('[data-toggle="tooltip"]').tooltip({
            container: 'body'
        });

        // DROPDOWN INPUTS
        // -----------------------------------
        $('.dropdown input').on('click focus', function(event) {
            event.stopPropagation();
        });
    }
})();

/*
// Card Tools
*/

(function() {
    'use strict';

    $(initCardDismiss);
    $(initCardCollapse);
    $(initCardRefresh);

    /**
     * Helper function to find the closest
     * ascending .card element
     */
    function getCardParent(item) {
        var el = item.parentElement;
        while (el && !el.classList.contains('card')) el = el.parentElement;
        return el;
    }
    /**
     * Helper to trigger custom event
     */
    function triggerEvent(type, item, data) {
        var ev;
        if (typeof CustomEvent === 'function') {
            ev = new CustomEvent(type, { detail: data });
        } else {
            ev = document.createEvent('CustomEvent');
            ev.initCustomEvent(type, true, false, data);
        }
        item.dispatchEvent(ev);
    }

    /**
     * Dismiss cards
     * [data-perform="card-dismiss"]
     */
    function initCardDismiss() {
        var cardtoolSelector = '[data-perform="card-dismiss"]';

        var cardList = [].slice.call(document.querySelectorAll(cardtoolSelector));

        cardList.forEach(function(item) {
            new CardDismiss(item);
        });

        function CardDismiss(item) {
            var EVENT_REMOVE = 'card.remove';
            var EVENT_REMOVED = 'card.removed';

            this.item = item;
            this.cardParent = getCardParent(this.item);
            this.removing = false; // prevents double execution

            this.clickHandler = function(e) {
                if (this.removing) return;
                this.removing = true;
                // pass callbacks via event.detail to confirm/cancel the removal
                triggerEvent(EVENT_REMOVE, this.cardParent, {
                    confirm: this.confirm.bind(this),
                    cancel: this.cancel.bind(this)
                });
            };
            this.confirm = function() {
                this.animate(this.cardParent, function() {
                    triggerEvent(EVENT_REMOVED, this.cardParent);
                    this.remove(this.cardParent);
                });
            };
            this.cancel = function() {
                this.removing = false;
            };
            this.animate = function(item, cb) {
                if ('onanimationend' in window) {
                    // animation supported
                    item.addEventListener('animationend', cb.bind(this));
                    item.className += ' animated bounceOut'; // requires animate.css
                } else cb.call(this); // no animation, just remove
            };
            this.remove = function(item) {
                item.parentNode.removeChild(item);
            };
            // attach listener
            item.addEventListener('click', this.clickHandler.bind(this), false);
        }
    }

    /**
     * Collapsed cards
     * [data-perform="card-collapse"]
     * [data-start-collapsed]
     */
    function initCardCollapse() {
        var cardtoolSelector = '[data-perform="card-collapse"]';
        var cardList = [].slice.call(document.querySelectorAll(cardtoolSelector));

        cardList.forEach(function(item) {
            var initialState = item.hasAttribute('data-start-collapsed');
            new CardCollapse(item, initialState);
        });

        function CardCollapse(item, startCollapsed) {
            var EVENT_SHOW = 'card.collapse.show';
            var EVENT_HIDE = 'card.collapse.hide';

            this.state = true; // true -> show / false -> hide
            this.item = item;
            this.cardParent = getCardParent(this.item);
            this.wrapper = this.cardParent.querySelector('.card-wrapper');

            if (!this.wrapper)
                throw new Error('Card action Collapse requires a .card-wrapper element.');

            this.toggleCollapse = function(action) {
                triggerEvent(action ? EVENT_SHOW : EVENT_HIDE, this.cardParent);
                this.wrapper.style.maxHeight = (action ? this.wrapper.scrollHeight : 0) + 'px';
                this.state = action;
                this.updateIcon(action);
            };
            this.updateIcon = function(action) {
                this.item.firstElementChild.className = action ? 'fa fa-minus' : 'fa fa-plus';
            };
            this.clickHandler = function() {
                this.toggleCollapse(!this.state);
            };
            this.initStyles = function() {
                this.wrapper.style.maxHeight = this.wrapper.scrollHeight + 'px';
                this.wrapper.style.transition = 'max-height 0.5s';
                this.wrapper.style.overflow = 'hidden';
            };

            // prepare styles for collapse animation
            this.initStyles();
            // set initial state if provided
            if (startCollapsed) {
                this.toggleCollapse(false);
            }
            // attach listener
            this.item.addEventListener('click', this.clickHandler.bind(this), false);
        }
    }

    /**
     * Refresh cards
     * [data-perform="card-refresh"]
     * [data-spinner="standard"]
     */
    function initCardRefresh() {
        var cardtoolSelector = '[data-perform="card-refresh"]';
        var cardList = [].slice.call(document.querySelectorAll(cardtoolSelector));

        cardList.forEach(function(item) {
            new CardRefresh(item);
        });

        function CardRefresh(item) {
            var EVENT_REFRESH = 'card.refresh';
            var WHIRL_CLASS = 'whirl';
            var DEFAULT_SPINNER = 'standard';

            this.item = item;
            this.cardParent = getCardParent(this.item);
            this.spinner = ((this.item.dataset || {}).spinner || DEFAULT_SPINNER).split(' '); // support space separated classes

            this.refresh = function(e) {
                var card = this.cardParent;
                // start showing the spinner
                this.showSpinner(card, this.spinner);
                // attach as public method
                card.removeSpinner = this.removeSpinner.bind(this);
                // Trigger the event and send the card
                triggerEvent(EVENT_REFRESH, card, { card: card });
            };
            this.showSpinner = function(card, spinner) {
                card.classList.add(WHIRL_CLASS);
                spinner.forEach(function(s) {
                    card.classList.add(s);
                });
            };
            this.removeSpinner = function() {
                this.cardParent.classList.remove(WHIRL_CLASS);
            };

            // attach listener
            this.item.addEventListener('click', this.refresh.bind(this), false);
        }
    }
})();

/*
// Constants
*/

(function() {

    window.APP_COLORS = {
        'primary':                '#5d9cec',
        'success':                '#27c24c',
        'info':                   '#23b7e5',
        'warning':                '#ff902b',
        'danger':                 '#f05050',
        'inverse':                '#131e26',
        'green':                  '#37bc9b',
        'pink':                   '#f532e5',
        'purple':                 '#7266ba',
        'dark':                   '#3a3f51',
        'yellow':                 '#fad732',
        'gray-darker':            '#232735',
        'gray-dark':              '#3a3f51',
        'gray':                   '#dde6e9',
        'gray-light':             '#e4eaec',
        'gray-lighter':           '#edf1f2'
    };

    window.APP_MEDIAQUERY = {
        'desktopLG':             1200,
        'desktop':                992,
        'tablet':                 768,
        'mobile':                 480
    };

})();
/*
// Navbar search
*/

(function() {
    'use strict';

    $(initNavbarSearch);

    function initNavbarSearch() {
        var navbarFormSelector = 'form.navbar-form';
        var navbarForm = document.querySelector(navbarFormSelector);

        if (!navbarForm) return; // if not search form in page simply abort

        var formInput = navbarForm.querySelector('input[type="text"]');
        // Open search elements
        var searchOpener = [].slice.call(document.querySelectorAll('[data-search-open]'));
        // Close search elements
        var searchDismiss = [].slice.call(document.querySelectorAll('[data-search-dismiss]'));

        searchOpener.forEach(function(el) {
            el.addEventListener('click', function(e) {
                e.stopPropagation();
                navbarSearchToggle();
            });
        });

        if (formInput) {
            formInput.addEventListener('click', function(e) {
                // stop event to avoid handle as external click
                e.stopPropagation();
            });
            formInput.addEventListener('keyup', function(e) {
                // Close on ESC key press
                if (e.keyCode == 27) navbarSearchDismiss();
            });
        }

        // click anywhere closes the search
        document.addEventListener('click', navbarSearchDismiss);

        // dismissable options
        searchDismiss.forEach(function(el) {
            el.addEventListener('click', function(e) {
                e.stopPropagation();
                navbarSearchDismiss();
            });
        });

        // Helper methods
        function navbarSearchToggle() {
            if (navbarForm) {
                navbarForm.classList.toggle('open');
                var isOpen = navbarForm.classList.contains('open');
                if (formInput) formInput[isOpen ? 'focus' : 'blur']();
            }
        }
        function navbarSearchDismiss() {
            if (navbarForm) {
                navbarForm.classList.remove('open'); // Close control
                if (formInput) formInput.blur(); // remove focus
                // formInput.value = ''             // Empty input
            }
        }
    }
})();

/*
// Sidebar
*/
(function() {
    'use strict';

    $(initSidebar);

    var $sidebar;

    function initSidebar() {
        $sidebar = $('.sidebar');

        // AUTOCOLLAPSE ITEMS
        // -----------------------------------

        var sidebarCollapse = $sidebar.find('.collapse');
        sidebarCollapse.on('show.bs.collapse', function(event) {
            event.stopPropagation();
            if ($(this).parents('.collapse').length === 0)
                sidebarCollapse
                    .filter('.show')
                    .not('#user-block')
                    .collapse('hide');
        });

        // SIDEBAR ACTIVE STATE
        // -----------------------------------

        // Find current active item
        var currentItem = $('.sidebar .active').parents('li');

        // hover mode don't try to expand active collapse
        currentItem
            .addClass('active') // activate the parent
            .children('.collapse') // find the collapse
            .collapse('show'); // and show it

        // SIDEBAR COLLAPSED ITEM HANDLER
        // -----------------------------------

        var eventName = isTouch() ? 'click' : 'mouseenter';
        var subNav = $();
        $sidebar.find('.sidebar-nav > li').on(eventName, function(e) {
            if (isSidebarCollapsed()) {
                subNav.trigger('mouseleave');
                subNav = toggleMenuItem($(this));

                // Used to detect click and touch events outside the sidebar
                sidebarAddBackdrop();
            }
        });

        // Autoclose sidebar on external clicks
        $('.wrapper').on('click.sidebar', function(e) {
            // don't check if sidebar not visible
            if (!document.body.classList.contains('aside-toggled')) return;

            var $target = $(e.target);
            if (
                !$target.parents('.aside-container').length && // if not child of sidebar
                !$target.is('#user-block-toggle') && // user block toggle anchor
                !$target.parent().is('#user-block-toggle') // user block toggle icon
            ) {
                document.body.classList.remove('aside-toggled');
            }
        });
    }

    function sidebarAddBackdrop() {
        var $backdrop = $('<div/>', { class: 'sidebar-backdrop' });
        $backdrop.insertAfter('.aside-container').on('click mouseenter', function() {
            removeFloatingNav();
        });
    }

    // Open the collapse sidebar submenu items when on touch devices
    // - desktop only opens on hover
    function toggleTouchItem($element) {
        $element.siblings('li').removeClass('open');
        $element.toggleClass('open');
    }

    // Handles hover to open items under collapsed menu
    // -----------------------------------
    function toggleMenuItem($listItem) {
        removeFloatingNav();

        var ul = $listItem.children('ul');

        if (!ul.length) return $();
        if ($listItem.hasClass('open')) {
            toggleTouchItem($listItem);
            return $();
        }

        var $aside = $('.aside-container');
        var $asideInner = $('.aside-inner'); // for top offset calculation
        // float aside uses extra padding on aside
        var mar =
            parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);

        var subNav = ul.clone().appendTo($aside);

        toggleTouchItem($listItem);

        var itemTop = $listItem.position().top + mar - $sidebar.scrollTop();
        var vwHeight = document.body.clientHeight;

        subNav.addClass('nav-floating').css({
            position: 'fixed',
            top: itemTop,
            bottom: subNav.outerHeight(true) + itemTop > vwHeight ? 0 : 'auto'
        });

        subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
        });

        return subNav;
    }

    function removeFloatingNav() {
        $('.sidebar-subnav.nav-floating').remove();
        $('.sidebar-backdrop').remove();
        $('.sidebar li.open').removeClass('open');
    }

    function isTouch() {
        return 'ontouchstart' in window || navigator.msMaxTouchPoints;
    }

    function isSidebarCollapsed() {
        return document.body.classList.contains('aside-collapsed');
    }

    function isSidebarToggled() {
        return document.body.classList.contains('aside-toggled');
    }

    function isMobile() {
        return document.body.clientWidth < APP_MEDIAQUERY.tablet;
    }
})();

/*
// Slimscroll
*/

(function() {
    'use strict';

    $(initSlimsSroll);

    function initSlimsSroll() {
        if (!$.fn || !$.fn.slimScroll) return;

        $('[data-scrollable]').each(function() {
            var element = $(this),
                defaultHeight = 250;

            element.slimScroll({
                height: element.data('height') || defaultHeight
            });
        });
    }
})();

/*
// Table Check All
*/

(function() {
    'use strict';

    $(initTableCheckAll);

    function initTableCheckAll() {
        var elements = [].slice.call(document.querySelectorAll('[data-check-all]'));

        elements.forEach(function(el) {
            return (el.onchange = checkAllHandler);
        });

        function checkAllHandler(e) {
            var element = e.currentTarget; // TH
            var table = closest(element, 'table');
            var checkbox = element.querySelector('input[type="checkbox"]');
            if (table && checkbox) {
                var ths = [].slice.call(table.querySelectorAll('th'));
                ths.some(function(el, index) {
                    if (el === element) {
                        var cbs = [].slice.call(
                            table.querySelectorAll(
                                'td:nth-child(' + (index + 1) + ') input[type="checkbox"]'
                            )
                        );
                        cbs.forEach(function(el) {
                            return (el.checked = checkbox.checked);
                        });
                        return true;
                    }
                });
            }
        }
    }

    function closest(element, selector) {
        if (Element.prototype.closest) {
            return element.closest(selector);
        } else {
            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
            }
            var el = element;
            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        }
    }
})();

/*
// Toggle State
*/
(function() {
    'use strict';

    $(initToggleState);

    function initToggleState() {
        var toggle = new StateToggler();

        var toggleElements = [].slice.call(document.querySelectorAll('[data-toggle-state]'));

        toggleElements.forEach(function(el) {
            el.addEventListener('click', toggleStateHandler);
        });

        function toggleStateHandler(e) {
            // e.preventDefault();
            e.stopPropagation();
            var element = e.currentTarget,
                targetSel = element.getAttribute('data-target'),
                classname = element.getAttribute('data-toggle-state'),
                noPersist = element.hasAttribute('data-no-persist');

            // Specify a target selector to toggle classname
            // use body by default
            var target = targetSel ? document.querySelector(targetSel) : document.body;

            if (classname) {
                if (target.classList.contains(classname)) {
                    target.classList.remove(classname);
                    if (!noPersist) toggle.removeState(classname);
                } else {
                    target.classList.add(classname);
                    if (!noPersist) toggle.addState(classname);
                }
            }

            // some elements may need this when toggled class change the content size
            if (typeof Event === 'function') {
                // modern browsers
                window.dispatchEvent(new Event('resize'));
            } else {
                // old browsers and IE
                var resizeEvent = window.document.createEvent('UIEvents');
                resizeEvent.initUIEvent('resize', true, false, window, 0);
                window.dispatchEvent(resizeEvent);
            }
        }
    }

    // Handle states to/from localstorage
    function StateToggler() {
        var STORAGE_KEY_NAME = 'jq-toggleState';

        /** Add a state to the browser storage to be restored later */
        this.addState = function(classname) {
            var data = Storages.localStorage.get(STORAGE_KEY_NAME);
            if (data instanceof Array) data.push(classname);
            else data = [classname];
            Storages.localStorage.set(STORAGE_KEY_NAME, data);
        };
        /** Remove a state from the browser storage */
        this.removeState = function(classname) {
            var data = Storages.localStorage.get(STORAGE_KEY_NAME);
            if (data) {
                var index = data.indexOf(classname);
                if (index !== -1) data.splice(index, 1);
                Storages.localStorage.set(STORAGE_KEY_NAME, data);
            }
        };
        /** Load the state string and restore the classlist */
        this.restoreState = function(elem) {
            var data = Storages.localStorage.get(STORAGE_KEY_NAME);
            if (data instanceof Array)
                data.forEach(function(c) {
                    return elem.classList.add(c);
                });
        };
    }

    window.StateToggler = StateToggler;
})();

/*
// Trigger Resize
*/

// Triggers a window resize event from any element
(function() {
    'use strict';

    $(initTriggerResize);

    function initTriggerResize() {
        var elements = [].slice.call(document.querySelectorAll('[data-trigger-resize]'));
        elements.forEach(function(el) {
            el.addEventListener('click', toggleResizeHandler);
        });
        function toggleResizeHandler(e) {
            var element = e.currentTarget;
            var value = element.getAttribute('data-trigger-resize');
            setTimeout(function() {
                // all IE friendly dispatchEvent
                var evt = document.createEvent('UIEvents');
                evt.initUIEvent('resize', true, false, window, 0);
                window.dispatchEvent(evt);
                // modern dispatchEvent way
                // window.dispatchEvent(new Event('resize'));
            }, value || 300);
        }
    }
})();

/*
// Calendar
*/

(function() {
    'use strict';

    // When dom ready, init calendar and events
    $(initFullCalendar);

    function initFullCalendar() {
        if (!$.fn.fullCalendar) return;

        // The element that will display the calendar
        var calendar = $('#calendar');

        var demoEvents = createDemoEvents();

        initExternalEvents(calendar);

        initCalendar(calendar, demoEvents);
    }

    // global shared var to know what we are dragging
    var draggingEvent = null;

    /**
     * ExternalEvent object
     * @param jQuery Object elements Set of element as jQuery objects
     */
    var ExternalEvent = function(elements) {
        if (!elements) return;

        elements.each(function() {
            var $this = $(this);
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var calendarEventObject = {
                title: $.trim($this.text()) // use the element's text as the event title
            };

            // store the Event Object in the DOM element so we can get to it later
            $this.data('calendarEventObject', calendarEventObject);

            // make the event draggable using jQuery UI
            $this.draggable({
                zIndex: 1070,
                revert: true, // will cause the event to go back to its
                revertDuration: 0 //  original position after the drag
            });
        });
    };

    /**
     * Invoke full calendar plugin and attach behavior
     * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
     * @param  EventObject [events] An object with the event list to load when the calendar displays
     */
    function initCalendar(calElement, events) {
        // check to remove elements from the list
        var removeAfterDrop = $('#remove-after-drop');

        calElement.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            buttonIcons: {
                // note the space at the beginning
                prev: ' fa fa-caret-left',
                next: ' fa fa-caret-right'
            },
            buttonText: {
                today: 'today',
                month: 'month',
                week: 'week',
                day: 'day'
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            drop: function(date, allDay) {
                // this function is called when something is dropped

                var $this = $(this),
                    // retrieve the dropped element's stored Event Object
                    originalEventObject = $this.data('calendarEventObject');

                // if something went wrong, abort
                if (!originalEventObject) return;

                // clone the object to avoid multiple events with reference to the same object
                var clonedEventObject = $.extend({}, originalEventObject);

                // assign the reported date
                clonedEventObject.start = date;
                clonedEventObject.allDay = allDay;
                clonedEventObject.backgroundColor = $this.css('background-color');
                clonedEventObject.borderColor = $this.css('border-color');

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks"
                // (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                calElement.fullCalendar('renderEvent', clonedEventObject, true);

                // if necessary remove the element from the list
                if (removeAfterDrop.is(':checked')) {
                    $this.remove();
                }
            },
            eventDragStart: function(event, js, ui) {
                draggingEvent = event;
            },
            // This array is the events sources
            events: events
        });
    }

    /**
     * Inits the external events card
     * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
     */
    function initExternalEvents(calElement) {
        // Card with the external events list
        var externalEvents = $('.external-events');

        // init the external events in the card
        new ExternalEvent(externalEvents.children('div'));

        // External event color is danger-red by default
        var currColor = '#f6504d';
        // Color selector button
        var eventAddBtn = $('.external-event-add-btn');
        // New external event name input
        var eventNameInput = $('.external-event-name');
        // Color switchers
        var eventColorSelector = $('.external-event-color-selector .point');

        // Trash events Droparea
        $('.external-events-trash').droppable({
            accept: '.fc-event',
            activeClass: 'active',
            hoverClass: 'hovered',
            tolerance: 'touch',
            drop: function(event, ui) {
                // You can use this function to send an ajax request
                // to remove the event from the repository

                if (draggingEvent) {
                    var eid = draggingEvent.id || draggingEvent._id;
                    // Remove the event
                    calElement.fullCalendar('removeEvents', eid);
                    // Remove the dom element
                    ui.draggable.remove();
                    // clear
                    draggingEvent = null;
                }
            }
        });

        eventColorSelector.click(function(e) {
            e.preventDefault();
            var $this = $(this);

            // Save color
            currColor = $this.css('background-color');
            // De-select all and select the current one
            eventColorSelector.removeClass('selected');
            $this.addClass('selected');
        });

        eventAddBtn.click(function(e) {
            e.preventDefault();

            // Get event name from input
            var val = eventNameInput.val();
            // Dont allow empty values
            if ($.trim(val) === '') return;

            // Create new event element
            var newEvent = $('<div/>')
                .css({
                    'background-color': currColor,
                    'border-color': currColor,
                    color: '#fff',
                    display: 'inline-block'
                })
                .html(val);

            // Prepends to the external events list
            externalEvents.prepend(newEvent);
            // Initialize the new event element
            new ExternalEvent(newEvent);
            // Clear input
            eventNameInput.val('');
        });
    }

    /**
     * Creates an array of events to display in the first load of the calendar
     * Wrap into this function a request to a source to get via ajax the stored events
     * @return Array The array with the events
     */
    function createDemoEvents() {
        // Date for the calendar events (dummy data)
        var date = new Date();
        var d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear();

        return [
            {
                title: 'All Day Event',
                start: new Date(y, m, 1),
                backgroundColor: '#f56954', //red
                borderColor: '#f56954' //red
            },
            {
                title: 'Long Event',
                start: new Date(y, m, d - 5),
                end: new Date(y, m, d - 2),
                backgroundColor: '#f39c12', //yellow
                borderColor: '#f39c12' //yellow
            },
            {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                backgroundColor: '#0073b7', //Blue
                borderColor: '#0073b7' //Blue
            },
            {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false,
                backgroundColor: '#00c0ef', //Info (aqua)
                borderColor: '#00c0ef' //Info (aqua)
            },
            {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false,
                backgroundColor: '#00a65a', //Success (green)
                borderColor: '#00a65a' //Success (green)
            },
            {
                title: 'Open Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: '//google.com/',
                backgroundColor: '#3c8dbc', //Primary (light-blue)
                borderColor: '#3c8dbc' //Primary (light-blue)
            }
        ];
    }
})();

/*
// Cards (events demo)
*/

(function() {
    'use strict';

    $(initCardDemo);

    function initCardDemo() {
        /**
         * This functions show a demonstration of how to use
         * the card tools system via custom event.
         */
        var cardList = [].slice.call(document.querySelectorAll('.card'));
        cardList.forEach(function(item) {
            item.addEventListener('card.refresh', function(event) {
                // get the card element that is refreshing
                var card = event.detail.card;
                // perform any action here, when it is done,
                // remove the spinner calling "removeSpinner"
                // setTimeout used to simulate async operation
                setTimeout(card.removeSpinner, 3000);
            });
            item.addEventListener('card.collapse.hide', function() {
                console.log('Card Collapse Hide');
            });
            item.addEventListener('card.collapse.show', function() {
                console.log('Card Collapse Show');
            });
            item.addEventListener('card.remove', function(event) {
                var confirm = event.detail.confirm;
                var cancel = event.detail.cancel;
                // perform any action  here
                console.log('Removing Card');
                // Call confirm() to continue removing card
                // otherwise call cancel()
                confirm();
            });
            item.addEventListener('card.removed', function(event) {
                console.log('Removed Card');
            });
        });
    }
})();

/*
// Maps
*/

(function() {
    'use strict';

    $(initGoogleMaps);

    // -------------------------
    // Map Style definition
    // -------------------------
    // Get more styles from http://snazzymaps.com/style/29/light-monochrome
    // - Just replace and assign to 'MapStyles' the new style array
    var MapStyles = [
        { featureType: 'water', stylers: [{ visibility: 'on' }, { color: '#bdd1f9' }] },
        { featureType: 'all', elementType: 'labels.text.fill', stylers: [{ color: '#334165' }] },
        { featureType: 'landscape', stylers: [{ color: '#e9ebf1' }] },
        { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#c5c6c6' }] },
        { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#fff' }] },
        { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#fff' }] },
        { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#d8dbe0' }] },
        { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#cfd5e0' }] },
        { featureType: 'administrative', stylers: [{ visibility: 'on' }, { lightness: 33 }] },
        {
            featureType: 'poi.park',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }, { lightness: 20 }]
        },
        { featureType: 'road', stylers: [{ color: '#d8dbe0', lightness: 20 }] }
    ];

    function initGoogleMaps() {
        if (!$.fn.gMap) return;

        var mapSelector = '[data-gmap]';
        var gMapRefs = [];

        $(mapSelector).each(function() {
            var $this = $(this),
                addresses = $this.data('address') && $this.data('address').split(';'),
                titles = $this.data('title') && $this.data('title').split(';'),
                zoom = $this.data('zoom') || 14,
                maptype = $this.data('maptype') || 'ROADMAP', // or 'TERRAIN'
                markers = [];

            if (addresses) {
                for (var a in addresses) {
                    if (typeof addresses[a] == 'string') {
                        markers.push({
                            address: addresses[a],
                            html: (titles && titles[a]) || '',
                            popup: true /* Always popup */
                        });
                    }
                }

                var options = {
                    controls: {
                        panControl: true,
                        zoomControl: true,
                        mapTypeControl: true,
                        scaleControl: true,
                        streetViewControl: true,
                        overviewMapControl: true
                    },
                    scrollwheel: false,
                    maptype: maptype,
                    markers: markers,
                    zoom: zoom
                    // More options https://github.com/marioestrada/jQuery-gMap
                };

                var gMap = $this.gMap(options);

                var ref = gMap.data('gMap.reference');
                // save in the map references list
                gMapRefs.push(ref);

                // set the styles
                if ($this.data('styled') !== undefined) {
                    ref.setOptions({
                        styles: MapStyles
                    });
                }
            }
        }); //each
    }
})();

/*
// Notify
*/

/*
 * Create toggleable notifications that fade out automatically.
 * Based on Notify addon from UIKit (http://getuikit.com/docs/addons_notify.html)
 * [data-toggle="notify"]
 * [data-options="options in json format" ]*/

(function() {
    'use strict';

    $(initNotify);

    function initNotify() {
        var Selector = '[data-notify]',
            autoloadSelector = '[data-onload]',
            doc = $(document);

        $(Selector).each(function() {
            var $this = $(this),
                onload = $this.data('onload');

            if (onload !== undefined) {
                setTimeout(function() {
                    notifyNow($this);
                }, 800);
            }

            $this.on('click', function(e) {
                e.preventDefault();
                notifyNow($this);
            });
        });
    }

    function notifyNow($element) {
        var message = $element.data('message'),
            options = $element.data('options');

        if (!message) $.error('Notify: No message specified');

        $.notify(message, options || {});
    }
})();

/**
 * Notify Addon definition as jQuery plugin
 * Adapted version to work with Bootstrap classes
 * More information http://getuikit.com/docs/addons_notify.html
 */

(function() {
    var containers = {},
        messages = {},
        notify = function(options) {
            if ($.type(options) == 'string') {
                options = { message: options };
            }

            if (arguments[1]) {
                options = $.extend(
                    options,
                    $.type(arguments[1]) == 'string' ? { status: arguments[1] } : arguments[1]
                );
            }

            return new Message(options).show();
        },
        closeAll = function(group, instantly) {
            if (group) {
                for (var id in messages) {
                    if (group === messages[id].group) messages[id].close(instantly);
                }
            } else {
                for (var id in messages) {
                    messages[id].close(instantly);
                }
            }
        };

    var Message = function(options) {
        var $this = this;

        this.options = $.extend({}, Message.defaults, options);

        this.uuid = 'ID' + new Date().getTime() + 'RAND' + Math.ceil(Math.random() * 100000);
        this.element = $(
            [
                // alert-dismissable enables bs close icon
                '<div class="uk-notify-message alert-dismissable">',
                '<a class="close">&times;</a>',
                '<div>' + this.options.message + '</div>',
                '</div>'
            ].join('')
        ).data('notifyMessage', this);

        // status
        if (this.options.status) {
            this.element.addClass('alert alert-' + this.options.status);
            this.currentstatus = this.options.status;
        }

        this.group = this.options.group;

        messages[this.uuid] = this;

        if (!containers[this.options.pos]) {
            containers[this.options.pos] = $(
                '<div class="uk-notify uk-notify-' + this.options.pos + '"></div>'
            )
                .appendTo('body')
                .on('click', '.uk-notify-message', function() {
                    $(this)
                        .data('notifyMessage')
                        .close();
                });
        }
    };

    $.extend(Message.prototype, {
        uuid: false,
        element: false,
        timout: false,
        currentstatus: '',
        group: false,

        show: function() {
            if (this.element.is(':visible')) return;

            var $this = this;

            containers[this.options.pos].show().prepend(this.element);

            var marginbottom = parseInt(this.element.css('margin-bottom'), 10);

            this.element
                .css({
                    opacity: 0,
                    'margin-top': -1 * this.element.outerHeight(),
                    'margin-bottom': 0
                })
                .animate(
                    { opacity: 1, 'margin-top': 0, 'margin-bottom': marginbottom },
                    function() {
                        if ($this.options.timeout) {
                            var closefn = function() {
                                $this.close();
                            };

                            $this.timeout = setTimeout(closefn, $this.options.timeout);

                            $this.element.hover(
                                function() {
                                    clearTimeout($this.timeout);
                                },
                                function() {
                                    $this.timeout = setTimeout(closefn, $this.options.timeout);
                                }
                            );
                        }
                    }
                );

            return this;
        },

        close: function(instantly) {
            var $this = this,
                finalize = function() {
                    $this.element.remove();

                    if (!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide();
                    }

                    delete messages[$this.uuid];
                };

            if (this.timeout) clearTimeout(this.timeout);

            if (instantly) {
                finalize();
            } else {
                this.element.animate(
                    {
                        opacity: 0,
                        'margin-top': -1 * this.element.outerHeight(),
                        'margin-bottom': 0
                    },
                    function() {
                        finalize();
                    }
                );
            }
        },

        content: function(html) {
            var container = this.element.find('>div');

            if (!html) {
                return container.html();
            }

            container.html(html);

            return this;
        },

        status: function(status) {
            if (!status) {
                return this.currentstatus;
            }

            this.element
                .removeClass('alert alert-' + this.currentstatus)
                .addClass('alert alert-' + status);

            this.currentstatus = status;

            return this;
        }
    });

    Message.defaults = {
        message: '',
        status: 'normal',
        timeout: 5000,
        group: null,
        pos: 'top-center'
    };

    $['notify'] = notify;
    $['notify'].message = Message;
    $['notify'].closeAll = closeAll;

    return notify;
})();

/*
// Portlets
*/

/*
 * Drag and drop any card to change its position
 * The Selector should could be applied to any object that contains
 * card, so .col-* element are ideal. */

(function() {
    'use strict';

    var STORAGE_KEY_NAME = 'jq-portletState';

    $(initPortlets);

    function initPortlets() {
        // Component is NOT optional
        if (!$.fn.sortable) return;

        var Selector = '[data-toggle="portlet"]';

        $(Selector).sortable({
            connectWith: Selector,
            items: 'div.card',
            handle: '.portlet-handler',
            opacity: 0.7,
            placeholder: 'portlet box-placeholder',
            cancel: '.portlet-cancel',
            forcePlaceholderSize: true,
            iframeFix: false,
            tolerance: 'pointer',
            helper: 'original',
            revert: 200,
            forceHelperSize: true,
            update: savePortletOrder,
            create: loadPortletOrder
        });
        // optionally disables mouse selection
        //.disableSelection()
    }

    function savePortletOrder(event, ui) {
        var data = Storages.localStorage.get(STORAGE_KEY_NAME);

        if (!data) {
            data = {};
        }

        data[this.id] = $(this).sortable('toArray');

        if (data) {
            Storages.localStorage.set(STORAGE_KEY_NAME, data);
        }
    }

    function loadPortletOrder() {
        var data = Storages.localStorage.get(STORAGE_KEY_NAME);

        if (data) {
            var porletId = this.id,
                cards = data[porletId];

            if (cards) {
                var portlet = $('#' + porletId);

                $.each(cards, function(index, value) {
                    $('#' + value).appendTo(portlet);
                });
            }
        }
    }

    // Reset porlet save state
    window.resetPorlets = function(e) {
        Storages.localStorage.remove(STORAGE_KEY_NAME);
        // reload the page
        window.location.reload();
    };
})();

/*
// Forms Components
*/

(function() {
    'use strict';

    $(initFormsDemo);

    function initFormsDemo() {
        if (!$.fn.slider) return;
        if (!$.fn.chosen) return;
        if (!$.fn.inputmask) return;
        if (!$.fn.filestyle) return;
        if (!$.fn.wysiwyg) return;
        if (!$.fn.datepicker) return;

        // BOOTSTRAP SLIDER CTRL
        // -----------------------------------

        $('[data-ui-slider]').slider();

        // CHOSEN
        // -----------------------------------

        $('.chosen-select').chosen();

        // MASKED
        // -----------------------------------

        $('[data-masked]').inputmask();

        // FILESTYLE
        // -----------------------------------

        $('.filestyle').filestyle();

        // WYSIWYG
        // -----------------------------------

        $('.wysiwyg').wysiwyg();

        // DATETIMEPICKER
        // -----------------------------------

        $('#datetimepicker1').datepicker({
            orientation: 'bottom',
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-crosshairs',
                clear: 'fa fa-trash'
            }
        });
    }
})();

/*
// Forms Wizard
*/

(function() {
    'use strict';

    $(initWizard);

    function initWizard() {
        if (!$.fn.validate) return;

        // FORM EXAMPLE
        // -----------------------------------
        var form = $('#example-form');
        form.validate({
            errorPlacement: function errorPlacement(error, element) {
                element.before(error);
            },
            rules: {
                confirm: {
                    equalTo: '#password'
                }
            }
        });
        form.children('div').steps({
            headerTag: 'h4',
            bodyTag: 'fieldset',
            transitionEffect: 'slideLeft',
            onStepChanging: function(event, currentIndex, newIndex) {
                form.validate().settings.ignore = ':disabled,:hidden';
                return form.valid();
            },
            onFinishing: function(event, currentIndex) {
                form.validate().settings.ignore = ':disabled';
                return form.valid();
            },
            onFinished: function(event, currentIndex) {
                alert('Submitted!');

                // Submit form
                $(this).submit();
            }
        });

        // VERTICAL
        // -----------------------------------

        $('#example-vertical').steps({
            headerTag: 'h4',
            bodyTag: 'section',
            transitionEffect: 'slideLeft',
            stepsOrientation: 'vertical'
        });
    }
})();

/*
// Login Multi
*/

(function() {
    'use strict';

    $(initParsleyForPages);

    function initParsleyForPages() {
        var loginMulti = document.getElementById('login-multi');

        if (loginMulti) $('.collapse').on('show.bs.collapse', toggleActiveCard);
    }

    function toggleActiveCard(e) {
        $('.card-header.bg-primary')
            .removeClass('bg-primary py-4 font-weight-bold')
            .addClass('bg-transparent');

        $(e.currentTarget.previousElementSibling)
            .removeClass('bg-transparent')
            .addClass('bg-primary py-4 font-weight-bold');
    }
})();

/*
// Login / Register Validation
*/

(function() {
    'use strict';

    $(initParsleyForPages);

    function initParsleyForPages() {
        // Parsley options setup for bootstrap validation classes
        var parsleyOptions = {
            errorClass: 'is-invalid',
            successClass: 'is-valid',
            classHandler: function(ParsleyField) {
                var el = ParsleyField.$element.parents('.form-group').find('input');
                if (!el.length)
                    // support custom checkbox
                    el = ParsleyField.$element.parents('.custom-checkbox').find('label');
                return el;
            },
            errorsContainer: function(ParsleyField) {
                return ParsleyField.$element.parents('.form-group');
            },
            errorsWrapper: '<div class="text-help">',
            errorTemplate: '<div></div>'
        };

        // Login form validation with Parsley
        var loginForm = $('#loginForm');
        if (loginForm.length) loginForm.parsley(parsleyOptions);

        // Register form validation with Parsley
        var registerForm = $('#registerForm');
        if (registerForm.length) registerForm.parsley(parsleyOptions);
    }
})();

/*
// Datatables
*/

(function() {
    'use strict';

    $(initDatatables);

    function initDatatables() {
        if (!$.fn.DataTable) return;

        // Zero configuration

        $('#datatable1').DataTable({
            paging: true, // Table pagination
            ordering: true, // Column ordering
            info: true, // Bottom left status text
            responsive: true,
            // Text translation options
            // Note the required keywords between underscores (e.g _MENU_)
            oLanguage: {
                sSearch: '<em class="fas fa-search"></em>',
                sLengthMenu: '_MENU_ records per page',
                info: 'Showing page _PAGE_ of _PAGES_',
                zeroRecords: 'Nothing found - sorry',
                infoEmpty: 'No records available',
                infoFiltered: '(filtered from _MAX_ total records)',
                oPaginate: {
                    sNext: '<em class="fa fa-caret-right"></em>',
                    sPrevious: '<em class="fa fa-caret-left"></em>'
                }
            }
        });

        var dtInstance2 = $('#datatable3').dataTable({
            paging: true, // Table pagination
            ordering: true, // Column ordering
            info: true, // Bottom left status text
            // Text translation options
            // Note the required keywords between underscores (e.g _MENU_)
            oLanguage: {
                sSearch: 'Search all columns:',
                sLengthMenu: '_MENU_ records per page',
                info: 'Showing page _PAGE_ of _PAGES_',
                zeroRecords: 'Nothing found - sorry',
                infoEmpty: 'No records available',
                infoFiltered: '(filtered from _MAX_ total records)'
            }
        });
        var inputSearchClass = 'datatable_input_col_search';
        var columnInputs = $('tfoot .' + inputSearchClass);

        // On input keyup trigger filtering
        columnInputs.keyup(function() {
            dtInstance2.fnFilter(this.value, columnInputs.index(this));
        });

        // Filter

        $('#datatable4').DataTable({
            paging: true, // Table pagination
            ordering: true, // Column ordering
            info: true, // Bottom left status text
            responsive: true,
            // Text translation options
            // Note the required keywords between underscores (e.g _MENU_)
            oLanguage: {
                sSearch: 'Search all columns:',
                sLengthMenu: '_MENU_ records per page',
                info: 'Showing page _PAGE_ of _PAGES_',
                zeroRecords: 'Nothing found - sorry',
                infoEmpty: 'No records available',
                infoFiltered: '(filtered from _MAX_ total records)',
                oPaginate: {
                    sNext: '<em class="fa fa-caret-right"></em>',
                    sPrevious: '<em class="fa fa-caret-left"></em>'
                }
            },
            // Datatable Buttons setup
            dom: 'Bfrtip',
            buttons: [
                { extend: 'copy', className: 'btn-info' },
                { extend: 'csv', className: 'btn-info' },
                { extend: 'excel', className: 'btn-info', title: 'XLS-File' },
                { extend: 'pdf', className: 'btn-info', title: $('title').text() },
                { extend: 'print', className: 'btn-info' }
            ]
        });

        $('#datatable2').DataTable({
            paging: true, // Table pagination
            ordering: true, // Column ordering
            info: true, // Bottom left status text
            responsive: true,
            // Text translation options
            // Note the required keywords between underscores (e.g _MENU_)
            oLanguage: {
                sSearch: 'Search all columns:',
                sLengthMenu: '_MENU_ records per page',
                info: 'Showing page _PAGE_ of _PAGES_',
                zeroRecords: 'Nothing found - sorry',
                infoEmpty: 'No records available',
                infoFiltered: '(filtered from _MAX_ total records)',
                oPaginate: {
                    sNext: '<em class="fa fa-caret-right"></em>',
                    sPrevious: '<em class="fa fa-caret-left"></em>'
                }
            },
            // Datatable key setup
            keys: true
        });
    }
})();

/*
// Custom Code
*/

(function() {
    'use strict';

    $(initCustom);

    function initCustom() {
        // custom code
    }
})();
