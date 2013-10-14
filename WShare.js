	 /* ========================================================================
		* Bootstrap extend: WShare
		* http://github.com/loo2k/WShare
		* ======================================================================== 
		* Copyright 2013 LOO2K.
		*
		* Licensed under the Apache License, Version 2.0 (the "License");
		* you may not use this file except in compliance with the License.
		* You may obtain a copy of the License at
		*
		* http://www.apache.org/licenses/LICENSE-2.0
		*
		* Unless required by applicable law or agreed to in writing, software
		* distributed under the License is distributed on an "AS IS" BASIS,
		* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		* See the License for the specific language governing permissions and
		* limitations under the License.
		* ========================================================== */
	!function($) {
		"use strict";

		var WShare = function(element, options) {
			this.init(element, options)
		}

		WShare.prototype = {
			constructor : WShare

			, init : function(element, options) {

				var that = this;
				this.$element = $(element);
				this.options = options || {};

				this.$element.on('click', $.proxy(this.postShare, this));

			}

			, postShare : function(e) {
				var type		= this.options.type || $(e.currentTarget).data('type');
				var source	= this.options.source || $(e.currentTarget).data('source');
				var target	= this.options.target || $(e.currentTarget).data('target');

				var WContent	= this.getShareValue('WSContent');
				var WUrl			= this.getShareValue('WSUrl');
				var WPic			= this.getShareValue('WSPic');
				var shareUrl	= this.generatorShare(type, WContent, WUrl, WPic);

				this.openShareWin(shareUrl, 750, 500);
			}

			, generatorShare : function(type, content, url, pic) {
				var generator = {
					'weibo' : 'http://service.weibo.com/share/share.php?title=%content%&url=%url%&pic=%pic%',
					'qq' : 'http://share.v.t.qq.com/index.php?c=share&a=index&title=%content%&url=%url%&pic=%pic%'
				}

				var request = generator[type];

				if(!request) alert('参数非法');

				if(!pic) {
					request = request.slice(0, request.lastIndexOf('&'));
				}
				else {
					request = request.replace(/%pic%/g, pic);
				}

				if(!url) {
					request = request.slice(0, request.indexOf('url=') - 1 ) + request.slice(request.indexOf('%url%') + 5);
				}	else {
					url = url || '';
					request = request.replace(/%url%/g, url);
				}

				return request.replace(/%content%/g, content);
			}

			, getShareValue : function(WSType) {
				var $WSType = typeof this.options[WSType];
				switch($WSType) {
					case 'function':
						var funcres = $.proxy(this.options[WSType], this)();
						if(!funcres) {
							return funcres;
						} else {
							return $.proxy(this.getDefaultValue, this, WSType)();
						}
						break;
					case 'string':
						return this.options[WSType];
						break;
					case 'undefined':
					default:
						return $.proxy(this.getDefaultValue, this, WSType)();
				}
			}

			, getDefaultValue : function(WSType) {
				var element 		= this.$element.context;
				var target 			= this.options.target || $(element).data('target') || $(element).attr('id');
				var targetName	= target + '_' + WSType;
				var targetElem	= $('#' + targetName);

				if( !window[targetName] && targetElem.length == 0) {
					targetName = WSType;
					targetElem = $('#' + targetName);
				}

				if( window[targetName] && typeof window[targetName] == 'string' ) {
					return window[targetName];
				} else if( targetElem.length > 0 ) {
					console.log(targetElem.val());
					return targetElem.val();
				} else {
					switch(WSType) {
						case 'WSContent':
							return $('title').text();
							break;
						case 'WSUrl':
							return window.location.href;
							break;
						case 'WSPic':
						case 'WSVideo':
						default:
							return false;
					}
				}
			}

			, openShareWin : function(url, width, height) {
				var winParams = ['toolbar=0,status=0,resizable=1,width=' + width + ',height=' + height + ',left=',(screen.width-width)/2,',top=',(screen.height-height)/2].join('');
				window.open(url, 'WShare 分享窗口', winParams);
			}
		}

	 /* WShare PLUGIN DEFINITION
		* ========================= */

		var old = $.fn.WShare

		$.fn.WShare = function ( option ) {
			return this.each(function () {
				var $this = $(this)
					, data = $this.data('WShare')
					, options = typeof option == 'object' && option
				if (!data) $this.data('WShare', (data = new WShare(this, options)))
				if (typeof option == 'string') data[option]()
			})
		}

		$.fn.WShare.Constructor = WShare

		$.fn.WShare.defaults = {}


	 /* WShare NO CONFLICT
		* =================== */

		$.fn.WShare.noConflict = function () {
			$.fn.WShare = old
			return this
		}
	}(window.jQuery);