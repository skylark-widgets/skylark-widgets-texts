/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
!function(r,n){var t=n.define,require=n.require,e="function"==typeof t&&t.amd,i=!e&&"undefined"!=typeof exports;if(!e&&!t){var s={};t=n.define=function(r,n,t){"function"==typeof t?(s[r]={factory:t,deps:n.map(function(n){return function(r,n){if("."!==r[0])return r;var t=n.split("/"),e=r.split("/");t.pop();for(var i=0;i<e.length;i++)"."!=e[i]&&(".."==e[i]?t.pop():t.push(e[i]));return t.join("/")}(n,r)}),resolved:!1,exports:null},require(r)):s[r]={factory:null,resolved:!0,exports:t}},require=n.require=function(r){if(!s.hasOwnProperty(r))throw new Error("Module "+r+" has not been defined");var module=s[r];if(!module.resolved){var t=[];module.deps.forEach(function(r){t.push(require(r))}),module.exports=module.factory.apply(n,t)||null,module.resolved=!0}return module.exports}}if(!t)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(r,require){r("skylark-widgets-inputs/inputs",["skylark-langx/skylark"],function(r){return r.attach("widgets.inputs",{})}),r("skylark-widgets-inputs/main",["./inputs"],function(){return inputs}),r("skylark-widgets-inputs",["skylark-widgets-inputs/main"],function(r){return r})}(t),!e){var o=require("skylark-langx-ns");i?module.exports=o:n.skylarkjs=o}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-widgets-inputs.js.map
