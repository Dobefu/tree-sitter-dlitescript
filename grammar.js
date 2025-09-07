/**
 * @file A delightfully simple scripting language
 * @author Connor van Spronssen
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "dlitescript",

  extras: ($) => [/\s/, $.comment],

  rules: {
    source_file: ($) => repeat($._definition),

    comment: ($) => token(seq("//", /.*/)),

    _definition: ($) =>
      choice(
        $.variable_declaration,
        $.variable_assignment,
        $.function_call,
        $.if_statement,
        $.for_statement,
        $.break_statement,
        $.continue_statement,
        $.return_statement,
        $.func_statement,
        $.block,
      ),

    variable_declaration: ($) =>
      seq(
        choice("var", "const"),
        $.identifier,
        $._type,
        optional(seq("=", $._expression)),
      ),

    variable_assignment: ($) => seq($.identifier, "=", $._expression),

    _statement: ($) =>
      choice(
        $.variable_declaration,
        $.variable_assignment,
        $.function_call,
        $.if_statement,
        $.for_statement,
        $.break_statement,
        $.continue_statement,
        $.return_statement,
        $.func_statement,
        $.block,
      ),

    if_statement: ($) =>
      seq(
        "if",
        $.condition,
        $.block,
        repeat(seq("else", "if", $.condition, $.block)),
        optional(seq("else", $.block)),
      ),

    for_statement: ($) =>
      choice(
        seq("for", $.block),
        seq("for", $.condition, $.block),
        seq("for", "var", $.identifier, $.for_var_condition, $.block),
        seq(
          "for",
          "var",
          $.identifier,
          "from",
          $._expression,
          "to",
          $._expression,
          $.block,
        ),
        seq("for", "var", $.identifier, "to", $._expression, $.block),
        seq("for", "from", $._expression, "to", $._expression, $.block),
        seq("for", "to", $._expression, $.block),
      ),

    break_statement: ($) => seq("break", optional($.number)),

    continue_statement: ($) => seq("continue", optional($.number)),

    return_statement: ($) =>
      prec.right(
        1,
        seq(
          "return",
          optional(seq($._expression, repeat(seq(",", $._expression)))),
        ),
      ),

    func_statement: ($) =>
      seq(
        "func",
        $.identifier,
        seq(
          "(",
          optional(
            seq($.identifier, $._type, repeat(seq(",", $.identifier, $._type))),
          ),
          ")",
        ),
        optional(
          choice(
            repeat(seq($._type, optional(","))),
            seq("(", repeat(seq($._type, optional(","))), ")"),
          ),
        ),
      ),

    condition: ($) => choice($._expression, seq("(", $._expression, ")")),

    for_var_condition: ($) => seq($._comparison_operator, $._expression),

    _comparison_operator: ($) => choice("==", "!=", ">", ">=", "<", "<="),

    block: ($) => seq("{", optional(repeat($._statement)), "}"),

    _expression: ($) =>
      choice(
        $.function_call,
        $.identifier,
        $.number,
        $.string_literal,
        $.boolean,
        $.binary_expression,
        $.unary_expression,
        $.spread_expression,
      ),

    function_call: ($) =>
      seq(
        $.identifier,
        "(",
        optional(seq($._expression, repeat(seq(",", $._expression)))),
        ")",
      ),

    binary_expression: ($) =>
      choice(
        prec.right(800, seq($._expression, "**", $._expression)),
        prec.left(
          700,
          seq($._expression, choice("*", "/", "%"), $._expression),
        ),
        prec.left(600, seq($._expression, choice("+", "-"), $._expression)),
        prec.left(
          500,
          seq($._expression, $._comparison_operator, $._expression),
        ),
        prec.left(400, seq($._expression, "&&", $._expression)),
        prec.left(300, seq($._expression, "||", $._expression)),
        prec.left(10, seq($._expression, "=", $._expression)),
      ),

    unary_expression: ($) =>
      prec(900, seq(choice("+", "-", "!"), $._expression)),

    spread_expression: ($) => seq("...", $._expression),

    _type: ($) => choice("string", "number", "bool", "null"),

    identifier: ($) => /[a-zA-Z_]\w*/,

    number: ($) => /\d+/,

    string_literal: ($) =>
      seq(
        '"',
        repeat(choice(/[^"\\%]/, $.escape_sequence, $.format_specifier)),
        '"',
      ),

    boolean: ($) => choice("true", "false"),

    escape_sequence: ($) => /\\./,

    format_specifier: ($) => choice("%%", "%s", "%g", "%t", "%v"),
  },
});
