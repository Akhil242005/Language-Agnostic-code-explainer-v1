from fastapi import APIRouter
from app.schemas.request import ExplainRequest
from app.parser.python_parser import parse_code
from app.ir.builder import build_ir
from app.reasoning.engine import explain_ir
from app.ir.nodes import Assignment, IfStatement, ForLoop, WhileLoop

router = APIRouter()


def walk_ast(node, steps, step_counter, context=None):
    ir = build_ir(node)

    if isinstance(ir, Assignment):
        prefix = ""
        if context == "if":
            prefix = "In the if block, "
        elif context == "else":
            prefix = "In the else block, "
        elif context == "for":
            prefix = "Inside the for loop, "
        elif context == "while":
            prefix = "Inside the while loop, "

        steps.append({
            "step": step_counter[0],
            "node_type": "Assignment",
            "explanation": prefix + explain_ir(ir),
        })
        step_counter[0] += 1

    elif isinstance(ir, IfStatement):
        steps.append({
            "step": step_counter[0],
            "node_type": "IfStatement",
            "explanation": explain_ir(ir),
        })
        step_counter[0] += 1

        # Walk if-body
        for child in node.child_by_field_name("consequence").children:
            walk_ast(child, steps, step_counter, context="if")

        # Walk else-body
        alternative = node.child_by_field_name("alternative")
        if alternative:
            for child in alternative.children:
                walk_ast(child, steps, step_counter, context="else")

        return  # stop normal recursion here

    elif isinstance(ir, ForLoop):
        steps.append({
            "step": step_counter[0],
            "node_type": "ForLoop",
            "explanation": explain_ir(ir),
        })
        step_counter[0] += 1

        for child in node.child_by_field_name("body").children:
            walk_ast(child, steps, step_counter, context="for")

        return

    elif isinstance(ir, WhileLoop):
        steps.append({
            "step": step_counter[0],
            "node_type": "WhileLoop",
            "explanation": explain_ir(ir),
        })
        step_counter[0] += 1

        for child in node.child_by_field_name("body").children:
            walk_ast(child, steps, step_counter, context="while")

        return

    # default recursion
    for child in node.children:
        walk_ast(child, steps, step_counter, context)


@router.post("/explain")
def explain_code(request: ExplainRequest):
    root = parse_code(request.code)

    steps = []
    step_counter = [1]

    walk_ast(root, steps, step_counter)

    return {
        "status": "success",
        "steps": steps
    }
