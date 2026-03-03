import ast
from app.ir.nodes import *


# -----------------------------
# Operator Maps
# -----------------------------

BIN_OPS = {
    ast.Add: "+",
    ast.Sub: "-",
    ast.Mult: "*",
    ast.Div: "/",
    ast.Mod: "%",
    ast.Pow: "**",
    ast.FloorDiv: "//"
}

COMPARE_OPS = {
    ast.Gt: ">",
    ast.Lt: "<",
    ast.GtE: ">=",
    ast.LtE: "<=",
    ast.Eq: "==",
    ast.NotEq: "!=",
    ast.Is: "is",
    ast.IsNot: "is not"
}

BOOL_OPS = {
    ast.And: "and",
    ast.Or: "or"
}

UNARY_OPS = {
    ast.UAdd: "+",
    ast.USub: "-",
    ast.Not: "not "
}


# -----------------------------
# IR Builder
# -----------------------------

def build_ir(tree: ast.AST):
    ir_nodes = []
    walk_body(tree.body, ir_nodes)
    return ir_nodes


def walk_body(body, ir_nodes, inside_class=False):
    for stmt in body:
        node = handle_statement(stmt, inside_class)
        if node:
            if isinstance(node, list):
                ir_nodes.extend(node)
            else:
                ir_nodes.append(node)

        if hasattr(stmt, "body") and isinstance(stmt.body, list):
            walk_body(stmt.body, ir_nodes, inside_class=isinstance(stmt, ast.ClassDef))

        if hasattr(stmt, "orelse") and isinstance(stmt.orelse, list):
            walk_body(stmt.orelse, ir_nodes, inside_class)


def handle_statement(stmt, inside_class=False):

    if isinstance(stmt, ast.Import):
        return [ImportNode(alias.name, alias.asname) for alias in stmt.names]

    if isinstance(stmt, ast.ImportFrom):
        return [
            ImportFromNode(stmt.module, alias.name, alias.asname)
            for alias in stmt.names
        ]

    if isinstance(stmt, ast.Assign):
        target = expr_to_str(stmt.targets[0])
        value = expr_to_str(stmt.value)

        is_call = isinstance(stmt.value, ast.Call)

        # Constructor detection (Class instantiation)
        if isinstance(stmt.value, ast.Call):
            if isinstance(stmt.value.func, ast.Name):
                if stmt.value.func.id[0].isupper():
                    value = f"{stmt.value.func.id}({', '.join(expr_to_str(a) for a in stmt.value.args)})"
                    return AssignNode(target, value, is_call=True)

        return AssignNode(target, value, is_call=is_call)

    if isinstance(stmt, ast.FunctionDef):
        params = [arg.arg for arg in stmt.args.args]
        if inside_class:
            return MethodNode(stmt.name, params)
        return FunctionNode(stmt.name, params)

    if isinstance(stmt, ast.Return):
        return ReturnNode(expr_to_str(stmt.value))

    if isinstance(stmt, ast.ClassDef):
        bases = [expr_to_str(base) for base in stmt.bases]
        return ClassNode(stmt.name, bases)

    if isinstance(stmt, ast.For):
        return ForNode(expr_to_str(stmt.target), expr_to_str(stmt.iter))

    if isinstance(stmt, ast.While):
        return WhileNode(expr_to_str(stmt.test))

    if isinstance(stmt, ast.If):
        return IfNode(expr_to_str(stmt.test))

    if isinstance(stmt, ast.Expr) and isinstance(stmt.value, ast.Call):
        func = expr_to_str(stmt.value.func)
        args = [expr_to_str(a) for a in stmt.value.args]
        return CallNode(func, args)

    return None


# -----------------------------
# Expression Renderer
# -----------------------------

def expr_to_str(node):

    if isinstance(node, ast.Name):
        return node.id

    if isinstance(node, ast.Constant):
        return repr(node.value)

    if isinstance(node, ast.Attribute):
        return f"{expr_to_str(node.value)}.{node.attr}"

    if isinstance(node, ast.Call):
        func = expr_to_str(node.func)
        args = [expr_to_str(a) for a in node.args]
        return f"{func}({', '.join(args)})"

    if isinstance(node, ast.BinOp):
        op_symbol = BIN_OPS.get(type(node.op), "?")
        return f"{expr_to_str(node.left)} {op_symbol} {expr_to_str(node.right)}"

    if isinstance(node, ast.Compare):
        left = expr_to_str(node.left)
        op = COMPARE_OPS.get(type(node.ops[0]), "?")
        right = expr_to_str(node.comparators[0])
        return f"{left} {op} {right}"

    if isinstance(node, ast.BoolOp):
        op_symbol = BOOL_OPS.get(type(node.op), "?")
        values = f" {op_symbol} ".join(expr_to_str(v) for v in node.values)
        return values

    if isinstance(node, ast.UnaryOp):
        op_symbol = UNARY_OPS.get(type(node.op), "")
        return f"{op_symbol}{expr_to_str(node.operand)}"

    if isinstance(node, ast.List):
        return "[" + ", ".join(expr_to_str(e) for e in node.elts) + "]"

    if isinstance(node, ast.Tuple):
        return "(" + ", ".join(expr_to_str(e) for e in node.elts) + ")"

    if isinstance(node, ast.Dict):
        pairs = []
        for k, v in zip(node.keys, node.values):
            pairs.append(f"{expr_to_str(k)}: {expr_to_str(v)}")
        return "{" + ", ".join(pairs) + "}"

    if isinstance(node, ast.ListComp):
        elt = expr_to_str(node.elt)
        gen = node.generators[0]
        target = expr_to_str(gen.target)
        iter_ = expr_to_str(gen.iter)
        return f"[{elt} for {target} in {iter_}]"

    if isinstance(node, ast.Lambda):
        args = ", ".join(a.arg for a in node.args.args)
        return f"lambda {args}: {expr_to_str(node.body)}"

    return "expression"