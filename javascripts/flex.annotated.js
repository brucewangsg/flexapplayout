if ((window.location+"").indexOf("annotation=0")>0) {
	document.addEventListener('DOMContentLoaded', function () {
		document.body.classList.remove("flex-annotated");
	});
}

document.addEventListener('DOMContentLoaded', function () {
	if (document.querySelectorAll("body.flex-annotated")[0]) {
		var nodes = document.querySelectorAll("v,w,h");
		for (var i = 0, len = nodes.length; i < len; i++) {
			var node = nodes[i];
			var hasChild = false;
			if (node.childNodes.length > 0) {
				for (var j = 0, jlen = node.childNodes.length; j < jlen; j++) {
					if (node.childNodes[j].nodeName && (node.childNodes[j].nodeName+"").indexOf('#text') < 0) {
						node.classList.add('has-child');
						break;
					}
				}
			}
		}
	}
});

