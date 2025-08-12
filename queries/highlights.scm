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
] @keyword

; Types
[
  "string"
  "number"
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
] @operator

; Literals (terminal values)
(string_literal) @string
(escape_sequence) @string.escape
(format_specifier) @string.special
(number) @number

; Identifiers
(identifier) @variable

; Punctuation
[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket
