import ast


def explain_python(code: str):
    try:
        tree = ast.parse(code)
        explanations = []
        visited_calls = set()
        walk(tree, explanations, visited_calls, in_class=False)
        return explanations
    except Exception as e:
        return [f"Internal Python analysis error: {str(e)}"]


# =========================
# WALKER
# =========================

def walk(node, explanations, visited_calls, in_class):

    # IMPORTS
    if isinstance(node, ast.Import):
        for alias in node.names:
            if alias.asname:
                explanations.append(
                    f"The module '{alias.name}' is imported as '{alias.asname}'."
                )
            else:
                explanations.append(
                    f"The module '{alias.name}' is imported."
                )

    elif isinstance(node, ast.ImportFrom):
        for alias in node.names:
            if alias.asname:
                explanations.append(
                    f"The name '{alias.name}' is imported from module '{node.module}' as '{alias.asname}'."
                )
            else:
                explanations.append(
                    f"The name '{alias.name}' is imported from module '{node.module}'."
                )

    # ASSIGNMENTS
    elif isinstance(node, ast.Assign):

        # Skip assignment explanation if it's class instantiation (handled in Call)
        if isinstance(node.value, ast.Call) and isinstance(node.value.func, ast.Name) and node.value.func.id[0].isupper():
            pass
        else:
            value = format_expression(node.value)
            for target in node.targets:
                if in_class and isinstance(target, ast.Name):
                    explanations.append(
                        f"A class attribute '{target.id}' is assigned the value {value}."
                    )
                else:
                    explanations.append(
                        f"The variable '{format_expression(target)}' is assigned the value {value}."
                    )

    # FUNCTION DEF
    elif isinstance(node, ast.FunctionDef):
        params = [arg.arg for arg in node.args.args]

        if params:
            param_text = ", ".join(params)
        else:
            param_text = "no parameters"

        if in_class:
            explanations.append(
                f"The method '{node.name}' is defined with parameters {param_text}."
            )
        else:
            explanations.append(
                f"The function '{node.name}' is defined with parameters {param_text}."
            )

    # CLASS DEF
    elif isinstance(node, ast.ClassDef):
        if node.bases:
            bases = ", ".join(format_expression(b) for b in node.bases)
            explanations.append(
                f"The class '{node.name}' is defined and inherits from {bases}."
            )
        else:
            explanations.append(
                f"The class '{node.name}' is defined."
            )

        for child in node.body:
            walk(child, explanations, visited_calls, in_class=True)
        return

    # CONTROL FLOW
    elif isinstance(node, ast.If):
        explanations.append(
            f"This if statement checks whether {format_expression(node.test)}."
        )

    elif isinstance(node, ast.For):
        explanations.append(
            f"This for loop iterates the variable '{format_expression(node.target)}' over {format_expression(node.iter)}."
        )

    elif isinstance(node, ast.While):
        explanations.append(
            f"This while loop continues as long as {format_expression(node.test)}."
        )

    elif isinstance(node, ast.Return):
        if in_class:
            explanations.append(
                f"The method returns {format_expression(node.value)}."
            )
        else:
            explanations.append(
                f"The function returns {format_expression(node.value)}."
            )

    # CALLS
    elif isinstance(node, ast.Call):
        signature = (
            format_expression(node.func),
            tuple(format_expression(a) for a in node.args)
        )

        if signature not in visited_calls:
            visited_calls.add(signature)
            explain_call(node, explanations)

    # RECURSION
    for child in ast.iter_child_nodes(node):
        walk(child, explanations, visited_calls, in_class)


# =========================
# CALL HANDLER
# =========================

def explain_call(node, explanations):

    func_name = format_expression(node.func)
    args = [format_expression(a) for a in node.args]
    arg_text = ", ".join(args) if args else "no arguments"

    # Ignore super()
    if func_name.startswith("super"):
        return

    # Class instantiation
    if isinstance(node.func, ast.Name) and node.func.id[0].isupper():
        explanations.append(
            f"An object of class '{node.func.id}' is created with {arg_text}."
        )
        return

    # Method call
    if isinstance(node.func, ast.Attribute):
        explanations.append(
            f"The method '{node.func.attr}' of '{format_expression(node.func.value)}' is called with {arg_text}."
        )
        return

    # Normal function call
    explanations.append(
        f"The function '{func_name}' is called with {arg_text}."
    )


# =========================
# FORMATTER
# =========================

def format_expression(node):
    if node is None:
        return ""

    if isinstance(node, ast.Constant):
        return repr(node.value)

    if isinstance(node, ast.Name):
        return node.id

    if isinstance(node, ast.Attribute):
        return f"{format_expression(node.value)}.{node.attr}"

    if isinstance(node, ast.BinOp):
        return f"{format_expression(node.left)} {operator_symbol(node.op)} {format_expression(node.right)}"

    if isinstance(node, ast.Compare):
        left = format_expression(node.left)
        right = format_expression(node.comparators[0])
        op = operator_symbol(node.ops[0])
        return f"{left} {op} {right}"

    if isinstance(node, ast.Call):
        func = format_expression(node.func)
        args = ", ".join(format_expression(a) for a in node.args)
        return f"{func}({args})"

    try:
        return ast.unparse(node)
    except Exception:
        return "expression"


def operator_symbol(op):
    if isinstance(op, ast.Add): return "+"
    if isinstance(op, ast.Sub): return "-"
    if isinstance(op, ast.Mult): return "*"
    if isinstance(op, ast.Div): return "/"
    if isinstance(op, ast.Lt): return "<"
    if isinstance(op, ast.Gt): return ">"
    if isinstance(op, ast.LtE): return "<="
    if isinstance(op, ast.GtE): return ">="
    if isinstance(op, ast.Eq): return "=="
    return ""