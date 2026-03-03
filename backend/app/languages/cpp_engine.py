import re


def explain_cpp(code: str):
    explanations = []
    lines = code.split("\n")

    inside_class = False
    class_name = None
    brace_depth = 0

    for line in lines:
        stripped = line.strip()

        if not stripped:
            continue

        # Track braces
        brace_depth += stripped.count("{")
        brace_depth -= stripped.count("}")

        if inside_class and brace_depth <= 0:
            inside_class = False
            class_name = None

        # =========================
        # INCLUDE
        # =========================
        include_match = re.match(r"#include\s+[<\"](.*)[>\"]", stripped)
        if include_match:
            explanations.append(
                f"The header file '{include_match.group(1)}' is included."
            )
            continue

        # =========================
        # NAMESPACE
        # =========================
        namespace_match = re.match(r"using\s+namespace\s+(\w+);", stripped)
        if namespace_match:
            explanations.append(
                f"The namespace '{namespace_match.group(1)}' is used."
            )
            continue

        # =========================
        # CLASS
        # =========================
        class_match = re.match(r"class\s+(\w+)(?:\s*:\s*public\s+(\w+))?", stripped)
        if class_match:
            class_name = class_match.group(1)
            parent = class_match.group(2)
            inside_class = True
            brace_depth = 1

            if parent:
                explanations.append(
                    f"The class '{class_name}' is defined and inherits publicly from '{parent}'."
                )
            else:
                explanations.append(
                    f"The class '{class_name}' is defined."
                )
            continue

        # =========================
        # ACCESS SPECIFIER
        # =========================
        if inside_class and stripped in ["public:", "private:", "protected:"]:
            explanations.append(
                f"The access specifier '{stripped[:-1]}' is declared in class '{class_name}'."
            )
            continue

        # =========================
        # CONSTRUCTOR
        # =========================
        if inside_class and class_name and stripped.startswith(class_name + "("):
            params = stripped[stripped.find("(")+1:stripped.find(")")] or "no parameters"
            explanations.append(
                f"The constructor of class '{class_name}' is defined with parameters {params}."
            )
            continue

        # =========================
        # FUNCTION DEFINITION
        # =========================
        func_match = re.match(r"([\w:<>&*\s]+)\s+(\w+)\((.*?)\)\s*{", stripped)
        if func_match:
            return_type = func_match.group(1).strip()
            name = func_match.group(2)
            params = func_match.group(3) or "no parameters"

            if inside_class:
                explanations.append(
                    f"The member function '{name}' is defined in class '{class_name}' with return type '{return_type}' and parameters {params}."
                )
            else:
                explanations.append(
                    f"The function '{name}' is defined with return type '{return_type}' and parameters {params}."
                )
            continue

        # =========================
        # VARIABLE DECLARATION
        # =========================
        var_match = re.match(r"(int|float|double|char|string|bool)\s+(\w+)\s*(=\s*(.*))?;", stripped)
        if var_match:
            var_type = var_match.group(1)
            name = var_match.group(2)
            value = var_match.group(4)

            if value:
                explanations.append(
                    f"The variable '{name}' of type '{var_type}' is assigned the value {value}."
                )
            else:
                explanations.append(
                    f"The variable '{name}' of type '{var_type}' is declared."
                )
            continue

        # =========================
        # OBJECT CREATION
        # =========================
        obj_match = re.match(r"(\w+)\s+(\w+)\((.*?)\);", stripped)
        if obj_match:
            class_used = obj_match.group(1)
            obj_name = obj_match.group(2)
            args = obj_match.group(3) or "no arguments"

            explanations.append(
                f"An object '{obj_name}' of class '{class_used}' is created with arguments {args}."
            )
            continue

        # =========================
        # IF
        # =========================
        if stripped.startswith("if"):
            condition = stripped[stripped.find("(")+1:stripped.rfind(")")]
            explanations.append(
                f"This if statement checks whether {condition}."
            )
            continue

        # =========================
        # FOR
        # =========================
        if stripped.startswith("for"):
            condition = stripped[stripped.find("(")+1:stripped.rfind(")")]
            explanations.append(
                f"This for loop runs with condition {condition}."
            )
            continue

        # =========================
        # WHILE
        # =========================
        if stripped.startswith("while"):
            condition = stripped[stripped.find("(")+1:stripped.rfind(")")]
            explanations.append(
                f"This while loop continues as long as {condition}."
            )
            continue

        # =========================
        # TRY / CATCH
        # =========================
        if stripped.startswith("try"):
            explanations.append("A try block is defined.")
            continue

        if stripped.startswith("catch"):
            explanations.append("A catch block is defined to handle exceptions.")
            continue

        # =========================
        # COUT
        # =========================
        if "cout <<" in stripped:
            explanations.append(
                "Output is printed to the console using 'cout'."
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
        # FUNCTION / METHOD CALL
        # =========================
        call_match = re.search(r"(\w+(?:\.\w+)?(?:\.\w+)?)\((.*?)\);", stripped)
        if call_match:
            name = call_match.group(1)
            args = call_match.group(2) or "no arguments"

            explanations.append(
                f"The function or method '{name}' is called with arguments {args}."
            )

    if not explanations:
        explanations.append("No recognizable C++ structures were detected.")

    return explanations