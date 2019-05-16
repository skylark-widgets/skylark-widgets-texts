/**
 * skylark-ui-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-inputs/
 * @license MIT
 */
!function(r,n){var t=n.define,e=n.require,i="function"==typeof t&&t.amd,u=!i&&"undefined"!=typeof exports;if(!i&&!t){var o={};t=n.define=function(r,n,t){"function"==typeof t?(o[r]={factory:t,deps:n.map(function(n){return function(r,n){if("."!==r[0])return r;var t=n.split("/"),e=r.split("/");t.pop();for(var i=0;i<e.length;i++)"."!=e[i]&&(".."==e[i]?t.pop():t.push(e[i]));return t.join("/")}(n,r)}),resolved:!1,exports:null},e(r)):o[r]={factory:null,resolved:!0,exports:t}},e=n.require=function(r){if(!o.hasOwnProperty(r))throw new Error("Module "+r+" has not been defined");var t=o[r];if(!t.resolved){var i=[];t.deps.forEach(function(r){i.push(e(r))}),t.exports=t.factory.apply(n,i)||null,t.resolved=!0}return t.exports}}if(!t)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(r,n){r("skylark-langx/_attach",[],function(){return function(r,n,t){"string"==typeof n&&(n=n.split("."));for(var e=n.length,i=r,u=0,o=n[u++];u<e;)i=i[o]=i[o]||{},o=n[u++];return i[o]=t}}),r("skylark-langx/skylark",["./_attach"],function(r){var n={attach:function(t,e){return r(n,t,e)}};return n}),r("skylark-ui-inputs/inputs",["skylark-langx/skylark"],function(r){return r.attach("ui.inputs",{})}),r("skylark-ui-inputs/main",["./inputs"],function(){return inputs}),r("skylark-ui-inputs",["skylark-ui-inputs/main"],function(r){return r})}(t),!i){var a=e("skylark-langx/skylark");u?module.exports=a:n.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-ui-inputs-all.js.map
