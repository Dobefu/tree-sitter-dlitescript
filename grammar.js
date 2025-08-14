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
        $.if_statement,
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
        $.if_statement,
        $.block,
      ),

    if_statement: ($) =>
      seq(
        "if",
        $.condition,
        $.block,
        repeat(seq(
          "else",
          "if",
          $.condition,
          $.block,
        )),
        optional(seq(
          "else",
          $.block,
        )),
      ),

    condition: ($) =>
      choice(
        $._expression,
        seq(
          "(",
          $._expression,
          ")",
        ),
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
        $.boolean,
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
        prec.right(800, seq($._expression, "**", $._expression)),
        prec.left(700, seq($._expression, choice("*", "/", "%"), $._expression)),
        prec.left(600, seq($._expression, choice("+", "-"), $._expression)),
        prec.left(500, seq($._expression, choice("==", "!=", ">", ">=", "<", "<="), $._expression)),
        prec.left(400, seq($._expression, "&&", $._expression)),
        prec.left(300, seq($._expression, "||", $._expression)),
        prec.left(10, seq($._expression, "=", $._expression)),
      ),

    unary_expression: ($) =>
      prec(900, seq(choice("+", "-", "!"), $._expression)),

    _type: ($) =>
      choice(
        "string",
        "number",
        "bool",
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

    boolean: ($) =>
      choice(
        "true",
        "false",
      ),

    escape_sequence: ($) =>
      /\\./,

    format_specifier: ($) =>
      choice(
        "%%",
        "%s",
        "%g",
        "%t",
        "%v",
      ),
  },
});
