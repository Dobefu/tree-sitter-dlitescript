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

; Punctuation
[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket
