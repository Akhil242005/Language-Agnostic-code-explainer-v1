class BaseNode:
    def __init__(self, node_type: str):
        self.node_type = node_type


class ImportNode(BaseNode):
    def __init__(self, module: str, alias: str | None):
        super().__init__("import")
        self.module = module
        self.alias = alias


class ImportFromNode(BaseNode):
    def __init__(self, module: str, name: str, alias: str | None):
        super().__init__("import_from")
        self.module = module
        self.name = name
        self.alias = alias


class AssignNode(BaseNode):
    def __init__(self, target: str, value: str, is_call=False):
        super().__init__("assign")
        self.target = target
        self.value = value
        self.is_call = is_call


class FunctionNode(BaseNode):
    def __init__(self, name: str, params: list[str]):
        super().__init__("function")
        self.name = name
        self.params = params


class MethodNode(BaseNode):
    def __init__(self, name: str, params: list[str]):
        super().__init__("method")
        self.name = name
        self.params = params


class ClassNode(BaseNode):
    def __init__(self, name: str, bases: list[str]):
        super().__init__("class")
        self.name = name
        self.bases = bases


class ReturnNode(BaseNode):
    def __init__(self, value: str):
        super().__init__("return")
        self.value = value


class ForNode(BaseNode):
    def __init__(self, target: str, iterable: str):
        super().__init__("for")
        self.target = target
        self.iterable = iterable


class WhileNode(BaseNode):
    def __init__(self, condition: str):
        super().__init__("while")
        self.condition = condition


class IfNode(BaseNode):
    def __init__(self, condition: str):
        super().__init__("if")
        self.condition = condition


class CallNode(BaseNode):
    def __init__(self, func: str, args: list[str]):
        super().__init__("call")
        self.func = func
        self.args = args