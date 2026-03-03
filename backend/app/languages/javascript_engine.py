import re


def explain_javascript(code: str):
    explanations = []
    lines = code.split("\n")

    inside_class = False
    class_name = None
    brace_depth = 0

    for line in lines:
        stripped = line.strip()

        if not stripped:
            continue

        # Track braces for class scoping
        brace_depth += stripped.count("{")
        brace_depth -= stripped.count("}")

        if inside_class and brace_depth <= 0:
            inside_class = False
            class_name = None

        # =========================
        # IMPORTS
        # =========================
        if stripped.startswith("import "):
            explanations.append(
                "A module is imported using an ES6 import statement."
            )
            continue

        # =========================
        # CLASS DEFINITION
        # =========================
        class_match = re.match(r"class\s+(\w+)(?:\s+extends\s+(\w+))?", stripped)
        if class_match:
            class_name = class_match.group(1)
            parent = class_match.group(2)
            inside_class = True
            brace_depth = 1

            if parent:
                explanations.append(
                    f"The class '{class_name}' is defined and inherits from '{parent}'."
                )
            else:
                explanations.append(
                    f"The class '{class_name}' is defined."
                )
            continue

        # =========================
        # FUNCTION DECLARATION
        # =========================
        func_match = re.match(r"(async\s+)?function\s+(\w+)\((.*?)\)", stripped)
        if func_match:
            name = func_match.group(2)
            params = func_match.group(3) or "no parameters"

            if func_match.group(1):
                explanations.append(
                    f"An asynchronous function '{name}' is defined with parameters {params}."
                )
            else:
                explanations.append(
                    f"The function '{name}' is defined with parameters {params}."
                )
            continue

        # =========================
        # SIMPLE ARROW FUNCTION (only direct assignment)
        # =========================
        arrow_match = re.match(
            r"(const|let|var)\s+(\w+)\s*=\s*\((.*?)\)\s*=>",
            stripped
        )
        if arrow_match:
            name = arrow_match.group(2)
            params = arrow_match.group(3) or "no parameters"

            explanations.append(
                f"An arrow function '{name}' is defined with parameters {params}."
            )
            continue

        # =========================
        # CONSTRUCTOR
        # =========================
        if inside_class and stripped.startswith("constructor("):
            params = stripped[stripped.find("(")+1:stripped.find(")")] or "no parameters"
            explanations.append(
                f"The constructor of class '{class_name}' is defined with parameters {params}."
            )
            continue

        # =========================
        # STATIC METHOD
        # =========================
        static_match = re.match(r"static\s+(\w+)\((.*?)\)", stripped)
        if inside_class and static_match:
            method_name = static_match.group(1)
            params = static_match.group(2) or "no parameters"
            explanations.append(
                f"A static method '{method_name}' is defined in class '{class_name}' with parameters {params}."
            )
            continue

        # =========================
        # INSTANCE METHOD
        # =========================
        instance_match = re.match(r"(\w+)\((.*?)\)\s*{?", stripped)
        if inside_class and instance_match:
            method_name = instance_match.group(1)

            # Prevent keywords from being treated as methods
            if method_name not in ["if", "for", "while", "switch", "super"]:
                params = instance_match.group(2) or "no parameters"
                explanations.append(
                    f"The method '{method_name}' is defined in class '{class_name}' with parameters {params}."
                )
                continue

        # =========================
        # VARIABLE ASSIGNMENT
        # =========================
        assign_match = re.match(r"(let|const|var)\s+(\w+)\s*=\s*(.+);?", stripped)
        if assign_match and "=>" not in stripped:
            name = assign_match.group(2)
            value = assign_match.group(3).rstrip(";")
            explanations.append(
                f"The variable '{name}' is assigned the value {value}."
            )
            continue

        # =========================
        # OBJECT INSTANTIATION
        # =========================
        new_match = re.search(r"new\s+(\w+)\((.*?)\)", stripped)
        if new_match:
            class_created = new_match.group(1)
            args = new_match.group(2) or "no arguments"
            explanations.append(
                f"An object of class '{class_created}' is created with arguments {args}."
            )
            continue

        # =========================
        # RETURN
        # =========================
        if stripped.startswith("return "):
            value = stripped.replace("return", "").strip().rstrip(";")
            explanations.append(
                f"The function returns {value}."
            )
            continue

        # =========================
        # IF
        # =========================
        if stripped.startswith("if"):
            condition = stripped[stripped.find("(")+1:stripped.find(")")]
            explanations.append(
                f"This if statement checks whether {condition}."
            )
            continue

        # =========================
        # FOR
        # =========================
        if stripped.startswith("for"):
            condition = stripped[stripped.find("(")+1:stripped.find(")")]
            explanations.append(
                f"This for loop runs with condition {condition}."
            )
            continue

        # =========================
        # WHILE
        # =========================
        if stripped.startswith("while"):
            condition = stripped[stripped.find("(")+1:stripped.find(")")]
            explanations.append(
                f"This while loop continues as long as {condition}."
            )
            continue

        # =========================
        # FUNCTION / METHOD CALL
        # =========================
        call_match = re.search(r"(\w+(?:\.\w+)*)\((.*?)\)", stripped)
        if call_match:
            name = call_match.group(1)
            args = call_match.group(2) or "no arguments"

            if not stripped.startswith(
                ("function", "class", "constructor", "static", "if", "for", "while")
            ):
                explanations.append(
                    f"The function or method '{name}' is called with arguments {args}."
                )

    if not explanations:
        explanations.append("No recognizable JavaScript structures were detected.")

    return explanations