var wp_better_config = {
	configKeys : [
		'wattpad_enable_select',
		'wattpad_enable_justify',
		'wattpad_enable_big_comment',
		'wattpad_enable_alinea',
		'wattpad_enable_auto_broadcast',
		'wattpad_enable_local_storage_gestion',
		'wattpad_enable_additional_links',
		'wattpad_enable_paragraphe_comments',
		'wattpad_enable_links'
		],
	getConfiguration: function() {
		if(navigator.sayswho.indexOf('Chrome') > -1) {
			chrome.storage.sync.get(this.configKeys, function(result) {
				wp_better_config = result;
			});
		} else if (navigator.sayswho.indexOf('Firefox') > -1) {
       		wp_better_config = ff_wp_better_config;
    	}
	}
};

$(document).ready(function(){
	if(wp_better_config.wattpad_enable_select) {
		wp_better.selection_enabled();
	}
	wp_better.initApp();
	$("#app-container").observe('childlist', function(record){
		wp_better.initApp();
	});
	if(navigator.sayswho.indexOf('Firefox') > -1) {
		wp_better.greaseMonkeyInitiation();
	}
});

var wp_better = {
	initApp : function() {
		wp_better.launch_complentary_observers();
		/*
		*	Comportement on story reading page
		*/
		if($('body').hasClass('route-storyReading')) {
			if(wp_better_config.wattpad_enable_select) {
				wp_better.selection_enabled();
				$("#parts-container-new").observe('childlist subtree', 'pre', function(record) {
					wp_better.selection_enabled();
					$("#parts-container-new").disconnect();

				});
			}
			if(wp_better_config.wattpad_enable_paragraphe_comments) {
				if(_.isUndefined($('#load_underline_comments')[0])) {
					var partid = $($('#parts-container-new article.story-part')[0]).attr('data-part-id');
					wp_better.add_interline_comments_button("https://api.wattpad.com/v4/parts/"+partid+"/comments");
				}
			}
			if(wp_better_config.wattpad_enable_big_comment) {
				wp_better.autoresize('#comments textarea');
			}
			if(wp_better_config.wattpad_enable_local_storage_gestion) {
				wp_better.add_reload_comment_button();
			}
			if(wp_better_config.wattpad_enable_justify && _.isUndefined($(".wem_justify")[0])){
				wp_better.addStyleOnHead('wem_justify', '#story-reading .page p {text-align:justify}');
			}
			if(wp_better_config.wattpad_enable_alinea > 0 && _.isUndefined($(".wem_wattpad_enable_alinea")[0])){
				wp_better.addStyleOnHead('wem_wattpad_enable_alinea', '#story-reading .page p {text-wattpad_enable_alinea:' + wp_better_config.wattpad_enable_alinea + 'em!important;}');
			}
			if(wp_better_config.wattpad_enable_links) {
				wp_better.autolink($('.panel-reading p'));
			}
			if(wp_better_config.wattpad_enable_additional_links) {
				wp_better.buttons_generation();
			}
		}
		/*
		Comportement on user profile page
		*/
		if($('body').hasClass('route-userProfile') || window.location.href.indexOf("/user/cestdoncvrai/activity") > -1) {
			wp_better.add_profil_interraction();
			$("#content").observe('childlist', function(record){
				$("#profile-messages").observe('childlist subtree', function(record){
					wp_better.add_profil_interraction();
					$("#profile-messages").disconnect();

				});
			});
		}
		/*
		* Comportement pour les notifications
		*/
		if($('body').hasClass('route-notifications')) {
			if(wp_better_config.wattpad_enable_local_storage_gestion) {
				wp_better.cleanLocalStorage('notifications');
			}
		}
		/*
		* Comportement pour la page "messages"
		*/
		if(window.location.href.indexOf("www.wattpad.com/user_inbox") > -1 ){
			wp_better.autoresize('textarea#comment');
		}
	},
	launch_complentary_observers: function() {
		$("#comments").observe('childlist subtree', '.message', function(record) {
			if(wp_better_config.wattpad_enable_big_comment) {
				wp_better.autoresize('#comments textarea');
			}
			if(wp_better_config.wattpad_enable_local_storage_gestion) {
				wp_better.add_reload_comment_button();
			}
		});
	},
	add_profil_interraction: function(url) {
		if(wp_better_config.wattpad_enable_big_comment)
		{
			wp_better.autoresize('.message textarea');
			$('#profile-messages .collection').observe('childlist', function(record){
				wp_better.autoresize('.message textarea');
			});
		}
		if(wp_better_config.wattpad_enable_auto_broadcast)
		{
			var broadcast = $('.broadcast-checkbox');
			if(broadcast.length > 0)
			{
				broadcast[0].setAttribute('checked', true);
			}
		}
	},
	add_reload_comment_button:function() {
		if(_.isUndefined($('#wb_reload_button')[0])) {
			$('#comments').prepend('<button id="wb_reload_button" class="btn">'+wp_better.translate("__MSG_contentRemoveCommentsStorage_")+'</button>');
			$('#wb_reload_button').on('click', function(){
				wp_better.cleanLocalStorage('comments');
				window.location.reload();
			});
		}
	},
	add_interline_comments_button: function(url) {
		$.ajax({
			url: url,
			dataType:'json'
		}).done(function(data) {
			if(!_.isUndefined(data.comments)) {
				for(c in data.comments){
					if(data.comments[c].paragraphId != null)
					{
						if(_.isUndefined($('#load_underline_comments')[0])){
							$('#comments').prepend('<button id="load_underline_comments" class="btn right">Placer les commentaires d\'interligne</button>');
						}
						$('#load_underline_comments').on('click', function(){
							if(!$(this).attr('isLoad')) {
								var partid = $($('#parts-container-new article.story-part')[0]).attr('data-part-id');
								wp_better.add_interline_comments("https://api.wattpad.com/v4/parts/"+partid+"/comments");
								$(this).attr('isLoad', true);
								$(this).hide();
							}
						})
						return true;
					}
				}
			}
			if(!_.isUndefined(data.nextUrl)){
				wp_better.add_interline_comments_button(data.nextUrl);
			}
		});
	},
	add_interline_comments: function(url) {
		$.ajax({
			url: url,
			dataType:'json'
		}).done(function(data) {
			if(!_.isUndefined(data.comments)) {
				for(c in data.comments){
					if(data.comments[c].paragraphId != null)
					{
						var com = data.comments[c];
						var p = $('p[data-p-id='+com.paragraphId+']').html();
						var open = '<span class="bw_overline">';
						var point = '<span style="font-size:10px;" aria-hidden="true" class="fa fa-circle-filled fa-wp-grey bw_comment_marker"></span><span class="bw_comment_contenair">';
						var comtxt = '<span class="bw_comment_on_text"><strong>'+com.author.name.strip_html()+' : </strong>'+com.body.strip_html()+'</span>';
						var close = '</span></span>';
						if(!_.isUndefined(p)) {
							if(p.indexOf('<span class="bw_overline">') > - 1) {
								var spanposition = p.indexOf('<span class="bw_comment_contenair">')+'<span class="bw_comment_contenair">'.length;
								p = p.insertAt(spanposition, comtxt);
							}
							else if(p.indexOf("data-media-type") > -1) {
								p.prepend(open+point+comtxt+close);
							}
							else if(p.indexOf("<b>") > -1 || p.indexOf("<br") > -1 || p.indexOf("<img") > -1) {
								p = open+p+point+comtxt+close;
							} else {
								p = p.insertAt(com.startPosition, open);
								p = p.insertAt(com.endPosition, point+comtxt+close);
							}
							$('p[data-p-id='+com.paragraphId.strip_html()+']').html(p);
						}
					}
				}
				$('span.bw_comment_marker').off('click').on('click', function(e){
					e.preventDefault();
					$(this).parent().find('span.bw_comment_contenair').toggle();
					$(this).parent().toggleClass('bw_overline_hover');
				});
			}
			if(!_.isUndefined(data.nextUrl)){
				wp_better.add_interline_comments(data.nextUrl);
			}
		});
	},
	buttons_generation: function() {
		var prevLink = $('#funbar-story li.active').prev().children('a:first').attr('href');
		var prevName = $('#funbar-story li.active').prev().children('a:first').html();
		var nextLink = $('#funbar-story li.active').next().children('a:first').attr('href');
		var nextName = $('#funbar-story li.active').next().children('a:first').html();

		var topFictionNavigation  = "<div id='topFictionNavigation' class='navigationOnFiction'>";

		if(!_.isUndefined(prevName)) {
			topFictionNavigation  = topFictionNavigation +
			"<a href='"+prevLink+"' class='on-navigate bw_links bw_links_left'>"+
			"<span style='font-size:16px;' aria-hidden='true' class='fa fa-left fa-wp-darkgrey next-up-icon pull-left'></span>"+
			"<div class='next-up-title'><span>"+prevName+"</span></div></a>";
		}
		if(!_.isUndefined(nextName)) {
			topFictionNavigation = topFictionNavigation + "<a href='"+nextLink+"' class='on-navigate bw_links bw_links_right'>"+
			"<span style='font-size:16px;' aria-hidden='true' class='fa fa-right fa-wp-darkgrey next-up-icon pull-right'></span>"+
			"<div class='next-up-title'><span>"+nextName+"</span></div></a>";
		}
		topFictionNavigation = topFictionNavigation + "</div>";

		if(!_.isUndefined(prevLink)){
			var bottomButton = '<a class="on-navigate" href="'+prevLink+'"><div class="orange bw_links_grey"><div class="next-up prev-part"><span>'+wp_better.translate("__MSG_contentPrevChapter_")+'</span><span class="fa fa-left fa-wp-white prev-up-icon" aria-hidden="true" style="font-size:16px;"></span></div></div></a>';
		}
		if(_.isUndefined($('.prev-up-icon')[0])) {
			$($('.part-navigation')[0]).append(bottomButton);
		}
		if(_.isUndefined($('#topFictionNavigation')[0])) {
			$($('header.panel-reading')[0]).append(topFictionNavigation);
		}
	},
	greaseMonkeyInitiation: function()
	{
		this.addStyleOnHead('ff', '#wb_reload_button{margin-bottom:10px;background:#F89B33;color:#fff}.navigationOnFiction{border-top:1px solid #ededed;border-bottom:1px solid #ededed;display:block;font-size:14px;font-weight:600;color:#717171;line-height:24px;height:50px;width:93%;margin:auto;position:relative}.navigationOnFiction .bw_links span{color:#717171;font-size:14px;padding-top:0}.part-title{margin-bottom:10px}.navigationOnFiction .bw_links{position:absolute;display:flex;width:auto;color:#717171;top:10px}div.meta{border-bottom:none!important}.bw_links .fa-right{position:absolute;right:0;top:4px}.bw_links .fa-left{position:absolute;left:0;top:4px}.bw_links_left .next-up-title{text-align:left!important;margin-left:20px}.bw_bottom_links,.bw_links_right{text-align:right}.bw_links_right .next-up-title{margin-right:20px}.bw_links_right{border-top:none!important;right:0}#story-reading #parts-container-new footer .orange.bw_links_grey{color:#444!important;background-color:#DDD;border-color:#DDD}.bw_links_left{left:0}.bw_bottom_links .next-up-title{text-align:right;width:97%}.prev-up-icon{position:absolute;left:-14px;top:16px}.bw_comment_contenair,.bw_comment_marker{position:absolute;left:100%;line-height:15px}.next-up-icon{right:-14px}.part-navigation .orange{margin-bottom:5px}.bw_comment_contenair{font-size:.8em;color:grey;font-style:italic;width:50%;padding-left:30px;display:none}.bw_overline_hover{background-color:#eee}.bw_comment_marker{cursor:pointer;padding-left:15px;z-index:100}.bw_comment_on_text{display:block}');
	},
	selection_enabled :function ()
	{
		$('.page').bind("contextmenu", function(e) {
			e.stopPropagation();
		});
		var elements = $('.panel-reading');
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.MozUserSelect = 'text';
			elements[i].style.WebkitUserSelect = 'text';
			elements[i].style.MsUserSelect = 'text';
		}
	},
	autoresize: function(selector){
		autosize($(selector));
	},
	addStyleOnHead : function(id, style)
	{
		var node = document.createElement('style');
		var css = document.createTextNode(style);
		node.setAttribute('id', id);
		node.appendChild(css);
		document.getElementsByTagName('head')[0].appendChild(node);
	},
	cleanLocalStorage: function (local_storage_key_to_find)
	{
		for ( var i = 0, len = localStorage.length; i < len; ++i ) {
			if(localStorage.getItem( localStorage.key( i ) ) != null ){
				if(localStorage.key( i ).indexOf(local_storage_key_to_find) > -1)
				{
					localStorage.removeItem(localStorage.key(i));
				}
			}
		}
	},
	autolink: function(elements)
	{
		var link_plain_expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		elements.each(function(){
			if ($(this).prop("tagName") != "header" && $(this).prop("tagName") != "footer"){
				$(this).html(wp_better.urlify($(this).html(), link_plain_expression));
			}
		})
	},
	urlify : function(text, expression) {
		var regex = new RegExp(expression);
		if(text.match(regex)){
			var link_anchor_expression = /href="([^\'\"]+)/gi;
			var src_anchor_expression = /src="([^\'\"]+)/gi;
			if(!text.match(link_anchor_expression) && !text.match(src_anchor_expression)){
				return text.replace(regex, function (match) {
					return '<a target=\'_blank\' href=\'' + match + '\'>' + match + '</a>';
				});
			}
		}
		return text;
	},
	translate: function(text){
		var regex = new RegExp(/(__MSG_)[^<]*(_)/g);
		if(navigator.sayswho.indexOf('Chrome') > -1)
		{
			if(text.match(regex)){
				return text.replace(regex, function (match) {
					var key = match.substring(0, match.length - 1).replace('__MSG_','');
					if(chrome.i18n.getMessage(key))
						return chrome.i18n.getMessage(key);
					else
						return "Error on translation data (WattPad Better Plugin). Please reload the page and contact plugin author if this bug persist";
				});
			}
			return text;
		} else if(navigator.sayswho.indexOf('Firefox') > -1 && !_.isUndefined(wpb_translations)) {
			if(text.match(regex)){
				return text.replace(regex, function (match) {
					var key = match.substring(0, match.length - 1).replace('__MSG_','');
					var lang = window.navigator.language;
					if(wpb_translations[lang])
						return (wpb_translations[lang][key])? wpb_translations[lang][key].message : 'undefined';
					else
						return (wpb_translations["en"][key])? wpb_translations["en"][key].message : 'undefined';
				});
			}
		}
	}
}
String.prototype.insertAt=function(index, string) {
	return this.substr(0, index) + string + this.substr(index);
}
String.prototype.strip_html=function() {

	return this.replace(/(<([^>]+)>)/ig, '');
}
navigator.sayswho= (function(){
	var ua= navigator.userAgent, tem,
	M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if(/trident/i.test(M[1])){
		tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
		return 'IE '+(tem[1] || '');
	}
	if(M[1]=== 'Chrome'){
		tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
		if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
	}
	M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
	return M.join(' ');
})();
$.extend(wp_better_config);
$.extend(wp_better);

wp_better_config.getConfiguration();