import XCTest
import SwiftTreeSitter
import TreeSitterDlitescript

final class TreeSitterDlitescriptTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_dlitescript())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading DLiteScript grammar")
    }
}
