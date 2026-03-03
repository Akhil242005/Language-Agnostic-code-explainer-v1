import ast


def parse_code(code: str):
    """
    Parses Python source code using built-in ast module.
    Returns the AST tree.
    """
    try:
        tree = ast.parse(code)
        return tree
    except SyntaxError as e:
        raise Exception(f"Syntax Error: {e}")