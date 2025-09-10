; Comments
(comment) @comment

; Function calls
(function_call
  (identifier) @function.call)

; Function definitions
(func_statement) @function

; Keywords
[
  "var"
  "const"
  "func"
  "if"
  "else"
  "for"
  "break"
  "continue"
  "return"
  "from"
  "to"
] @keyword

; Types
[
  "string"
  "number"
  "bool"
  "null"
] @type.builtin

; Array types
(array_type) @type.builtin

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

; Format specifiers
[
  "%g"
  "%s"
  "%t"
  "%v"
] @string.special

; Literals (terminal values)
(string_literal) @string
(escape_sequence) @string.escape
(format_specifier) @string.special
(number) @number
(boolean) @boolean

; Array literals
(array_literal) @punctuation.bracket

; Literals
[
  "true"
  "false"
  "null"
] @boolean

; Expressions
(unary_expression (identifier) @variable)
(binary_expression (identifier) @variable)

; Spread
(spread_expression "..." @operator)

; Array indexing
(index_expression) @punctuation.bracket
(slice_expression) @punctuation.bracket

; Variable declarations
(variable_declaration
  (identifier) @variable)

; Variable assignments
(variable_assignment
  (identifier) @variable)

; Control flow statements
(if_statement) @keyword.conditional

(for_statement) @keyword.repeat

(break_statement) @keyword.return

(continue_statement) @keyword.return

(return_statement) @keyword.return

; Brackets
[
  "("
  ")"
  "{"
  "}"
  "["
  "]"
] @punctuation.bracket

; Delimiters
"," @punctuation.delimiter
