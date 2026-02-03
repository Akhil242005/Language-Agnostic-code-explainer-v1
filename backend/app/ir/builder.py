from app.ir.nodes import (
    Assignment,
    Identifier,
    Literal,
    BinaryExpression,
    IfStatement,
    ForLoop,
    WhileLoop,
)


def build_ir(node):
    # -------------------------
    # Assignment
    # -------------------------
    if node.type == "assignment":
        target_node = node.child_by_field_name("left")
        value_node = node.child_by_field_name("right")

        return Assignment(
            target=Identifier(target_node.text.decode("utf-8")),
            value=build_ir(value_node),
        )

    # -------------------------
    # Identifier
    # -------------------------
    if node.type == "identifier":
        return Identifier(node.text.decode("utf-8"))

    # -------------------------
    # Integer literal
    # -------------------------
    if node.type == "integer":
        return Literal(int(node.text.decode("utf-8")))

    # -------------------------
    # String literal
    # -------------------------
    if node.type == "string":
        raw = node.text.decode("utf-8")
        return Literal(raw.strip('"').strip("'"))

    # -------------------------
    # Binary expression
    # -------------------------
    if node.type == "binary_operator":
        return BinaryExpression(
            left=build_ir(node.children[0]),
            operator=node.children[1].text.decode("utf-8"),
            right=build_ir(node.children[2]),
        )

    # -------------------------
    # If statement
    # -------------------------
    if node.type == "if_statement":
        condition = node.child_by_field_name("condition")
        return IfStatement(condition.text.decode("utf-8"))

    # -------------------------
    # For loop
    # -------------------------
    if node.type == "for_statement":
        target = node.child_by_field_name("left")
        iterable = node.child_by_field_name("right")
        return ForLoop(
            iterator=target.text.decode("utf-8"),
            iterable=iterable.text.decode("utf-8"),
        )

    # -------------------------
    # While loop
    # -------------------------
    if node.type == "while_statement":
        condition = node.child_by_field_name("condition")
        return WhileLoop(condition.text.decode("utf-8"))

    return None
