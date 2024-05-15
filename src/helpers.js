/**
 * Original work Copyright (c) 2016 Philippe FERDINAND
 * Modified work Copyright (c) 2016 Kam Low
 *
 * @license MIT
 **/
'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var log = require('./logger').getLogger();
var handlebars = require('handlebars');
const { start } = require('repl');

module.exports = {

  inline: function(code) {
    if (Array.isArray(code)) {
      var refs;
      var s = '';
      var in_params = false;
      var start_param = true;

      s += "```cpp\n";
      code.forEach(function (e) {
        refs = e.split(/(\[.*\]\(.*\)|\n|\s{2}\n)/g);
        refs.forEach(function (f) {

          // console.log(f);

          // Strip function name from links
          if (f.charAt(0) == '[') {
            var link = f.match(/\[(.*)\]\((.*)\)/);
            if (link) {
              s += link[1];
            }
          }

          // Line breaks
          else if (f == '\n' || f == '  \n') {
            s += f;
          }

          // See if we're doing parameters
          else if (f.charAt(0) == '(') {
            in_params = true;
            s += f + "\n";
          }

          // See if we're done with parameters
          else if (f.charAt(0) == ')') {
            in_params = false;
            s += "\n" + f;
          }

          // Everything else
          else if (f) {

            // Print each parameter on a line
            if (in_params) {

              // Patch: replace "< " with "<" for templates
              f = f.replace(/<\s/g, '<');

              // Indent parameters, each on a separate line
              if (start_param) {
                s += "    " + f;
                start_param = false;
              } else if (f.charAt(0) == ',') {
                s += f + "\n";
                start_param = true;
              } else {
                s += f;
              }

            // Print everything else
            } else {
              s += f;
            }
          }
        });
      });

      // Terminate code block
      s += "\n```\n";

      return s;
    }
    else {
      return '`' + code + '`';
    }
  },

  getAnchor: function(name, options) {
    if (options.anchors) {
      return '{#' + name + '}';
    }
    else if (options.htmlAnchors) {
      return '<a id="' + name + '"></a>';
    }
    else {
      return '';
    }
  },

  findParent: function(compound, kinds) {
    while (compound) {
      if (kinds.includes(compound.kind))
        return compound;
      compound = compound.parent;
    }
  },

  // Replace ref links to point to correct output file if needed
  resolveRefs: function(content, compound, references, options) {
    return content.replace(/\{#ref ([^ ]+) #\}/g, function(_, refid) {
      var ref = references[refid]
      var page = this.findParent(ref, ['page']);

      if (page) {
        if (page.refid == compound.refid)
          return '#' + refid;
        return this.compoundPath(page, options) + '#' + refid;
      }

      if (options.groups) {
        if (compound.groupid && compound.groupid == ref.groupid)
          return '#' + refid;
        return this.compoundPath(ref, options) + '#' + refid;
      } else if (options.classes) {
        var dest = this.findParent(ref, ['namespace', 'class', 'struct']);
        if (!dest || compound.refid == dest.refid)
          return '#' + refid;
        return this.compoundPath(dest, options) + '#' + refid;
      } else {
        if (compound.kind == 'page')
          return this.compoundPath(compound.parent, options) + '#' + refid;
        return '#' + refid;
      }
    }.bind(this));
  },

  compoundPath: function(compound, options) {
    if (compound.kind == 'page') {
      return path.dirname(options.output) + "/page-" + compound.name + ".md";
    } else if (options.groups) {
      return util.format(options.output, compound.groupname);
    } else if (options.classes) {
      return util.format(options.output, compound.name.replace(/\:/g, '-').replace('<', '(').replace('>', ')'));
    } else {
      return options.output;
    }
  },

  writeCompound: function(compound, contents, references, options) {
    this.writeFile(this.compoundPath(compound, options), contents.map(function(content) {
      return this.resolveRefs(content, compound, references, options);
    }.bind(this)));
  },

  // Write the output file
  writeFile: function (filepath, contents) {
    log.verbose('Writing: ' + filepath);
    var stream = fs.createWriteStream(filepath);
    stream.once('open', function(fd) {
      contents.forEach(function (content) {
        if (content)
          stream.write(content);
      });
      stream.end();
    });
  },
};
