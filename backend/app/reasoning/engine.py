from app.ir.nodes import (
    Assignment,
    Identifier,
    Literal,
    BinaryExpression,
    IfStatement,
    ForLoop,
    WhileLoop,
)


def explain_ir(node):
    # -------------------------
    # Assignment
    # -------------------------
    if isinstance(node, Assignment):
        target = explain_ir(node.target)
        value = explain_ir(node.value)
        return f"The variable '{target}' is assigned {value}."

    # -------------------------
    # Identifier
    # -------------------------
    if isinstance(node, Identifier):
        return node.name

    # -------------------------
    # Literal
    # -------------------------
    if isinstance(node, Literal):
        return f"the value {node.value}"

    # -------------------------
    # Binary expression
    # -------------------------
    if isinstance(node, BinaryExpression):
        left = explain_ir(node.left)
        right = explain_ir(node.right)
        return f"the result of {left} {node.operator} {right}"

    # -------------------------
    # If statement
    # -------------------------
    if isinstance(node, IfStatement):
        return (
            f"This if statement checks the condition '{node.condition}'. "
            f"If the condition is true, the statements inside the if-block are executed; "
            f"otherwise, the statements inside the else-block are executed."
        )

    # -------------------------
    # For loop
    # -------------------------
    if isinstance(node, ForLoop):
        return (
            f"This for loop iterates the variable '{node.iterator}' over "
            f"the sequence '{node.iterable}' and executes its body repeatedly."
        )

    # -------------------------
    # While loop
    # -------------------------
    if isinstance(node, WhileLoop):
        return (
            f"This while loop repeatedly executes its body as long as "
            f"the condition '{node.condition}' remains true."
        )

    return "This construct could not be explained."
