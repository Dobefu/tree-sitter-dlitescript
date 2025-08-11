package tree_sitter_dlitescript_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_dlitescript "github.com/dobefu/tree-sitter-dlitescript/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_dlitescript.Language())
	if language == nil {
		t.Errorf("Error loading DLiteScript grammar")
	}
}
