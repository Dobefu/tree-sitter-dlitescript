/**
 * @file A delightfully simple scripting language
 * @author Connor van Spronssen
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "dlitescript",

  extras: ($) => [
    /\s/,
    $.comment,
  ],

  rules: {
    source_file: ($) =>
      repeat($._definition),

    comment: ($) =>
      token(
        seq(
          "//",
          /.*/,
        ),
      ),

    _definition: ($) =>
      choice(
        $.variable_declaration,
        $.variable_assignment,
        $.function_call,
        $.block,
      ),

    variable_declaration: ($) =>
      seq(
        choice(
          "var",
          "const",
        ),
        $.identifier,
        $._type,
        optional(seq("=", $._expression)),
      ),

    variable_assignment: ($) =>
      seq(
        $.identifier,
        "=",
        $._expression,
      ),

    _statement: ($) =>
      choice(
        $.variable_declaration,
        $.variable_assignment,
        $.function_call,
        $.block,
      ),

    block: ($) =>
      seq(
        "{",
        optional(repeat($._statement)),
        "}",
      ),

    _expression: ($) =>
      choice(
        $.function_call,
        $.identifier,
        $.number,
        $.string_literal,
        $.binary_expression,
        $.unary_expression,
      ),

    function_call: ($) =>
      seq(
        $.identifier,
        "(",
        optional(
          seq(
            $._expression,
            repeat(seq(",", $._expression)),
          ),
        ),
        ")",
      ),

    binary_expression: ($) =>
      choice(
        prec.right(300, seq($._expression, "**", $._expression)),
        prec.left(200, seq($._expression, choice("*", "/", "%"), $._expression)),
        prec.left(100, seq($._expression, choice("+", "-"), $._expression)),
      ),

    unary_expression: ($) =>
      prec(400, seq(choice("+", "-"), $._expression)),

    _type: ($) =>
      choice(
        "string",
        "number",
      ),

    identifier: ($) =>
      /[a-zA-Z_][a-zA-Z0-9_]*/,

    number: ($) =>
      /\d+/,

    string_literal: ($) =>
      seq(
        '"',
        repeat(choice(
          /[^"\\%]/,
          $.escape_sequence,
          $.format_specifier,
        )),
        '"',
      ),

    escape_sequence: ($) =>
      /\\./,

    format_specifier: ($) =>
      choice(
        "%%",
        "%s",
        "%g",
      ),
  },
});
