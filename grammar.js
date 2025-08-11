/**
 * @file A delightfully simple scripting language
 * @author Connor van Spronssen
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "dlitescript",

  rules: {
    // TODO: add the actual grammar rules
    source_file: ($) => "TODO",
  },
});
