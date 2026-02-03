from tree_sitter import Language, Parser
import tree_sitter_python

# Load Python language
PY_LANGUAGE = Language(tree_sitter_python.language())

parser = Parser()
parser.language = PY_LANGUAGE   # ✅ NEW API (not set_language)

def parse_code(code: str):
    """
    Parse Python code and return the root syntax node.
    """
    tree = parser.parse(code.encode("utf-8"))
    return tree.root_node
