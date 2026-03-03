def explain_ir(ir_nodes):
    explanations = []
    context_stack = []

    for node in ir_nodes:
        explanations.extend(explain_node(node, context_stack))

    return explanations


def explain_node(node, context_stack):

    # -------------------------
    # IMPORTS
    # -------------------------
    if node.node_type == "import":
        if node.alias:
            return [f"The module '{node.module}' is imported as '{node.alias}'."]
        return [f"The module '{node.module}' is imported."]

    if node.node_type == "import_from":
        if node.alias:
            return [f"The name '{node.name}' is imported from module '{node.module}' as '{node.alias}'."]
        return [f"The name '{node.name}' is imported from module '{node.module}'."]

    # -------------------------
    # CLASS
    # -------------------------
    if node.node_type == "class":
        context_stack.append("class")

        if node.bases:
            return [f"The class '{node.name}' is defined and inherits from {', '.join(node.bases)}."]
        return [f"The class '{node.name}' is defined."]

    # -------------------------
    # FUNCTION
    # -------------------------
    if node.node_type == "function":
        context_stack.append("function")

        if node.params:
            return [f"The function '{node.name}' is defined with parameters {', '.join(node.params)}."]
        return [f"The function '{node.name}' is defined with no parameters."]

    # -------------------------
    # METHOD
    # -------------------------
    if node.node_type == "method":
        context_stack.append("method")

        if node.params:
            return [f"The method '{node.name}' is defined with parameters {', '.join(node.params)}."]
        return [f"The method '{node.name}' is defined with no parameters."]

    # -------------------------
    # RETURN
    # -------------------------
    if node.node_type == "return":
        if context_stack and context_stack[-1] == "method":
            return [f"The method returns {node.value}."]
        return [f"The function returns {node.value}."]

    # -------------------------
    # ASSIGNMENT
    # -------------------------
    if node.node_type == "assign":

        # Class attribute detection
        if context_stack and context_stack[-1] == "class":
            return [f"A class attribute '{node.target}' is assigned the value {node.value}."]

        if node.is_call:

            value = node.value
            func_part = value.split("(")[0]
            args = value[value.find("(")+1:-1].strip()

            # Constructor detection (Simple Name, uppercase, no dot)
            if "." not in func_part and func_part and func_part[0].isupper():
                if args:
                    return [f"An object of class '{func_part}' is created with {args} and assigned to '{node.target}'."]
                else:
                    return [f"An object of class '{func_part}' is created and assigned to '{node.target}'."]
            
            # Method call (dotted call)
            if "." in func_part:
                obj, method = func_part.split(".", 1)

                # Class method
                if obj and obj[0].isupper():
                    if args:
                        return [f"The method '{method}' of class '{obj}' is called with {args}, and its return value is assigned to '{node.target}'."]
                    else:
                        return [f"The method '{method}' of class '{obj}' is called, and its return value is assigned to '{node.target}'."]
                
                # Instance method
                if args:
                    return [f"The method '{method}' of object '{obj}' is called with {args}, and its return value is assigned to '{node.target}'."]
                else:
                    return [f"The method '{method}' of object '{obj}' is called, and its return value is assigned to '{node.target}'."]
            
            # Normal function
            return [f"The function '{value}' is called, and its return value is assigned to '{node.target}'."]

        return [f"The variable '{node.target}' is assigned the value {node.value}."]

    # -------------------------
    # LOOPS
    # -------------------------
    if node.node_type == "for":
        return [f"This for loop iterates the variable '{node.target}' over {node.iterable}."]

    if node.node_type == "while":
        return [f"This while loop continues as long as {node.condition}."]

    # -------------------------
    # IF
    # -------------------------
    if node.node_type == "if":
        return [f"This if statement checks whether {node.condition}."]

    # -------------------------
    # STANDALONE CALL
    # -------------------------
    if node.node_type == "call":

        args = ", ".join(node.args)

        if "." in node.func:
            obj, method = node.func.split(".", 1)

            # Class method
            if obj and obj[0].isupper():
                if args:
                    return [f"The method '{method}' of class '{obj}' is called with {args}."]
                else:
                    return [f"The method '{method}' of class '{obj}' is called."]
            
            # Instance method
            if args:
                return [f"The method '{method}' of object '{obj}' is called with {args}."]
            else:
                return [f"The method '{method}' of object '{obj}' is called."]

        if args:
            return [f"The function '{node.func}' is called with {args}."]
        else:
            return [f"The function '{node.func}' is called."]

    return []