FlexAppLayout = (function (){			
	var globalCSS = null;
	var cachedCSS = {};
	var hasInsertRule = false;
	var insertIndex = -1;
	var mobileScreenThreshold = 600;
	
	// Borrow this from PenguinJS
	//
	var initRegMethod = function () {
		var css = globalCSS;
		if (!css) {
		  	css = document.createElement('style');
		  	css.type = 'text/css';
			globalCSS = css;
			var head = null;
			if (document && document.head) {
				head = document.head;
			}
			if (!head) {
				head = document.getElementsByTagName("head")[0];
			}
			head.appendChild(css);
			if ((navigator.userAgent+"").toLowerCase().indexOf("safari") > 0) {
				css.appendChild(document.createTextNode(""));
			}

			if (!("avoidInsertRule" in window)) {
				if (css && "sheet" in css) {
					if (("insertRule" in css.sheet) && ("deleteRule" in css.sheet)) {
						hasInsertRule = true;
						window.hasInsertRule=true;
					}
				}					
			}
		}

	  if (hasInsertRule) {
			return "insertRule";
	  } else if (css.styleSheet) {
			return "IECSSText";
		} else {
			return "SafariTextnode";
		}
	};		
	var registerCSS = function (key, cssStr) {
		initRegMethod();
		var css = globalCSS;
		var targetCachedCSS = cachedCSS;

	  if (window.hasInsertRule) {
	  	var shouldDelete = false;
			if (key in targetCachedCSS) {
				css.sheet.deleteRule(targetCachedCSS[key]);
			} else {
				cachedCSS[key] = ++insertIndex;
			}
			try {
				if (!(cssStr+"").match(/^[\s\t]*@/)) {
					cssStr = "@media all { " + cssStr + " }";
				}
				css.sheet.insertRule(cssStr, targetCachedCSS[key]);
			} catch (e) {
				css.sheet.insertRule("@media all { notusedtag{} }", targetCachedCSS[key]);
			}
	  } else if (css.styleSheet) {
			// For IE
			targetCachedCSS[key] = cssStr;
			var str = [];
			for (var k in cachedCSS) {
				str.push(targetCachedCSS[k]);
			}
			css.styleSheet.cssText = str.join(" ");
		} else {
			// Safari and Mozilla
			if (targetCachedCSS[key]) {
				targetCachedCSS[key].parentNode.removeChild(targetCachedCSS[key]);
			}
			var textnode = document.createTextNode(cssStr);
			css.appendChild(textnode);
			// target = textnode;
			targetCachedCSS[key] = textnode;
		}
	};
	var registeredUnit = {};
	var registerFlexUnit = function (length, type) {
		var unitKey = type+"-"+length+"-preset";
		if (registeredUnit[unitKey]) {
			return;
		}			
		registeredUnit[unitKey] = 1;
		var str = [
			type == 'mwd' || type == 'mhg' ? "@media (max-width: "+(window.mobileScreenWidth ? window.mobileScreenWidth : mobileScreenThreshold)+"px) {" : "",
			'v[wd="W"], h[wd="W"], w[wd="W"],',
			'v > h[wd="W"],',
			'v > v[wd="W"],',
			'v > w[wd="W"],',
			'v > .flex-h[wd="W"],',
			'v > .flex-v[wd="W"],',
			'v > .flex-w[wd="W"],',
			'h > h[wd="W"],',
			'h > v[wd="W"],',
			'h > w[wd="W"],',
			'h > .flex-h[wd="W"],',
			'h > .flex-v[wd="W"],',
			'h > .flex-w[wd="W"],',
			'.flex-v[wd="W"], h[wd="W"], w[wd="W"],',
			'.flex-v > h[wd="W"],',
			'.flex-v > v[wd="W"],',
			'.flex-v > w[wd="W"],',
			'.flex-v > .flex-h[wd="W"],',
			'.flex-v > .flex-v[wd="W"],',
			'.flex-v > .flex-w[wd="W"],',
			'.flex-h > h[wd="W"],',
			'.flex-h > v[wd="W"],',
			'.flex-h > w[wd="W"],',
			'.flex-h > .flex-h[wd="W"],',
			'.flex-h > .flex-v[wd="W"],',
			'.flex-h > .flex-w[wd="W"] {',
			'	flex-basis : '+((length+"").match(/^[0-9]+$/) ? length + 'px' : length)+';',
			'}',
			type == 'mwd' || type == 'mhg' ? "}" : ""
		];
		str = str.join("").replace(/"W"/g, "\""+length+"\"");
		str = str.replace(/wd="/g, type+"=\"");
		registerCSS(unitKey, str);
	};
	var registerFlexWidth = function (width) {
		registerFlexUnit(width, "wd");			
	};
	var registerFlexHeight = function (height) {
		registerFlexUnit(height, "hg");
	};
	var relayout = function () {
		var nodes = document.querySelectorAll("*[wd]")
		for (var i = 0, len = nodes.length; i < len; i++) {
			var value = nodes[i].attributes["wd"].value;
			registerFlexWidth(value);
		}
		var nodes = document.querySelectorAll("*[hg]")
		for (var i = 0, len = nodes.length; i < len; i++) {
			var value = nodes[i].attributes["hg"].value;
			registerFlexHeight(value);
		}
		var nodes = document.querySelectorAll("*[mwd]")
		for (var i = 0, len = nodes.length; i < len; i++) {
			var value = nodes[i].attributes["mwd"].value;
			registerFlexUnit(value, "mwd");
		}
		var nodes = document.querySelectorAll("*[mhg]")
		for (var i = 0, len = nodes.length; i < len; i++) {
			var value = nodes[i].attributes["mhg"].value;
			registerFlexUnit(value, "mhg");
		}
	};
	document.addEventListener("DOMContentLoaded", relayout);
	
	var replaceLayoutTagsWithDivOnVue = function () {
		if ("Vue" in window) {
			for (var i = Vue.config.ignoredElements.length-1; i >= 0; i--) {
				if (Vue.config.ignoredElements[i] == "w" || Vue.config.ignoredElements[i] == "v" || Vue.config.ignoredElements[i] == "h") {
					Vue.config.ignoredElements.splice(i,1);
				}
			}
			Vue.component('v', {
			  template: "<div class='flex-v'><slot></slot></div>"
			});
			Vue.component('h', {
			  template: "<div class='flex-h'><slot></slot></div>"
			});
			Vue.component('w', {
			  template: "<div class='flex-w'><slot></slot></div>"
			});
		}
	}
	if ("Vue" in window) {
		Vue.config.ignoredElements.push("v");
		Vue.config.ignoredElements.push("h");
		Vue.config.ignoredElements.push("w");
		Vue.directive('unit', function (el, binding) {
		  el.setAttribute(binding.arg, binding.value); 
			registerFlexUnit(binding.value, binding.arg);
		})		
	}
	
	return {
		registerFlexWidth : registerFlexWidth,
		registerFlexHeight : registerFlexHeight,
		relayout : relayout,
		replaceLayoutTagsWithDivOnVue : replaceLayoutTagsWithDivOnVue
	}
})();	