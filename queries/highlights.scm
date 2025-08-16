; Comments
(comment) @comment

; Function calls (high-level constructs)
(function_call
  (identifier) @function.call
  "(" @punctuation.bracket
  ")" @punctuation.bracket
  .)

; Keywords
[
  "var"
  "const"
  "if"
  "else"
  "for"
  "break"
  "continue"
  "from"
  "to"
] @keyword

; Types
[
  "string"
  "number"
  "bool"
] @type.builtin

; Operators
[
  "="
  "+"
  "-"
  "*"
  "/"
  "**"
  "%"
  "=="
  "!="
  ">"
  ">="
  "<"
  "<="
  "&&"
  "||"
  "!"
] @operator

; Literals (terminal values)
(string_literal) @string
(escape_sequence) @string.escape
(format_specifier) @string.special
(number) @number
(boolean) @boolean

; Identifiers
(identifier) @variable

; For loops
(for_statement) @keyword.control.loop
(for_var_condition) @keyword.control.condition

; Break and continue statements
(break_statement) @keyword.control.flow
(continue_statement) @keyword.control.flow

; Punctuation
[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket
