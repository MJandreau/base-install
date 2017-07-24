/**
* CLASS HELPERS
* Plain JavaScript functions to add, remove, toggle, and check for classes, no jQuery required
*/

// hasClass
function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

// addClass
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}

// removeClass
function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

// toggleClass
function toggleClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, " ") + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0) {
            newClass = newClass.replace(" " + className + " ", " ");
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}



// EXAMPLES 

// Example of hasClass usage
// document.getElementById('button').onclick = function() {
//     if (hasClass(document.getElementById('button'), 'superman')) {
//         this.innerHTML = 'Mission success: \'superman\' class exists.';
//     }
// }

// Example of addClass usage
// document.getElementById('button').onclick = function() {
//     addClass(this, 'active');
//     this.innerHTML = 'Woo! Nice work.';
// }

// Example of removeClass usage
// document.getElementById('button').onclick = function() {
//     removeClass(this, 'active');
//     this.innerHTML = 'Yellow is much nicer.';
// }

// Example of toggleClass usage
// document.getElementById('button').onclick = function() {
//     toggleClass(this, 'active');
// }



/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function() {
	var isIe = /(trident|msie)/i.test( navigator.userAgent );

	if ( isIe && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
})();

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+bash+markdown+php+scss&plugins=line-numbers */
var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function(){

// Private helper vars
var lang = /\blang(?:uage)?-(\w+)\b/i;
var uniqueId = 0;

var _ = _self.Prism = {
	manual: _self.Prism && _self.Prism.manual,
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
			} else if (_.util.type(tokens) === 'Array') {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
		},

		objId: function (obj) {
			if (!obj['__id']) {
				Object.defineProperty(obj, '__id', { value: ++uniqueId });
			}
			return obj['__id'];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function (o) {
			var type = _.util.type(o);

			switch (type) {
				case 'Object':
					var clone = {};

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key]);
						}
					}

					return clone;

				case 'Array':
					// Check for existence for IE8
					return o.map && o.map(function(v) { return _.util.clone(v); });
			}

			return o;
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need anobject and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before. If not provided, the function appends instead.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];

			if (arguments.length == 2) {
				insert = arguments[1];

				for (var newToken in insert) {
					if (insert.hasOwnProperty(newToken)) {
						grammar[newToken] = insert[newToken];
					}
				}

				return grammar;
			}

			var ret = {};

			for (var token in grammar) {

				if (grammar.hasOwnProperty(token)) {

					if (token == before) {

						for (var newToken in insert) {

							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					ret[token] = grammar[token];
				}
			}

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === root[inside] && key != inside) {
					this[key] = ret;
				}
			});

			return root[inside] = ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function(o, callback, type, visited) {
			visited = visited || {};
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, null, visited);
					}
					else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, i, visited);
					}
				}
			}
		}
	},
	plugins: {},

	highlightAll: function(async, callback) {
		var env = {
			callback: callback,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run("before-highlightall", env);

		var elements = env.elements || document.querySelectorAll(env.selector);

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, env.callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1].toLowerCase();
			grammar = _.languages[language];
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		// Set language on the parent, for styling
		parent = element.parentNode;

		if (/pre/i.test(parent.nodeName)) {
			parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		_.hooks.run('before-sanity-check', env);

		if (!env.code || !env.grammar) {
			if (env.code) {
				_.hooks.run('before-highlight', env);
				env.element.textContent = env.code;
				_.hooks.run('after-highlight', env);
			}
			_.hooks.run('complete', env);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				env.highlightedCode = evt.data;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(env.element);
				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
		}
	},

	highlight: function (text, grammar, language) {
		var tokens = _.tokenize(text, grammar);
		return Token.stringify(_.util.encode(tokens), language);
	},

	matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
		var Token = _.Token;

		for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			if (token == target) {
				return;
			}

			var patterns = grammar[token];
			patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j],
					inside = pattern.inside,
					lookbehind = !!pattern.lookbehind,
					greedy = !!pattern.greedy,
					lookbehindLength = 0,
					alias = pattern.alias;

				if (greedy && !pattern.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
					pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
				}

				pattern = pattern.pattern || pattern;

				// Don’t cache length as it changes during the loop
				for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

					var str = strarr[i];

					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					pattern.lastIndex = 0;

					var match = pattern.exec(str),
					    delNum = 1;

					// Greedy patterns can override/remove up to two previously matched tokens
					if (!match && greedy && i != strarr.length - 1) {
						pattern.lastIndex = pos;
						match = pattern.exec(text);
						if (!match) {
							break;
						}

						var from = match.index + (lookbehind ? match[1].length : 0),
						    to = match.index + match[0].length,
						    k = i,
						    p = pos;

						for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
							p += strarr[k].length;
							// Move the index i to the element in strarr that is closest to from
							if (from >= p) {
								++i;
								pos = p;
							}
						}

						/*
						 * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
						 * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
						 */
						if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
							continue;
						}

						// Number of tokens to delete and replace with the new match
						delNum = k - i;
						str = text.slice(pos, p);
						match.index -= pos;
					}

					if (!match) {
						if (oneshot) {
							break;
						}

						continue;
					}

					if(lookbehind) {
						lookbehindLength = match[1].length;
					}

					var from = match.index + lookbehindLength,
					    match = match[0].slice(lookbehindLength),
					    to = from + match.length,
					    before = str.slice(0, from),
					    after = str.slice(to);

					var args = [i, delNum];

					if (before) {
						++i;
						pos += before.length;
						args.push(before);
					}

					var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

					args.push(wrapped);

					if (after) {
						args.push(after);
					}

					Array.prototype.splice.apply(strarr, args);

					if (delNum != 1)
						_.matchGrammar(text, strarr, grammar, i, pos, true, token);

					if (oneshot)
						break;
				}
			}
		}
	},

	tokenize: function(text, grammar, language) {
		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		_.matchGrammar(text, strarr, grammar, 0, 0, false);

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	}
};

var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
	this.type = type;
	this.content = content;
	this.alias = alias;
	// Copy of the full string this token was created from
	this.length = (matchedStr || "").length|0;
	this.greedy = !!greedy;
};

Token.stringify = function(o, language, parent) {
	if (typeof o == 'string') {
		return o;
	}

	if (_.util.type(o) === 'Array') {
		return o.map(function(element) {
			return Token.stringify(element, language, o);
		}).join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (env.type == 'comment') {
		env.attributes['spellcheck'] = 'true';
	}

	if (o.alias) {
		var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
		Array.prototype.push.apply(env.classes, aliases);
	}

	_.hooks.run('wrap', env);

	var attributes = Object.keys(env.attributes).map(function(name) {
		return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
	}).join(' ');

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

};

if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _self.Prism;
	}
 	// In worker
	_self.addEventListener('message', function(evt) {
		var message = JSON.parse(evt.data),
		    lang = message.language,
		    code = message.code,
		    immediateClose = message.immediateClose;

		_self.postMessage(_.highlight(code, _.languages[lang], lang));
		if (immediateClose) {
			_self.close();
		}
	}, false);

	return _self.Prism;
}

//Get current script and highlight
var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

if (script) {
	_.filename = script.src;

	if (document.addEventListener && !_.manual && !script.hasAttribute('data-manual')) {
		if(document.readyState !== "loading") {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(_.highlightAll);
			} else {
				window.setTimeout(_.highlightAll, 16);
			}
		}
		else {
			document.addEventListener('DOMContentLoaded', _.highlightAll);
		}
	}
}

return _self.Prism;

})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}
;
Prism.languages.markup = {
	'comment': /<!--[\s\S]*?-->/,
	'prolog': /<\?[\s\S]+?\?>/,
	'doctype': /<!DOCTYPE[\s\S]+?>/i,
	'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\s\S])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\s\S]*?(\1)|[^\s>]+)/i,
				inside: {
					'punctuation': /[=>"']/
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.css = {
	'comment': /\/\*[\s\S]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
	'string': {
		pattern: /("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'property': /(\b|\B)[\w-]+(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css'
		}
	});
	
	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|').*?\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
};
Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true
		}
	],
	'string': {
		pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
	'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true,
		greedy: true
	}
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\\\|\\?[^\\])*?`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript'
		}
	});
}

Prism.languages.js = Prism.languages.javascript;
(function(Prism) {
	var insideString = {
		variable: [
			// Arithmetic Environment
			{
				pattern: /\$?\(\([\s\S]+?\)\)/,
				inside: {
					// If there is a $ sign at the beginning highlight $(( and )) as variable
					variable: [{
							pattern: /(^\$\(\([\s\S]+)\)\)/,
							lookbehind: true
						},
						/^\$\(\(/,
					],
					number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
					// Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
					operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
					// If there is no $ sign at the beginning highlight (( and )) as punctuation
					punctuation: /\(\(?|\)\)?|,|;/
				}
			},
			// Command Substitution
			{
				pattern: /\$\([^)]+\)|`[^`]+`/,
				inside: {
					variable: /^\$\(|^`|\)$|`$/
				}
			},
			/\$(?:[a-z0-9_#\?\*!@]+|\{[^}]+\})/i
		],
	};

	Prism.languages.bash = {
		'shebang': {
			pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
			alias: 'important'
		},
		'comment': {
			pattern: /(^|[^"{\\])#.*/,
			lookbehind: true
		},
		'string': [
			//Support for Here-Documents https://en.wikipedia.org/wiki/Here_document
			{
				pattern: /((?:^|[^<])<<\s*)(?:"|')?(\w+?)(?:"|')?\s*\r?\n(?:[\s\S])*?\r?\n\2/g,
				lookbehind: true,
				greedy: true,
				inside: insideString
			},
			{
				pattern: /(["'])(?:\\\\|\\?[^\\])*?\1/g,
				greedy: true,
				inside: insideString
			}
		],
		'variable': insideString.variable,
		// Originally based on http://ss64.com/bash/
		'function': {
			pattern: /(^|\s|;|\||&)(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|\s|;|\||&)/,
			lookbehind: true
		},
		'keyword': {
			pattern: /(^|\s|;|\||&)(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|\s|;|\||&)/,
			lookbehind: true
		},
		'boolean': {
			pattern: /(^|\s|;|\||&)(?:true|false)(?=$|\s|;|\||&)/,
			lookbehind: true
		},
		'operator': /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
		'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
	};

	var inside = insideString.variable[1].inside;
	inside['function'] = Prism.languages.bash['function'];
	inside.keyword = Prism.languages.bash.keyword;
	inside.boolean = Prism.languages.bash.boolean;
	inside.operator = Prism.languages.bash.operator;
	inside.punctuation = Prism.languages.bash.punctuation;
})(Prism);

Prism.languages.markdown = Prism.languages.extend('markup', {});
Prism.languages.insertBefore('markdown', 'prolog', {
	'blockquote': {
		// > ...
		pattern: /^>(?:[\t ]*>)*/m,
		alias: 'punctuation'
	},
	'code': [
		{
			// Prefixed by 4 spaces or 1 tab
			pattern: /^(?: {4}|\t).+/m,
			alias: 'keyword'
		},
		{
			// `code`
			// ``code``
			pattern: /``.+?``|`[^`\n]+`/,
			alias: 'keyword'
		}
	],
	'title': [
		{
			// title 1
			// =======

			// title 2
			// -------
			pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
			alias: 'important',
			inside: {
				punctuation: /==+$|--+$/
			}
		},
		{
			// # title 1
			// ###### title 6
			pattern: /(^\s*)#+.+/m,
			lookbehind: true,
			alias: 'important',
			inside: {
				punctuation: /^#+|#+$/
			}
		}
	],
	'hr': {
		// ***
		// ---
		// * * *
		// -----------
		pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
		lookbehind: true,
		alias: 'punctuation'
	},
	'list': {
		// * item
		// + item
		// - item
		// 1. item
		pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
		lookbehind: true,
		alias: 'punctuation'
	},
	'url-reference': {
		// [id]: http://example.com "Optional title"
		// [id]: http://example.com 'Optional title'
		// [id]: http://example.com (Optional title)
		// [id]: <http://example.com> "Optional title"
		pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
		inside: {
			'variable': {
				pattern: /^(!?\[)[^\]]+/,
				lookbehind: true
			},
			'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
			'punctuation': /^[\[\]!:]|[<>]/
		},
		alias: 'url'
	},
	'bold': {
		// **strong**
		// __strong__

		// Allow only one line break
		pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
		lookbehind: true,
		inside: {
			'punctuation': /^\*\*|^__|\*\*$|__$/
		}
	},
	'italic': {
		// *em*
		// _em_

		// Allow only one line break
		pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
		lookbehind: true,
		inside: {
			'punctuation': /^[*_]|[*_]$/
		}
	},
	'url': {
		// [example](http://example.com "Optional title")
		// [example] [id]
		pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
		inside: {
			'variable': {
				pattern: /(!?\[)[^\]]+(?=\]$)/,
				lookbehind: true
			},
			'string': {
				pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
			}
		}
	}
});

Prism.languages.markdown['bold'].inside['url'] = Prism.util.clone(Prism.languages.markdown['url']);
Prism.languages.markdown['italic'].inside['url'] = Prism.util.clone(Prism.languages.markdown['url']);
Prism.languages.markdown['bold'].inside['italic'] = Prism.util.clone(Prism.languages.markdown['italic']);
Prism.languages.markdown['italic'].inside['bold'] = Prism.util.clone(Prism.languages.markdown['bold']);
/**
 * Original by Aaron Harun: http://aahacreative.com/2012/07/31/php-syntax-highlighting-prism/
 * Modified by Miles Johnson: http://milesj.me
 *
 * Supports the following:
 * 		- Extends clike syntax
 * 		- Support for PHP 5.3+ (namespaces, traits, generators, etc)
 * 		- Smarter constant and function matching
 *
 * Adds the following new token classes:
 * 		constant, delimiter, variable, function, package
 */

Prism.languages.php = Prism.languages.extend('clike', {
	'keyword': /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
	'constant': /\b[A-Z0-9_]{2,}\b/,
	'comment': {
		pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
		lookbehind: true
	}
});

// Shell-like comments are matched after strings, because they are less
// common than strings containing hashes...
Prism.languages.insertBefore('php', 'class-name', {
	'shell-comment': {
		pattern: /(^|[^\\])#.*/,
		lookbehind: true,
		alias: 'comment'
	}
});

Prism.languages.insertBefore('php', 'keyword', {
	'delimiter': {
		pattern: /\?>|<\?(?:php|=)?/i,
		alias: 'important'
	},
	'variable': /\$\w+\b/i,
	'package': {
		pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
		lookbehind: true,
		inside: {
			punctuation: /\\/
		}
	}
});

// Must be defined after the function pattern
Prism.languages.insertBefore('php', 'operator', {
	'property': {
		pattern: /(->)[\w]+/,
		lookbehind: true
	}
});

// Add HTML support if the markup language exists
if (Prism.languages.markup) {

	// Tokenize all inline PHP blocks that are wrapped in <?php ?>
	// This allows for easy PHP + markup highlighting
	Prism.hooks.add('before-highlight', function(env) {
		if (env.language !== 'php' || !/(?:<\?php|<\?)/ig.test(env.code)) {
			return;
		}

		env.tokenStack = [];

		env.backupCode = env.code;
		env.code = env.code.replace(/(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/ig, function(match) {
			var i = env.tokenStack.length;
			// Check for existing strings
			while (env.backupCode.indexOf('___PHP' + i + '___') !== -1)
				++i;

			// Create a sparse array
			env.tokenStack[i] = match;

			return '___PHP' + i + '___';
		});

		// Switch the grammar to markup
		env.grammar = Prism.languages.markup;
	});

	// Restore env.code for other plugins (e.g. line-numbers)
	Prism.hooks.add('before-insert', function(env) {
		if (env.language === 'php' && env.backupCode) {
			env.code = env.backupCode;
			delete env.backupCode;
		}
	});

	// Re-insert the tokens after highlighting
	Prism.hooks.add('after-highlight', function(env) {
		if (env.language !== 'php' || !env.tokenStack) {
			return;
		}

		// Switch the grammar back
		env.grammar = Prism.languages.php;

		for (var i = 0, keys = Object.keys(env.tokenStack); i < keys.length; ++i) {
			var k = keys[i];
			var t = env.tokenStack[k];

			// The replace prevents $$, $&, $`, $', $n, $nn from being interpreted as special patterns
			env.highlightedCode = env.highlightedCode.replace('___PHP' + k + '___',
					"<span class=\"token php language-php\">" +
					Prism.highlight(t, env.grammar, 'php').replace(/\$/g, '$$$$') +
					"</span>");
		}

		env.element.innerHTML = env.highlightedCode;
	});
}
;
Prism.languages.scss = Prism.languages.extend('css', {
	'comment': {
		pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
		lookbehind: true
	},
	'atrule': {
		pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	// url, compassified
	'url': /(?:[-a-z]+-)*url(?=\()/i,
	// CSS selector regex is not appropriate for Sass
	// since there can be lot more things (var, @ directive, nesting..)
	// a selector must start at the end of a property or after a brace (end of other rules or nesting)
	// it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
	// the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
	// can "pass" as a selector- e.g: proper#{$erty})
	// this one was hard to do, so please be careful if you edit this one :)
	'selector': {
		// Initial look-ahead is used to prevent matching of blank selectors
		pattern: /(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,
		inside: {
			'parent': {
				pattern: /&/,
				alias: 'important'
			},
			'placeholder': /%[-_\w]+/,
			'variable': /\$[-_\w]+|#\{\$[-_\w]+\}/
		}
	}
});

Prism.languages.insertBefore('scss', 'atrule', {
	'keyword': [
		/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
		{
			pattern: /( +)(?:from|through)(?= )/,
			lookbehind: true
		}
	]
});

Prism.languages.scss.property = {
	pattern: /(?:[\w-]|\$[-_\w]+|#\{\$[-_\w]+\})+(?=\s*:)/i,
	inside: {
		'variable': /\$[-_\w]+|#\{\$[-_\w]+\}/
	}
};

Prism.languages.insertBefore('scss', 'important', {
	// var and interpolated vars
	'variable': /\$[-_\w]+|#\{\$[-_\w]+\}/
});

Prism.languages.insertBefore('scss', 'function', {
	'placeholder': {
		pattern: /%[-_\w]+/,
		alias: 'selector'
	},
	'statement': {
		pattern: /\B!(?:default|optional)\b/i,
		alias: 'keyword'
	},
	'boolean': /\b(?:true|false)\b/,
	'null': /\bnull\b/,
	'operator': {
		pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
		lookbehind: true
	}
});

Prism.languages.scss['atrule'].inside.rest = Prism.util.clone(Prism.languages.scss);
(function() {

if (typeof self === 'undefined' || !self.Prism || !self.document) {
	return;
}

Prism.hooks.add('complete', function (env) {
	if (!env.code) {
		return;
	}

	// works only for <code> wrapped inside <pre> (not inline)
	var pre = env.element.parentNode;
	var clsReg = /\s*\bline-numbers\b\s*/;
	if (
		!pre || !/pre/i.test(pre.nodeName) ||
			// Abort only if nor the <pre> nor the <code> have the class
		(!clsReg.test(pre.className) && !clsReg.test(env.element.className))
	) {
		return;
	}

	if (env.element.querySelector(".line-numbers-rows")) {
		// Abort if line numbers already exists
		return;
	}

	if (clsReg.test(env.element.className)) {
		// Remove the class "line-numbers" from the <code>
		env.element.className = env.element.className.replace(clsReg, '');
	}
	if (!clsReg.test(pre.className)) {
		// Add the class "line-numbers" to the <pre>
		pre.className += ' line-numbers';
	}

	var match = env.code.match(/\n(?!$)/g);
	var linesNum = match ? match.length + 1 : 1;
	var lineNumbersWrapper;

	var lines = new Array(linesNum + 1);
	lines = lines.join('<span></span>');

	lineNumbersWrapper = document.createElement('span');
	lineNumbersWrapper.setAttribute('aria-hidden', 'true');
	lineNumbersWrapper.className = 'line-numbers-rows';
	lineNumbersWrapper.innerHTML = lines;

	if (pre.hasAttribute('data-start')) {
		pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
	}

	env.element.appendChild(lineNumbersWrapper);

});

}());








// add line numbers

(function() {

if (typeof self === 'undefined' || !self.Prism || !self.document) {
	return;
}

Prism.hooks.add('complete', function (env) {
	if (!env.code) {
		return;
	}

	// works only for <code> wrapped inside <pre> (not inline)
	var pre = env.element.parentNode;
	var clsReg = /\s*\bline-numbers\b\s*/;
	if (
		!pre || !/pre/i.test(pre.nodeName) ||
			// Abort only if nor the <pre> nor the <code> have the class
		(!clsReg.test(pre.className) && !clsReg.test(env.element.className))
	) {
		return;
	}

	if (env.element.querySelector(".line-numbers-rows")) {
		// Abort if line numbers already exists
		return;
	}

	if (clsReg.test(env.element.className)) {
		// Remove the class "line-numbers" from the <code>
		env.element.className = env.element.className.replace(clsReg, '');
	}
	if (!clsReg.test(pre.className)) {
		// Add the class "line-numbers" to the <pre>
		pre.className += ' line-numbers';
	}

	var match = env.code.match(/\n(?!$)/g);
	var linesNum = match ? match.length + 1 : 1;
	var lineNumbersWrapper;

	var lines = new Array(linesNum + 1);
	lines = lines.join('<span></span>');

	lineNumbersWrapper = document.createElement('span');
	lineNumbersWrapper.setAttribute('aria-hidden', 'true');
	lineNumbersWrapper.className = 'line-numbers-rows';
	lineNumbersWrapper.innerHTML = lines;

	if (pre.hasAttribute('data-start')) {
		pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
	}

	env.element.appendChild(lineNumbersWrapper);

});

}());
/*!
	Autosize 4.0.0
	license: MIT
	http://www.jacklmoore.com/autosize
*/
(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod);
		global.autosize = mod.exports;
	}
})(this, function (exports, module) {
	'use strict';

	var map = typeof Map === "function" ? new Map() : (function () {
		var keys = [];
		var values = [];

		return {
			has: function has(key) {
				return keys.indexOf(key) > -1;
			},
			get: function get(key) {
				return values[keys.indexOf(key)];
			},
			set: function set(key, value) {
				if (keys.indexOf(key) === -1) {
					keys.push(key);
					values.push(value);
				}
			},
			'delete': function _delete(key) {
				var index = keys.indexOf(key);
				if (index > -1) {
					keys.splice(index, 1);
					values.splice(index, 1);
				}
			}
		};
	})();

	var createEvent = function createEvent(name) {
		return new Event(name, { bubbles: true });
	};
	try {
		new Event('test');
	} catch (e) {
		// IE does not support `new Event()`
		createEvent = function (name) {
			var evt = document.createEvent('Event');
			evt.initEvent(name, true, false);
			return evt;
		};
	}

	function assign(ta) {
		if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

		var heightOffset = null;
		var clientWidth = ta.clientWidth;
		var cachedHeight = null;

		function init() {
			var style = window.getComputedStyle(ta, null);

			if (style.resize === 'vertical') {
				ta.style.resize = 'none';
			} else if (style.resize === 'both') {
				ta.style.resize = 'horizontal';
			}

			if (style.boxSizing === 'content-box') {
				heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
			} else {
				heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
			}
			// Fix when a textarea is not on document body and heightOffset is Not a Number
			if (isNaN(heightOffset)) {
				heightOffset = 0;
			}

			update();
		}

		function changeOverflow(value) {
			{
				// Chrome/Safari-specific fix:
				// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
				// made available by removing the scrollbar. The following forces the necessary text reflow.
				var width = ta.style.width;
				ta.style.width = '0px';
				// Force reflow:
				/* jshint ignore:start */
				ta.offsetWidth;
				/* jshint ignore:end */
				ta.style.width = width;
			}

			ta.style.overflowY = value;
		}

		function getParentOverflows(el) {
			var arr = [];

			while (el && el.parentNode && el.parentNode instanceof Element) {
				if (el.parentNode.scrollTop) {
					arr.push({
						node: el.parentNode,
						scrollTop: el.parentNode.scrollTop
					});
				}
				el = el.parentNode;
			}

			return arr;
		}

		function resize() {
			var originalHeight = ta.style.height;
			var overflows = getParentOverflows(ta);
			var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

			ta.style.height = '';

			var endHeight = ta.scrollHeight + heightOffset;

			if (ta.scrollHeight === 0) {
				// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
				ta.style.height = originalHeight;
				return;
			}

			ta.style.height = endHeight + 'px';

			// used to check if an update is actually necessary on window.resize
			clientWidth = ta.clientWidth;

			// prevents scroll-position jumping
			overflows.forEach(function (el) {
				el.node.scrollTop = el.scrollTop;
			});

			if (docTop) {
				document.documentElement.scrollTop = docTop;
			}
		}

		function update() {
			resize();

			var styleHeight = Math.round(parseFloat(ta.style.height));
			var computed = window.getComputedStyle(ta, null);

			// Using offsetHeight as a replacement for computed.height in IE, because IE does not account use of border-box
			var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;

			// The actual height not matching the style height (set via the resize method) indicates that
			// the max-height has been exceeded, in which case the overflow should be allowed.
			if (actualHeight !== styleHeight) {
				if (computed.overflowY === 'hidden') {
					changeOverflow('scroll');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			} else {
				// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
				if (computed.overflowY !== 'hidden') {
					changeOverflow('hidden');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			}

			if (cachedHeight !== actualHeight) {
				cachedHeight = actualHeight;
				var evt = createEvent('autosize:resized');
				try {
					ta.dispatchEvent(evt);
				} catch (err) {
					// Firefox will throw an error on dispatchEvent for a detached element
					// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
				}
			}
		}

		var pageResize = function pageResize() {
			if (ta.clientWidth !== clientWidth) {
				update();
			}
		};

		var destroy = (function (style) {
			window.removeEventListener('resize', pageResize, false);
			ta.removeEventListener('input', update, false);
			ta.removeEventListener('keyup', update, false);
			ta.removeEventListener('autosize:destroy', destroy, false);
			ta.removeEventListener('autosize:update', update, false);

			Object.keys(style).forEach(function (key) {
				ta.style[key] = style[key];
			});

			map['delete'](ta);
		}).bind(ta, {
			height: ta.style.height,
			resize: ta.style.resize,
			overflowY: ta.style.overflowY,
			overflowX: ta.style.overflowX,
			wordWrap: ta.style.wordWrap
		});

		ta.addEventListener('autosize:destroy', destroy, false);

		// IE9 does not fire onpropertychange or oninput for deletions,
		// so binding to onkeyup to catch most of those events.
		// There is no way that I know of to detect something like 'cut' in IE9.
		if ('onpropertychange' in ta && 'oninput' in ta) {
			ta.addEventListener('keyup', update, false);
		}

		window.addEventListener('resize', pageResize, false);
		ta.addEventListener('input', update, false);
		ta.addEventListener('autosize:update', update, false);
		ta.style.overflowX = 'hidden';
		ta.style.wordWrap = 'break-word';

		map.set(ta, {
			destroy: destroy,
			update: update
		});

		init();
	}

	function destroy(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.destroy();
		}
	}

	function update(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.update();
		}
	}

	var autosize = null;

	// Do nothing in Node.js environment and IE8 (or lower)
	if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
		autosize = function (el) {
			return el;
		};
		autosize.destroy = function (el) {
			return el;
		};
		autosize.update = function (el) {
			return el;
		};
	} else {
		autosize = function (el, options) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], function (x) {
					return assign(x, options);
				});
			}
			return el;
		};
		autosize.destroy = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], destroy);
			}
			return el;
		};
		autosize.update = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], update);
			}
			return el;
		};
	}

	module.exports = autosize;
});

/**
* FORM TEXTAREA RESIZE
* Trigger JavaScript resizing of form textarea using autosize.js, no jQuery required
*/
autosize(document.querySelectorAll('textarea'));

/*!
 * baguetteBox.js
 * @author  feimosi
 * @version %%INJECT_VERSION%%
 * @url https://github.com/feimosi/baguetteBox.js
 */

/* global define, module */

(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.baguetteBox = factory();
    }
}(this, function () {
    'use strict';

    // SVG shapes used on the buttons
    var leftArrow = '<svg width="44" height="60">' +
            '<polyline points="30 10 10 30 30 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"' +
              'stroke-linecap="butt" fill="none" stroke-linejoin="round"/>' +
            '</svg>',
        rightArrow = '<svg width="44" height="60">' +
            '<polyline points="14 10 34 30 14 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"' +
              'stroke-linecap="butt" fill="none" stroke-linejoin="round"/>' +
            '</svg>',
        closeX = '<svg width="30" height="30">' +
            '<g stroke="rgb(160,160,160)" stroke-width="4">' +
            '<line x1="5" y1="5" x2="25" y2="25"/>' +
            '<line x1="5" y1="25" x2="25" y2="5"/>' +
            '</g></svg>';
    // Global options and their defaults
    var options = {},
        defaults = {
            captions: true,
            fullScreen: false,
            noScrollbars: false,
            titleTag: false,
            buttons: 'auto',
            async: false,
            preload: 2,
            animation: 'slideIn',
            afterShow: null,
            afterHide: null,
            // callback when image changes with `currentIndex` and `imagesElements.length` as parameters
            onChange: null,
            overlayBackgroundColor: 'rgba(0,0,0,.8)'
        };
    // Object containing information about features compatibility
    var supports = {};
    // DOM Elements references
    var overlay, slider, previousButton, nextButton, closeButton;
    // An array with all images in the current gallery
    var currentGallery = [];
    // Current image index inside the slider
    var currentIndex = 0;
    // Touch event start position (for slide gesture)
    var touch = {};
    // If set to true ignore touch events because animation was already fired
    var touchFlag = false;
    // Regex pattern to match image files
    var regex = /.+\.(gif|jpe?g|png|webp)/i;
    // Object of all used galleries
    var data = {};
    // Array containing temporary images DOM elements
    var imagesElements = [];
    // The last focused element before opening the overlay
    var documentLastFocus = null;
    var overlayClickHandler = function(event) {
        // Close the overlay when user clicks directly on the background
        if (event.target.id.indexOf('baguette-img') !== -1) {
            hideOverlay();
        }
    };
    var previousButtonClickHandler = function(event) {
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; // jshint ignore:line
        showPreviousImage();
    };
    var nextButtonClickHandler = function(event) {
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; // jshint ignore:line
        showNextImage();
    };
    var closeButtonClickHandler = function(event) {
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; // jshint ignore:line
        hideOverlay();
    };
    var touchstartHandler = function(event) {
        touch.count++;
        if (touch.count > 1) {
            touch.multitouch = true;
        }
        // Save x and y axis position
        touch.startX = event.changedTouches[0].pageX;
        touch.startY = event.changedTouches[0].pageY;
    };
    var touchmoveHandler = function(event) {
        // If action was already triggered or multitouch return
        if (touchFlag || touch.multitouch) {
            return;
        }
        event.preventDefault ? event.preventDefault() : event.returnValue = false; // jshint ignore:line
        var touchEvent = event.touches[0] || event.changedTouches[0];
        // Move at least 40 pixels to trigger the action
        if (touchEvent.pageX - touch.startX > 40) {
            touchFlag = true;
            showPreviousImage();
        } else if (touchEvent.pageX - touch.startX < -40) {
            touchFlag = true;
            showNextImage();
        // Move 100 pixels up to close the overlay
        } else if (touch.startY - touchEvent.pageY > 100) {
            hideOverlay();
        }
    };
    var touchendHandler = function() {
        touch.count--;
        if (touch.count <= 0) {
            touch.multitouch = false;
        }
        touchFlag = false;
    };

    var trapFocusInsideOverlay = function(event) {
        if (overlay.style.display === 'block' && (overlay.contains && !overlay.contains(event.target))) {
            event.stopPropagation();
            initFocus();
        }
    };

    // forEach polyfill for IE8
    // http://stackoverflow.com/a/14827443/1077846
    /* jshint ignore:start */
    if (![].forEach) {
        Array.prototype.forEach = function(callback, thisArg) {
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }

    // filter polyfill for IE8
    // https://gist.github.com/eliperelman/1031656
    if (![].filter) {
        Array.prototype.filter = function(a, b, c, d, e) {
            c = this;
            d = [];
            for (e = 0; e < c.length; e++)
                a.call(b, c[e], e, c) && d.push(c[e]);
            return d;
        };
    }
    /* jshint ignore:end */

    // Script entry point
    function run(selector, userOptions) {
        // Fill supports object
        supports.transforms = testTransformsSupport();
        supports.svg = testSVGSupport();

        buildOverlay();
        removeFromCache(selector);
        bindImageClickListeners(selector, userOptions);
    }

    function bindImageClickListeners(selector, userOptions) {
        // For each gallery bind a click event to every image inside it
        var galleryNodeList = document.querySelectorAll(selector);
        var selectorData = {
            galleries: [],
            nodeList: galleryNodeList
        };
        data[selector] = selectorData;

        [].forEach.call(galleryNodeList, function(galleryElement) {
            if (userOptions && userOptions.filter) {
                regex = userOptions.filter;
            }

            // Get nodes from gallery elements or single-element galleries
            var tagsNodeList = [];
            if (galleryElement.tagName === 'A') {
                tagsNodeList = [galleryElement];
            } else {
                tagsNodeList = galleryElement.getElementsByTagName('a');
            }

            // Filter 'a' elements from those not linking to images
            tagsNodeList = [].filter.call(tagsNodeList, function(element) {
                return regex.test(element.href);
            });
            if (tagsNodeList.length === 0) {
                return;
            }

            var gallery = [];
            [].forEach.call(tagsNodeList, function(imageElement, imageIndex) {
                var imageElementClickHandler = function(event) {
                    event.preventDefault ? event.preventDefault() : event.returnValue = false; // jshint ignore:line
                    prepareOverlay(gallery, userOptions);
                    showOverlay(imageIndex);
                };
                var imageItem = {
                    eventHandler: imageElementClickHandler,
                    imageElement: imageElement
                };
                bind(imageElement, 'click', imageElementClickHandler);
                gallery.push(imageItem);
            });
            selectorData.galleries.push(gallery);
        });
    }

    function clearCachedData() {
        for (var selector in data) {
            if (data.hasOwnProperty(selector)) {
                removeFromCache(selector);
            }
        }
    }

    function removeFromCache(selector) {
        if (!data.hasOwnProperty(selector)) {
            return;
        }
        var galleries = data[selector].galleries;
        [].forEach.call(galleries, function(gallery) {
            [].forEach.call(gallery, function(imageItem) {
                unbind(imageItem.imageElement, 'click', imageItem.eventHandler);
            });

            if (currentGallery === gallery) {
                currentGallery = [];
            }
        });

        delete data[selector];
    }

    function buildOverlay() {
        overlay = getByID('baguetteBox-overlay');
        // Check if the overlay already exists
        if (overlay) {
            slider = getByID('baguetteBox-slider');
            previousButton = getByID('previous-button');
            nextButton = getByID('next-button');
            closeButton = getByID('close-button');
            return;
        }
        // Create overlay element
        overlay = create('div');
        overlay.setAttribute('role', 'dialog');
        overlay.id = 'baguetteBox-overlay';
        document.getElementsByTagName('body')[0].appendChild(overlay);
        // Create gallery slider element
        slider = create('div');
        slider.id = 'baguetteBox-slider';
        overlay.appendChild(slider);
        // Create all necessary buttons
        previousButton = create('button');
        previousButton.setAttribute('type', 'button');
        previousButton.id = 'previous-button';
        previousButton.setAttribute('aria-label', 'Previous');
        previousButton.innerHTML = supports.svg ? leftArrow : '&lt;';
        overlay.appendChild(previousButton);

        nextButton = create('button');
        nextButton.setAttribute('type', 'button');
        nextButton.id = 'next-button';
        nextButton.setAttribute('aria-label', 'Next');
        nextButton.innerHTML = supports.svg ? rightArrow : '&gt;';
        overlay.appendChild(nextButton);

        closeButton = create('button');
        closeButton.setAttribute('type', 'button');
        closeButton.id = 'close-button';
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.innerHTML = supports.svg ? closeX : '&times;';
        overlay.appendChild(closeButton);

        previousButton.className = nextButton.className = closeButton.className = 'baguetteBox-button';

        bindEvents();
    }

    function keyDownHandler(event) {
        switch (event.keyCode) {
        case 37: // Left arrow
            showPreviousImage();
            break;
        case 39: // Right arrow
            showNextImage();
            break;
        case 27: // Esc
            hideOverlay();
            break;
        }
    }

    function bindEvents() {
        bind(overlay, 'click', overlayClickHandler);
        bind(previousButton, 'click', previousButtonClickHandler);
        bind(nextButton, 'click', nextButtonClickHandler);
        bind(closeButton, 'click', closeButtonClickHandler);
        bind(overlay, 'touchstart', touchstartHandler);
        bind(overlay, 'touchmove', touchmoveHandler);
        bind(overlay, 'touchend', touchendHandler);
        bind(document, 'focus', trapFocusInsideOverlay, true);
    }

    function unbindEvents() {
        unbind(overlay, 'click', overlayClickHandler);
        unbind(previousButton, 'click', previousButtonClickHandler);
        unbind(nextButton, 'click', nextButtonClickHandler);
        unbind(closeButton, 'click', closeButtonClickHandler);
        unbind(overlay, 'touchstart', touchstartHandler);
        unbind(overlay, 'touchmove', touchmoveHandler);
        unbind(overlay, 'touchend', touchendHandler);
        unbind(document, 'focus', trapFocusInsideOverlay, true);
    }

    function prepareOverlay(gallery, userOptions) {
        // If the same gallery is being opened prevent from loading it once again
        if (currentGallery === gallery) {
            return;
        }
        currentGallery = gallery;
        // Update gallery specific options
        setOptions(userOptions);
        // Empty slider of previous contents (more effective than .innerHTML = "")
        while (slider.firstChild) {
            slider.removeChild(slider.firstChild);
        }
        imagesElements.length = 0;

        var imagesFiguresIds = [];
        var imagesCaptionsIds = [];
        // Prepare and append images containers and populate figure and captions IDs arrays
        for (var i = 0, fullImage; i < gallery.length; i++) {
            fullImage = create('div');
            fullImage.className = 'full-image';
            fullImage.id = 'baguette-img-' + i;
            imagesElements.push(fullImage);

            imagesFiguresIds.push('baguetteBox-figure-' + i);
            imagesCaptionsIds.push('baguetteBox-figcaption-' + i);
            slider.appendChild(imagesElements[i]);
        }
        overlay.setAttribute('aria-labelledby', imagesFiguresIds.join(' '));
        overlay.setAttribute('aria-describedby', imagesCaptionsIds.join(' '));
    }

    function setOptions(newOptions) {
        if (!newOptions) {
            newOptions = {};
        }
        // Fill options object
        for (var item in defaults) {
            options[item] = defaults[item];
            if (typeof newOptions[item] !== 'undefined') {
                options[item] = newOptions[item];
            }
        }
        /* Apply new options */
        // Change transition for proper animation
        slider.style.transition = slider.style.webkitTransition = (options.animation === 'fadeIn' ? 'opacity .4s ease' :
            options.animation === 'slideIn' ? '' : 'none');
        // Hide buttons if necessary
        if (options.buttons === 'auto' && ('ontouchstart' in window || currentGallery.length === 1)) {
            options.buttons = false;
        }
        // Set buttons style to hide or display them
        previousButton.style.display = nextButton.style.display = (options.buttons ? '' : 'none');
        // Set overlay color
        try {
            overlay.style.backgroundColor = options.overlayBackgroundColor;
        } catch (e) {
            // Silence the error and continue
        }
    }

    function showOverlay(chosenImageIndex) {
        if (options.noScrollbars) {
            document.documentElement.style.overflowY = 'hidden';
            document.body.style.overflowY = 'scroll';
        }
        if (overlay.style.display === 'block') {
            return;
        }

        bind(document, 'keydown', keyDownHandler);
        currentIndex = chosenImageIndex;
        touch = {
            count: 0,
            startX: null,
            startY: null
        };
        loadImage(currentIndex, function() {
            preloadNext(currentIndex);
            preloadPrev(currentIndex);
        });

        updateOffset();
        overlay.style.display = 'block';
        if (options.fullScreen) {
            enterFullScreen();
        }
        // Fade in overlay
        setTimeout(function() {
            overlay.className = 'visible';
            if (options.afterShow) {
                options.afterShow();
            }
        }, 50);
        if (options.onChange) {
            options.onChange(currentIndex, imagesElements.length);
        }
        documentLastFocus = document.activeElement;
        initFocus();
    }

    function initFocus() {
        if (options.buttons) {
            previousButton.focus();
        } else {
            closeButton.focus();
        }
    }

    function enterFullScreen() {
        if (overlay.requestFullscreen) {
            overlay.requestFullscreen();
        } else if (overlay.webkitRequestFullscreen) {
            overlay.webkitRequestFullscreen();
        } else if (overlay.mozRequestFullScreen) {
            overlay.mozRequestFullScreen();
        }
    }

    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    function hideOverlay() {
        if (options.noScrollbars) {
            document.documentElement.style.overflowY = 'auto';
            document.body.style.overflowY = 'auto';
        }
        if (overlay.style.display === 'none') {
            return;
        }

        unbind(document, 'keydown', keyDownHandler);
        // Fade out and hide the overlay
        overlay.className = '';
        setTimeout(function() {
            overlay.style.display = 'none';
            exitFullscreen();
            if (options.afterHide) {
                options.afterHide();
            }
        }, 500);
        documentLastFocus.focus();
    }

    function loadImage(index, callback) {
        var imageContainer = imagesElements[index];
        var galleryItem = currentGallery[index];

        // Return if the index exceeds prepared images in the overlay
        // or if the current gallery has been changed / closed
        if (imageContainer === undefined || galleryItem === undefined) {
            return;
        }

        // If image is already loaded run callback and return
        if (imageContainer.getElementsByTagName('img')[0]) {
            if (callback) {
                callback();
            }
            return;
        }










// // Find our gallery container, and the list of image containers within it:
// var baguetteBoxGetCaption = document.querySelector('.gallery');
// var imageContainers = baguetteBoxGetCaption.getElementsByClassName('gallery-item');

// // Loop through the image containers:
// for (var i = 0; i < imageContainers.length; i++) {
//     var image = imageContainers[i].getElementsByTagName('img')[0];
    
//     // Create a span element - we'll use this to house our caption:
//     var caption = document.createElement('span');
    
//     // Stick the alt tag from the image we found above into the caption <span>:
//     caption.innerHTML = image.alt;
    
//     // Insert the caption <span> into the image container:
//     imageContainers[i].appendChild(caption);
// }





        // // Get element reference, optional caption and source path
        // var imageElement = document.querySelector('.gallery');
        // var thumbnailElement = imageElement[i].getElementsByTagName('img')[0];
        // var imageCaption = typeof options.captions === 'function' ?
        //                     options.captions.call(currentGallery, imageElement) :
        //                     imageElement.getAttribute('data-caption') || imageElement.alt;
        // var imageSrc = getImageSrc(imageElement);

        // var figure = create('figure');
        // figure.id = 'baguetteBox-figure-' + index;
        // figure.innerHTML = '<div class="baguetteBox-spinner">' +
        //     '<div class="baguetteBox-double-bounce1"></div>' +
        //     '<div class="baguetteBox-double-bounce2"></div>' +
        //     '</div>';
        // // Insert caption if available
        // if (options.captions && imageCaption) {
        //     var figcaption = create('figcaption');
        //     figcaption.id = 'baguetteBox-figcaption-' + index;
        //     figcaption.innerHTML = imageCaption;
        //     figure.appendChild(figcaption);
        // }
        // imageContainer.appendChild(figure);


        // Get element reference, optional caption and source path
        var imageElement = galleryItem.imageElement;
        var thumbnailElement = imageElement.getElementsByTagName('img')[0];
        var imageCaption = typeof options.captions === 'function' ?
                            options.captions.call(currentGallery, imageElement) :
                            imageElement.getAttribute('data-caption') || imageElement.title;
        var imageSrc = getImageSrc(imageElement);

        // Prepare figure element
        var figure = create('figure');
        figure.id = 'baguetteBox-figure-' + index;
        figure.innerHTML = '<div class="baguetteBox-spinner">' +
            '<div class="baguetteBox-double-bounce1"></div>' +
            '<div class="baguetteBox-double-bounce2"></div>' +
            '</div>';
        // Insert caption if available
        if (options.captions && imageCaption) {
            var figcaption = create('figcaption');
            figcaption.id = 'baguetteBox-figcaption-' + index;
            figcaption.innerHTML = imageCaption;
            figure.appendChild(figcaption);
        }
        imageContainer.appendChild(figure);

        // Prepare gallery img element
        var image = create('img');
        image.onload = function() {
            // Remove loader element
            var spinner = document.querySelector('#baguette-img-' + index + ' .baguetteBox-spinner');
            figure.removeChild(spinner);
            if (!options.async && callback) {
                callback();
            }
        };
        image.setAttribute('src', imageSrc);
        image.alt = thumbnailElement ? thumbnailElement.alt || '' : '';
        if (options.titleTag && imageCaption) {
            image.title = imageCaption;
        }
        figure.appendChild(image);

        // Run callback
        if (options.async && callback) {
            callback();
        }
    }

    // Get image source location, mostly used for responsive images
    function getImageSrc(image) {
        // Set default image path from href
        var result = image.href;
        // If dataset is supported find the most suitable image
        if (image.dataset) {
            var srcs = [];
            // Get all possible image versions depending on the resolution
            for (var item in image.dataset) {
                if (item.substring(0, 3) === 'at-' && !isNaN(item.substring(3))) {
                    srcs[item.replace('at-', '')] = image.dataset[item];
                }
            }
            // Sort resolutions ascending
            var keys = Object.keys(srcs).sort(function(a, b) {
                return parseInt(a, 10) < parseInt(b, 10) ? -1 : 1;
            });
            // Get real screen resolution
            var width = window.innerWidth * window.devicePixelRatio;
            // Find the first image bigger than or equal to the current width
            var i = 0;
            while (i < keys.length - 1 && keys[i] < width) {
                i++;
            }
            result = srcs[keys[i]] || result;
        }
        return result;
    }

    // Return false at the right end of the gallery
    function showNextImage() {
        var returnValue;
        // Check if next image exists
        if (currentIndex <= imagesElements.length - 2) {
            currentIndex++;
            updateOffset();
            preloadNext(currentIndex);
            returnValue = true;
        } else if (options.animation) {
            slider.className = 'bounce-from-right';
            setTimeout(function() {
                slider.className = '';
            }, 400);
            returnValue = false;
        }
        if (options.onChange) {
            options.onChange(currentIndex, imagesElements.length);
        }
        return returnValue;
    }

    // Return false at the left end of the gallery
    function showPreviousImage() {
        var returnValue;
        // Check if previous image exists
        if (currentIndex >= 1) {
            currentIndex--;
            updateOffset();
            preloadPrev(currentIndex);
            returnValue = true;
        } else if (options.animation) {
            slider.className = 'bounce-from-left';
            setTimeout(function() {
                slider.className = '';
            }, 400);
            returnValue = false;
        }
        if (options.onChange) {
            options.onChange(currentIndex, imagesElements.length);
        }
        return returnValue;
    }

    function updateOffset() {
        var offset = -currentIndex * 100 + '%';
        if (options.animation === 'fadeIn') {
            slider.style.opacity = 0;
            setTimeout(function() {
                /* jshint -W030 */
                supports.transforms ?
                    slider.style.transform = slider.style.webkitTransform = 'translate3d(' + offset + ',0,0)'
                    : slider.style.left = offset;
                slider.style.opacity = 1;
            }, 400);
        } else {
            /* jshint -W030 */
            supports.transforms ?
                slider.style.transform = slider.style.webkitTransform = 'translate3d(' + offset + ',0,0)'
                : slider.style.left = offset;
        }
    }

    // CSS 3D Transforms test
    function testTransformsSupport() {
        var div = create('div');
        return typeof div.style.perspective !== 'undefined' || typeof div.style.webkitPerspective !== 'undefined';
    }

    // Inline SVG test
    function testSVGSupport() {
        var div = create('div');
        div.innerHTML = '<svg/>';
        return (div.firstChild && div.firstChild.namespaceURI) === 'http://www.w3.org/2000/svg';
    }

    function preloadNext(index) {
        if (index - currentIndex >= options.preload) {
            return;
        }
        loadImage(index + 1, function() {
            preloadNext(index + 1);
        });
    }

    function preloadPrev(index) {
        if (currentIndex - index >= options.preload) {
            return;
        }
        loadImage(index - 1, function() {
            preloadPrev(index - 1);
        });
    }

    function bind(element, event, callback, useCapture) {
        if (element.addEventListener) {
            element.addEventListener(event, callback, useCapture);
        } else {
            // IE8 fallback
            element.attachEvent('on' + event, function(event) {
                // `event` and `event.target` are not provided in IE8
                event = event || window.event;
                event.target = event.target || event.srcElement;
                callback(event);
            });
        }
    }

    function unbind(element, event, callback, useCapture) {
        if (element.removeEventListener) {
            element.removeEventListener(event, callback, useCapture);
        } else {
            // IE8 fallback
            element.detachEvent('on' + event, callback);
        }
    }

    function getByID(id) {
        return document.getElementById(id);
    }

    function create(element) {
        return document.createElement(element);
    }

    function destroyPlugin() {
        unbindEvents();
        clearCachedData();
        unbind(document, 'keydown', keyDownHandler);
        document.getElementsByTagName('body')[0].removeChild(document.getElementById('baguetteBox-overlay'));
        data = {};
        currentGallery = [];
        currentIndex = 0;
    }

    return {
        run: run,
        destroy: destroyPlugin,
        showNext: showNextImage,
        showPrevious: showPreviousImage
    };
}));






       
/**
* LIGHTBOX SLIDESHOW
* Trigger JavaScript slideshow using baguetteBox.js, no jQuery required
* If screen is smaller than 800px, hide left/right arrow buttons and use swipe
*/ 






// Find our gallery container, and the list of image containers within it:
// var baguetteBoxGetCaption = document.querySelector('.gallery');
// var imageContainers = baguetteBoxGetCaption.getElementsByClassName('gallery-item');

// // Loop through the image containers:
// for (var i = 0; i < imageContainers.length; i++) {
    
//     // Find the image in each container:
//     var image = imageContainers[i].getElementsByTagName('img')[0];
    
//     // Create a span element - we'll use this to house our caption:
//     var caption = document.createElement('span');
    
//     // Stick the alt tag from the image we found above into the caption <span>:
//     caption.innerHTML = image.alt;
    
//     // Insert the caption <span> into the image container:
//     imageContainers[i].appendChild(caption);
// }



// Find .gallery and add .baguetteBox
var baguetteBoxGallery = document.querySelector('.gallery');
addClass(baguetteBoxGallery, 'baguetteBox');

// Run it
baguetteBox.run('.baguetteBox');




/**
* MOBILE NAVIGATION
* Plain JavaScript functions to toggle the mobile navigation, no jQuery required
* WAI-ARIA values are also added for accessibility 
*/

// Add toggles to menu items that have submenus and bind to click event
var subMenuItems = document.body.querySelectorAll('.menu-item-has-children > a');
var index = 0;
for (index = 0; index < subMenuItems.length; index++) {
  var dropdownArrow = document.createElement('span');
  dropdownArrow.className = 'sub-nav-toggle';
  dropdownArrow.innerHTML = 'More';
  subMenuItems[index].parentNode.insertBefore(dropdownArrow, subMenuItems[index].nextSibling);
}

// Enables toggling all submenus individually
var subMenuToggle = document.querySelectorAll('.sub-nav-toggle'); 
for(var i in subMenuToggle) {
  if(subMenuToggle.hasOwnProperty(i)) {
    subMenuToggle[i].onclick = function() {
      this.parentElement.querySelector('.sub-menu').classList.toggle("active");
      this.parentElement.querySelector('.sub-nav-toggle').classList.toggle("active");
      this.parentElement.classList.toggle("active");
    };
  }
}


// Mobile navigation controls
// uses class-helpers.js to enable jQuery-like controls over class manipulation
var menuToggle = document.querySelector('.menu-toggle');
    outsideMenu = document.querySelector('.site-content-wrap');
    menuContainer = document.querySelector('.main-navigation');
    navMenu = document.querySelector('.nav-menu');
    
// set WAI-ARIA values for nav and toggle button
menuToggle.setAttribute( 'aria-expanded', 'false' );
navMenu.setAttribute( 'aria-expanded', 'false' );

// Toggle main menu and set WAI-ARIA values when menu button is clicked
menuToggle.onclick = function() {
  if (hasClass(menuContainer, 'toggled')) {
    removeClass(menuToggle, 'is-active');
    removeClass(menuContainer, 'toggled');
    menuToggle.setAttribute( 'aria-expanded', 'false' );
    navMenu.setAttribute( 'aria-expanded', 'false' );
  } else {
    addClass(menuToggle, 'is-active');
    addClass(menuContainer, 'toggled');
    menuToggle.setAttribute( 'aria-expanded', 'true' );
    navMenu.setAttribute( 'aria-expanded', 'true' );
  }
};

// Close menu and reset WAI-ARIA values when area outside of menu is clicked
outsideMenu.onclick = function() {
  removeClass(menuToggle, 'is-active');
  removeClass(menuContainer, 'toggled');
  menuToggle.setAttribute( 'aria-expanded', 'false' );
  navMenu.setAttribute( 'aria-expanded', 'false' );
};

// Reset mobile nav for laptop and desktop
window.addEventListener('resize', disableMobileNav);
function disableMobileNav() {
  if (window.innerWidth > 999) {
    removeClass(menuToggle, 'is-active');
    removeClass(menuContainer, 'toggled');
    menuToggle.setAttribute( 'aria-expanded', 'false' );
    navMenu.setAttribute( 'aria-expanded', 'true' );
  } else {
    navMenu.setAttribute( 'aria-expanded', 'false' );
  }
}

/**
* PAGE SCROLLING
* Plain JavaScript internal anchor and top-of-page scrolling, no jQuery required
*/

// shows the scroll-to-top button after scrolling down 200px
window.onscroll = function () {
  if (window.pageYOffset >= 200) {
    document.getElementById('scroll-to-top').style.opacity = "1";
  } else {
    document.getElementById('scroll-to-top').style.opacity = "0";
  }
};


// handles scrolling to internal anchors and top of page
initSmoothScrolling();

function initSmoothScrolling() {

  if (isCssSmoothSCrollSupported()) {
    document.getElementById('css-support-msg').className = 'supported';
    return;
  }

  var duration = 1000; // Speed of scrolling in milliseconds

  var pageUrl = location.hash ?
  stripHash(location.href) :
  location.href;

  delegatedLinkHijacking();
  //directLinkHijacking();

  function delegatedLinkHijacking() {
    document.body.addEventListener('click', onClick, false);

    function onClick(e) {
      if (!isInPageLink(e.target))
        return;

      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
        callback: function() {
          setFocus(e.target.hash);
        }
      });
    }
  }

  function directLinkHijacking() {
    [].slice.call(document.querySelectorAll('a'))
    .filter(isInPageLink)
    .forEach(function(a) {
      a.addEventListener('click', onClick, false);
    });

    function onClick(e) {
      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
      });
    }

  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' &&
    n.hash.length > 0 &&
    stripHash(n.href) === pageUrl;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function isCssSmoothSCrollSupported() {
    return 'scrollBehavior' in document.documentElement.style;
  }

  // Adapted from https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }

}

function jump(target, options) {
  var
  start = window.pageYOffset,
  opt = {
    duration: options.duration,
    offset: options.offset || 0,
    callback: options.callback,
    easing: options.easing || easeInOutQuad
  },
  distance = typeof target === 'string' ?
  opt.offset + document.querySelector(target).getBoundingClientRect().top :
  target,
  duration = typeof opt.duration === 'function' ?
  opt.duration(distance) :
  opt.duration,
  timeStart, timeElapsed;

  requestAnimationFrame(function(time) {
    timeStart = time;
    loop(time);
  });

  function loop(time) {
    timeElapsed = time - timeStart;

    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration)
      requestAnimationFrame(loop);
    else
      end();
  }

  function end() {
    window.scrollTo(0, start + distance);

    if (typeof opt.callback === 'function')
      opt.callback();
  }

  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

}
